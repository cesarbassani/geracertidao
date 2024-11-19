const BaseScrapper = require('./BaseScrapper')
const logger = require('../common/logger')
const axios = require('axios')
const https = require('https')

const url = 'https://www.receita.fazenda.gov.br/PessoaJuridica/CNPJ/cnpjreva/Cnpjreva_Solicitacao2.asp'
const siteKey = '6LcT2zQUAAAAABRp8qIQR2R0Y2LWYTafR0A8WFbr'
const docType = 'CNPJ_INSCRICAO_SITUACAO_CADASTRAL'
const daysToExpire = 30

const compNameXP = '//font[contains(text(), "NOME EMPRESARIAL")]/following-sibling::font'
const streetXP = '//font[contains(text(), "LOGRADOURO")]/following-sibling::font'
const numberXP = '//font[text()=\'\n\t\tNÚMERO\n\t\t\']/following-sibling::font'
const complementXP = '//font[contains(text(), "COMPLEMENTO")]/following-sibling::font'
const neigborhoodXP = '//font[contains(text(), "BAIRRO/DISTRITO")]/following-sibling::font'
const cityXP = '//font[contains(text(), "MUNICÍPIO")]/following-sibling::font'
const stateXP = '//font[contains(text(), "UF")]/following-sibling::font'
const titleXP = '//font//b[contains(text(), "REPÚBLICA FEDERATIVA DO BRASIL")]'

class CadastroNacionalPessoaJuridicaScrapper extends BaseScrapper {
    async execute(docNumber) {
        try {
            this.logStart(docNumber, CadastroNacionalPessoaJuridicaScrapper.docType)
            const filepath = await this.getDocument(docNumber)
            const document = await this.updateDocument({docNumber, docType, daysToExpire, filepath})
            this.logEndSuccess(docNumber, CadastroNacionalPessoaJuridicaScrapper.docType)
            return document
        } catch (e) {
            this.logEndError(docNumber, CadastroNacionalPessoaJuridicaScrapper.docType)
            logger.error(e)
            await this.closeSession()
            const message = this.getErrorMessage(e)
            return {status: 'error', message, docType}
        }
    }

    async getDocument(docNumber) {
        const page = await this.launch(url)
        await this.fillFormAndSubmit(page, docNumber)
        await this.wait(20000)
        await this.validateGeneratedDocument(page, titleXP)
        const path = this.buildFilepath(docNumber, docType)
        await page.pdf({path, format: 'A4'})
        try {
            await this.updateCompanyInfo(docNumber, page)
        } catch (e) {
            logger.error(e)
            logger.error('erro ao atualizar as informacoes da empresa')
        }
        await this.closeSession()
        return path
    }

    async fillFormAndSubmit(page, docNumber) {
        await page.focus('#cnpj')
        await page.keyboard.type(docNumber)

        const recaptcha = await this.breakRecaptcha(url, siteKey)
        await page.evaluate((recaptcha) => {
            document.querySelector('#g-recaptcha-response').value = recaptcha
        }, recaptcha)

        await page.click('#submit1')
    }

    async updateCompanyInfo(cnpj, page) {
        const companyInfo = await this.getCompanyInfo(page)
        await axios({
            url: `${process.env.API_URL}/companies`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'json',
            httpsAgent: new https.Agent({rejectUnauthorized: false}),
            data: {cnpj, companyInfo}
        })
    }

    async getCompanyInfo(page) {
        const companyInfo = {}
        companyInfo.name = await this.getElementText(page, compNameXP)
        companyInfo.street = await this.getElementText(page, streetXP)
        companyInfo.number = await this.getElementText(page, numberXP)
        companyInfo.complement = await this.getElementText(page, complementXP)
        companyInfo.neighborhood = await this.getElementText(page, neigborhoodXP)
        companyInfo.city = await this.getElementText(page, cityXP)
        companyInfo.state = await this.getElementText(page, stateXP)
        return companyInfo
    }

    static get docType() {
        return docType
    }
}

module.exports = CadastroNacionalPessoaJuridicaScrapper
const image2base64 = require('image-to-base64')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo')

const BaseScrapper = require('./BaseScrapper')
const logger = require('../common/logger')

const url = 'https://servicos.receita.fazenda.gov.br/Servicos/certidao/CndConjuntaInter/InformaNICertidao.asp?Tipo=1'
const docType = 'CERTIDAO_DEBITOS_RELATIVOS_CREDITOS_TRIBUTARIOS_FEDERAIS_DIVIDA_ATIVA_UNIAO'
let daysToExpire = 30

const expirationDateXP = '//font[contains(text(), "Válida até")]'
const titleXP = '//font[contains(text(), "CERTIDÃO NEGATIVA DE DÉBITOS RELATIVOS AOS TRIBUTOS FEDERAIS E À DÍVIDA ATIVA DA UNIÃO")]'
const generateNewXP = '//a[text()="Emissão de nova certidão"]'

class DividaAtivaUniaoScrapper extends BaseScrapper {
    async execute(docNumber) {
        try {
            this.logStart(docNumber, DividaAtivaUniaoScrapper.docType)
            const filepath = await this.getDocument(docNumber)
            const document = await this.updateDocument({docNumber, docType, daysToExpire, filepath})
            this.logEndSuccess(docNumber, DividaAtivaUniaoScrapper.docType)
            return document
        } catch (e) {
            this.logEndError(docNumber, DividaAtivaUniaoScrapper.docType)
            logger.error(e)
            await this.closeSession()
            const message = this.getErrorMessage(e)
            return {status: 'error', message, docType}
        }
    }

    async getDocument(docNumber) {
        const page = await this.launch(url)
        await page.setDefaultNavigationTimeout(120000)
        await page.setViewport({width: 1920, height: 600, deviceScaleFactor: 1})
        const brokenCaptcha = await this.solveCaptcha(docNumber, page)
        await this.fillFormAndSubmit(page, docNumber, brokenCaptcha)
        await this.validateGeneratedDocument(page, titleXP)
        const path = this.buildFilepath(docNumber, docType)
        await page.pdf({path, format: 'A4'})
        await this.wait(10000)
        await this.scrapExpirationDate(page)
        await this.closeSession()
        return path
    }

    async solveCaptcha(docNumber, page) {
        const filepath = `/tmp/${docNumber}_dau_captcha_screenshot.png`
        await page.screenshot({
            path: filepath,
            clip: {
                x: 661,
                y: 381,
                width: 190,
                height: 50
            }
        })
        const base64 = await image2base64(filepath)
        const brokenCaptcha = await this.breakImageCaptcha(base64)
        this.removeTempFile(filepath)
        return brokenCaptcha
    }

    async fillFormAndSubmit(page, docNumber, brokenCaptcha) {
        await page.evaluate((docNumber, brokenCaptcha) => {
            document.getElementsByName('NI')[0].value = docNumber
            document.getElementById('txtTexto_captcha_serpro_gov_br').value = brokenCaptcha
            document.getElementById('submit1').click()
        }, docNumber, brokenCaptcha)
        await page.waitForNavigation()
        const generateNew = await this.getElementText(page, generateNewXP)
        if (generateNew) {
            await page.evaluate(() => {
                document.getElementsByTagName('a')[8].click()
            })
            await page.waitForNavigation()
        }
        await page.waitForNavigation()
        await page.evaluate(() => {
            document.getElementsByTagName('a')[8].click()
        })
    }

    async scrapExpirationDate(page) {
        try {
            const xpathData = await page.$x(expirationDateXP)
            const xpathTextContent = await xpathData[0].getProperty('textContent')
            let expirationDate = xpathTextContent.toString()
            expirationDate = expirationDate.replace('Válida até ', '')
            expirationDate = expirationDate.replace('.', '')
            const momentExpirationDate = moment(expirationDate, 'DD/MM/YYYY')
            const currentDate = moment()
            daysToExpire = Math.abs(currentDate.diff(momentExpirationDate, 'days')) + 1
        } catch (e) {
            logger.error(e)
            logger.error('Não foi possível recuperar a data de vencimento da certidão CNDT DAU.')
        }
    }

    static get docType() {
        return docType
    }
}

module.exports = DividaAtivaUniaoScrapper
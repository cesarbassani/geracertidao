const fs = require('fs')
const BaseScrapper = require('./BaseScrapper')
const logger = require('../common/logger')

const url = 'http://aplicacao.jt.jus.br/cndtCertidao/inicio.faces'
const siteKey = '6LeKKAoUAAAAAJwv60Xf2N9-8Ri2mVJVp6dQaw6H'
const docType = 'CERTIDAO_NEGATIVA_DEBITOS_TRABALHISTAS'
const daysToExpire = 179

class CertidaoNegativaDebitosTrabalhistasScrapper extends BaseScrapper {
    async execute(docNumber) {
        try {
            this.logStart(docNumber, CertidaoNegativaDebitosTrabalhistasScrapper.docType)
            const filepath = await this.getDocument(docNumber)
            const document = await this.updateDocument({docNumber, docType, daysToExpire, filepath})
            this.logEndSuccess(docNumber, CertidaoNegativaDebitosTrabalhistasScrapper.docType)
            return document
        } catch (e) {
            this.logEndError(docNumber, CertidaoNegativaDebitosTrabalhistasScrapper.docType)
            logger.error(e)
            await this.closeSession()
            const message = this.getErrorMessage(e)
            return {status: 'error', message, docType}
        }
    }

    async getDocument(docNumber) {
        const page = await this.launch(url)
        this.browser.on('targetchanged', target => console.log(target.url()))
        await this.fillFormAndSubmit(page, docNumber)
        const path = `/tmp/certidao_${docNumber}.pdf`
        await this.waitForDownload(path)
        await this.closeSession()
        return path
    }

    async fillFormAndSubmit(page, docNumber) {
        await page.evaluate(() => {
            const emitirCertidaoBtn = document.getElementsByName('j_id_jsp_1384250394_2:j_id_jsp_1384250394_3')[0]
            emitirCertidaoBtn.click()
        })
        await page.waitForNavigation()
        await page.evaluate((docNumber) => {
            const cnpjInput = document.getElementById('gerarCertidaoForm:cpfCnpj')
            cnpjInput.value = docNumber
        }, docNumber)
        const captcha = await this.breakRecaptcha(url, siteKey)
        await page.evaluate((captcha) => {
            document.getElementById('g-recaptcha-response').value = captcha
        }, captcha)
        await page.evaluate(async () => {
            const form = document.querySelector('form[id="gerarCertidaoForm"]')
            const data = new FormData(form)

            data.append('gerarCertidaoForm:btnEmitirCertidao', 'gerarCertidaoForm:btnEmitirCertidao')
            data.append('status', 'j_id_jsp_1683183807_0:status')
            data.append('similarityGroupingId', 'gerarCertidaoForm:btnEmitirCertidao')
            data.append('parameters', '{\'gerarCertidaoForm:btnEmitirCertidao\':\'gerarCertidaoForm:btnEmitirCertidao\'}')
            data.append('containerId', 'j_id_jsp_1683183807_0')

            return fetch(form.action, {
                method: 'POST',
                credentials: 'include',
                body: data
            }).then(response => response.text())
        })
        await page.evaluate(() => {
            const emitirCertidaoBtn = document.getElementById('gerarCertidaoForm:btnEmitirCertidao')
            emitirCertidaoBtn.click()
        })
    }

    async waitForDownload(path) {
        let times = 0
        while (!fs.existsSync(path) && times < 40) {
            await this.wait(10000)
            times++
        }

        if (times >= 40) {
            const err = new Error()
            err.customMessage = 'tempo excedido'
            throw err
        }
    }

    static get docType() {
        return docType
    }
}

module.exports = CertidaoNegativaDebitosTrabalhistasScrapper
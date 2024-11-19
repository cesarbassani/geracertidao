const BaseScrapper = require('./BaseScrapper')
const logger = require('../common/logger')

const url = 'https://contasirregulares.tcu.gov.br/ordsext/f?p=105:3:33861392703086::::P3_TIPO:CNPJ'
const docType = 'CERTIDAO_NEGATIVA_CONTAS_JULGADAS_IRREGULARES'
const daysToExpire = 30

const titleXP = '//b[contains(text(), "TRIBUNAL DE CONTAS DA UNIÃO")]'

class CertidaoNegativaContasIrregularesScrapper extends BaseScrapper {
    async execute(docNumber) {
        try {
            this.logStart(docNumber, CertidaoNegativaContasIrregularesScrapper.docType)
            const filepath = await this.getDocument(docNumber)
            const document = await this.updateDocument({docNumber, docType, daysToExpire, filepath})
            this.logEndSuccess(docNumber, CertidaoNegativaContasIrregularesScrapper.docType)
            return document
        } catch (e) {
            this.logEndError(docNumber, CertidaoNegativaContasIrregularesScrapper.docType)
            logger.error(e)
            await this.closeSession()
            const message = this.getErrorMessage(e)
            return {status: 'error', message, docType}
        }
    }

    async getDocument(docNumber) {
        const page = await this.launch(url)
        await this.fillFormAndSubmit(page, docNumber)
        await this.validateGeneratedDocument(page, titleXP)
        const screenshot = await this.takeScreenshot(page)
        const filepath = this.buildFilepath(docNumber, docType)
        await this.transformToPDF(screenshot, filepath)
        await this.closeSession()
        return filepath
    }

    async fillFormAndSubmit(page, docNumber) {
        await page.focus('#P3_CNPJ_CJI')
        await page.keyboard.type(docNumber)

        await page.click('#B2923578444983516986')
        await page.waitForNavigation({waitUntil: 'networkidle2'})

        await page.evaluate(() => {
            document.querySelector('.t-Alert-buttons > button').click()
        })
    }

    async takeScreenshot(page) {
        await page.setViewport({width: 1250, height: 1024, deviceScaleFactor: 1})
        return await page.screenshot({clip: {x: 340, y: 170, width: 810, height: 800}})
    }

    static get docType() {
        return docType
    }
}

module.exports = CertidaoNegativaContasIrregularesScrapper
const puppeteer = require('puppeteer')
const fs = require('fs')
const moment = require('moment')
const PDFDocument = require('pdfkit')
const CaptchaBreaker = require('./captcha/CaptchaBreaker')
const database = require('../common/database')
const logger = require('../common/logger')

class BaseScrapper {
    constructor() {
        this.errors = {
            WEBSITE_OFFLINE: 'website fora do ar',
            GENERIC_ERROR: 'desconhecido'
        }
    }

    async breakImageCaptcha(base64) {
        const captchaBreaker = new CaptchaBreaker()
        const hasAvaibleBalance = await captchaBreaker.hasAvailableBalance()
        if (!hasAvaibleBalance) {
            return
        }
        return await captchaBreaker.breakImageCaptcha(base64)
    }

    async breakRecaptcha(siteUrl, siteKey) {
        const captchaBreaker = new CaptchaBreaker()
        const hasAvaibleBalance = await captchaBreaker.hasAvailableBalance()
        if (!hasAvaibleBalance) {
            return
        }
        captchaBreaker.setWebsiteUrl(siteUrl)
        captchaBreaker.setSiteKey(siteKey)
        return await captchaBreaker.breakRecaptcha()
    }

    buildFilename(docNumber, docType) {
        return `${docNumber}_${docType}.pdf`
    }

    buildFilepath(docNumber, docType) {
        return `/tmp/${docNumber}_${docType}_${(new Date()).getTime()}.pdf`
    }

    async closeSession() {
        await this.browser.close()
    }

    getErrorMessage(err) {
        return err.customMessage ? err.customMessage : this.errors.GENERIC_ERROR
    }

    async launch(url) {
        try {
            this.browser = await puppeteer.launch({
                ignoreHTTPSErrors: true,
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            })
            const page = await this.browser.newPage()
            await page._client.send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath: '/tmp'
            })
            await page.goto(url, {waitUntil: 'networkidle2'})
            return page
        } catch (e) {
            await this.closeSession()
            e.customMessage = this.errors.WEBSITE_OFFLINE
            throw e
        }
    }

    transformToPDF(image, filename) {
        return new Promise((resolve) => {
            const doc = new PDFDocument()
            const writeStream = fs.createWriteStream(filename)
            writeStream.on('finish', () => {
                resolve()
            })
            doc.pipe(writeStream)
            doc.image(image, 0, 15, {width: 600})
            doc.end()
        })
    }

    async updateDocument({docNumber, docType, daysToExpire, filepath}) {
        const filename = this.buildFilename(docNumber, docType)
        const expiresAt = this.getDocumentExpirationDate(daysToExpire)
        const metadata = {
            docNumber,
            docType,
            expiresAt
        }
        await database.updateFile(filepath, filename, metadata)
        this.removeTempFile(filepath)
        return {filename, expiresAt, docType, status: 'success'}
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getDocumentExpirationDate(daysToExpire) {
        const expirationDate = moment().add(daysToExpire, 'days')
        return expirationDate.toISOString()
    }

    removeTempFile(filepath) {
        fs.unlinkSync(filepath)
    }

    async getElementText(page, xpathSelector, index = 0) {
        const xpathData = await page.$x(xpathSelector)
        if (xpathData[index]) {
            const xpathTextContent = await xpathData[index].getProperty('textContent')
            return xpathTextContent.jsonValue()
        }
        return undefined
    }

    async validateGeneratedDocument(page, elementXpath) {
        const element = await this.getElementText(page, elementXpath)
        if (!element) {
            const err = new Error()
            err.customMessage = 'tempo excedido'
            throw err
        }
    }

    logStart(docNumber, docType) {
        logger.info(`[START] Início da execução para ${docNumber} - ${docType}`)
    }

    logEndSuccess(docNumber, docType) {
        logger.info(`[SUCCESS] Fim da execução para ${docNumber} - ${docType}`)
    }

    logEndError(docNumber, docType) {
        logger.error(`[ERROR] Fim da execução para ${docNumber} - ${docType}`)
    }
}

module.exports = BaseScrapper

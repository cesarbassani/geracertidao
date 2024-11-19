const BaseScrapper = require('./BaseScrapper')
const logger = require('../common/logger')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo')

const url = 'https://www.sifge.caixa.gov.br/Cidadao/Crf/Crf/FgeCfSConsultaRegularidade.asp'
const docType = 'CERTIFICADO_REGULARIDADE_FGTS'
let daysToExpire = 30

const expirationDateXP = '//strong[contains(text(), "Validade:")]//parent::td'
const titleXP = '//strong[text()="Certificado de Regularidade do FGTS - CRF"]'

class CertificadoRegularidadeFGTSScrapper extends BaseScrapper {
    async execute(docNumber) {
        try {
            this.logStart(docNumber, CertificadoRegularidadeFGTSScrapper.docType)
            const filepath = await this.getDocument(docNumber)
            const document = await this.updateDocument({docNumber, docType, daysToExpire, filepath})
            this.logEndSuccess(docNumber, CertificadoRegularidadeFGTSScrapper.docType)
            return document
        } catch (e) {
            this.logEndError(docNumber, CertificadoRegularidadeFGTSScrapper.docType)
            logger.error(e)
            await this.closeSession()
            const message = this.getErrorMessage(e)
            return {status: 'error', message, docType}
        }
    }

    async getDocument(docNumber) {
        const page = await this.launch(url)
        await this.fillFormAndSubmit(page, docNumber)
        await this.validateEmployerNotFound(page)
        await this.showDocument(page)
        await this.scrapExpirationDate(page)
        await this.printDocument(page)
        await this.validateGeneratedDocument(page, titleXP)
        const path = this.buildFilepath(docNumber, docType)
        await page.pdf({path, format: 'A4'})
        await this.closeSession()
        return path
    }

    async fillFormAndSubmit(page, docNumber) {
        await page.evaluate(() => {
            const linkAvancar = document.getElementsByTagName('a')[13]
            linkAvancar.click()
        })
        await page.waitForNavigation()
        const keys = await page.evaluate(() => {
            const keys = []
            keys.push(document.getElementById('resultadopath').value)
            keys.push(document.getElementById('resultadopath2').value)
            keys.push(document.getElementById('resultadopath3').value)
            keys.push(document.getElementById('resultadopath4').value)
            keys.push(document.getElementById('resultadopath5').value)
            return keys
        })

        const secret = breakSecret(keys)
        await page.evaluate((docNumber, secret) => {
            const select = document.querySelector('select[name="tipoinscricao"]')
            select.selectedIndex = 1
            select.onchange()

            const inputCnpj = document.querySelector('input[name="ImportWorkEmpregadorCodigoInscricaoAlfanum"]')
            inputCnpj.value = docNumber

            const inputCaptcha = document.getElementById('txtConsulta')
            inputCaptcha.value = secret

            const linkConsultar = document.getElementsByTagName('a')[15]
            linkConsultar.click()
        }, docNumber, secret)
        await page.waitForNavigation()
    }

    async printDocument(page) {
        await page.evaluate(() => {
            const linkImprimirDocumento = document.getElementsByTagName('a')[15]
            linkImprimirDocumento.click()
        })
        await page.waitForNavigation()
    }

    async scrapExpirationDate(page) {
        const xpathData = await page.$x(expirationDateXP)
        const xpathTextContent = await xpathData[0].getProperty('textContent')
        const timeWindow = xpathTextContent.toString()
        const expirationDate = timeWindow.substr(timeWindow.lastIndexOf('a') + 2, timeWindow.length)
        const momentExpirationDate = moment(expirationDate, 'DD/MM/YYYY')
        const currentDate = moment()
        daysToExpire = Math.abs(currentDate.diff(momentExpirationDate, 'days')) + 1
    }

    async showDocument(page) {
        await page.evaluate(() => {
            const linkVerDocumento = document.getElementsByTagName('a')[14]
            linkVerDocumento.click()
        })
        await page.waitForNavigation()
    }

    async validateEmployerNotFound(page) {
        const notFound = await page.evaluate(() => {
            return document.querySelector('body').innerText.includes('Empregador não cadastrado')
        })
        if (notFound) {
            const err = new Error()
            err.customMessage = 'empregador não cadastrado.'
            throw err
        }
    }

    static get docType() {
        return docType
    }
}

const dictionary = {
    '47': '0',
    '48': '1',
    '49': '2',
    '50': '3',
    '51': '4',
    '52': '5',
    '53': '6',
    '54': '7',
    '55': '8',
    '56': '9',
    '64': 'A',
    '65': 'B',
    '66': 'C',
    '67': 'D',
    '68': 'E',
    '69': 'F',
    '70': 'G',
    '71': 'H',
    '72': 'I',
    '73': 'J',
    '74': 'K',
    '75': 'L',
    '76': 'M',
    '77': 'N',
    '78': 'O',
    '79': 'P',
    '80': 'Q',
    '81': 'R',
    '82': 'S',
    '83': 'T',
    '84': 'U',
    '85': 'V',
    '86': 'W',
    '87': 'X',
    '88': 'Y',
    '89': 'Z'
}

function breakSecret(keys) {
    let secret = ''
    for (key of keys) {
        const secretPiece = key.substr(2, 2)
        secret += dictionary[secretPiece]
    }
    return secret
}

module.exports = CertificadoRegularidadeFGTSScrapper
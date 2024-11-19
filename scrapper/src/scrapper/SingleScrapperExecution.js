const axios = require('axios')
const https = require('https')
const logger = require('../common/logger')
const CadastroNacionalPessoaJuridicaScrapper = require('./CadastroNacionalPessoaJuridicaScrapper')
const CertidaoNegativaContasIrregularesScrapper = require('./CertidaoNegativaContasIrregularesScrapper')
const CertificadoRegularidadeFGTSScrapper = require('./CertificadoRegularidadeFGTSScrapper')
const DividaAtivaUniaoScrapper = require('./DividaAtivaUniaoScrapper')
const CertidaoNegativaDebitosTrabalhistasScrapper = require('./CertidaoNegativaDebitosTrabalhistasScrapper')

class SingleScrapperExecution {
    async execute(cnpj, docType) {
        try {
            const scrapper = this.getScrapperInstance(docType)
            const document = await scrapper.execute(cnpj)
            await this.updateDocumentStatus(cnpj, document)
        } catch (e) {
            logger.error(e)
        }
    }

    async updateDocumentStatus(cnpj, document) {
        await axios({
            url: `${process.env.API_URL}/documents/status`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'json',
            httpsAgent: new https.Agent({rejectUnauthorized: false}),
            data: {cnpj, document}
        })
    }

    getScrapperInstance(docType) {
        switch (docType) {
            case CadastroNacionalPessoaJuridicaScrapper.docType:
                return new CadastroNacionalPessoaJuridicaScrapper()
            case CertidaoNegativaContasIrregularesScrapper.docType:
                return new CertidaoNegativaContasIrregularesScrapper()
            case CertificadoRegularidadeFGTSScrapper.docType:
                return new CertificadoRegularidadeFGTSScrapper()
            case DividaAtivaUniaoScrapper.docType:
                return new DividaAtivaUniaoScrapper()
            case CertidaoNegativaDebitosTrabalhistasScrapper.docType:
                return new CertidaoNegativaDebitosTrabalhistasScrapper()
        }
    }
}


const singleScrapperExecution = new SingleScrapperExecution()
module.exports = singleScrapperExecution
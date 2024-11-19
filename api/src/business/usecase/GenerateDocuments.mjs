import documentRepository from '../../repository/DocumentRepository.mjs'
import scrapper from './scrapper.mjs'

class GenerateDocuments {
    async execute(cnpj, documentTypes) {
        for (let type of documentTypes) {
            await this.changeDocumentStatus(cnpj, type)
            scrapper(cnpj, type)
        }
    }

    async changeDocumentStatus(cnpj, type) {
        await documentRepository.update({cnpj, name: type}, {status: 'processing'})
    }
}

const generateDocuments = new GenerateDocuments()
export default generateDocuments

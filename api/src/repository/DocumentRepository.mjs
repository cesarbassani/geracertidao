import Document from './Document.mjs'

class DocumentRepository {
    async create(document) {
        const documents = await Document.create(document)
        return documents
    }

    async update(query, updateFields) {
        await Document.updateMany(query, updateFields)
    }

    async count(query = {}) {
        return await Document.count(query)
    }

    async findDistinctCnpjWithExpiredDocuments(expirationDate) {
        return await Document.distinct('cnpj', {
            expiresAt: {
                $lte: expirationDate
            }
        })
    }
}

const documentRepository = new DocumentRepository()
export default documentRepository

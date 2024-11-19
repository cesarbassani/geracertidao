import documentRepository from '../../repository/DocumentRepository.mjs'
import notificationDocumentsUpdated from '../notification/DocumentsUpdated.mjs'

class UpdateDocumentStatus {
    async execute({cnpj, document}, responder) {
        const query = {cnpj, name: document.docType}
        const updateFields = this.getFieldsToUpdate(document)
        await documentRepository.update(query, updateFields)
        if (await this.shouldNotifyUsers(cnpj)) {
            await this.removeJobFlag(cnpj, document)
            await notificationDocumentsUpdated.execute(cnpj)
        } else {
            await this.removeJobFlag(cnpj, document)
        }
        responder.success()
    }

    getFieldsToUpdate(document) {
        if (document.status === 'success') {
            return {
                status: document.status,
                filename: document.filename,
                expiresAt: document.expiresAt
            }
        } else {
            return {
                status: document.status,
                message: document.message
            }
        }
    }

    async removeJobFlag(cnpj, document) {
        const query = {cnpj, name: document.docType}
        await documentRepository.update(query, {job: false})
    }

    async shouldNotifyUsers(cnpj) {
        const nbDocsProcessing = await documentRepository.count({cnpj, status: 'processing'})
        const nbDocsJob = await documentRepository.count({cnpj, job: true})
        return nbDocsProcessing === 0 && nbDocsJob > 0
    }
}

const updateDocumentStatus = new UpdateDocumentStatus()
export default updateDocumentStatus

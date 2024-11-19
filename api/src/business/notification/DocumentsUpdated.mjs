import companyRepository from '../../repository/CompanyRepository.mjs'
import {emailClient} from '@codate/commons'

const TEMPLATE_NAME = 'DOCUMENTS_UPDATED'

class DocumentsUpdated {
    async execute(cnpj) {
        const users = await this.getUsersToNotify(cnpj)
        for (let userData of users) {
            const emailData = {email: userData.email, template: TEMPLATE_NAME, variables: {userData}}
            await emailClient.send(emailData)
        }
    }

    async getUsersToNotify(cnpj) {
        const users = []
        const companies = await companyRepository.findByCnpj(cnpj)
        companies.forEach(company => users.push(company.owner))
        return users
    }

}

const documentsUpdated = new DocumentsUpdated()
export default documentsUpdated

import moment from 'moment'
import scrapper from '../usecase/scrapper.mjs'
import companyRepository from '../../repository/CompanyRepository.mjs'
import documentRepository from '../../repository/DocumentRepository.mjs'

class UpdateDocuments {
    async execute() {
        const companies = await this.findCompaniesWithExpiredDocuments()
        for (let company of companies) {
            await this.updateExpiredDocuments(company.documents)
        }
    }

    async findCompaniesWithExpiredDocuments() {
        const expirationDate = this.getExpirationDate().toISOString()
        const cnpjList = await documentRepository.findDistinctCnpjWithExpiredDocuments(expirationDate)
        let companies = []
        if (cnpjList.length) {
            companies = await companyRepository.findByCnpjIn(cnpjList)
        }
        return companies
    }

    getExpirationDate() {
        const expirationDate = moment()
        expirationDate.seconds(0)
        expirationDate.minutes(0)
        expirationDate.hour(0)
        return expirationDate
    }

    isExpiredDocument(document) {
        const expirationDate = this.getExpirationDate()
        return expirationDate.isAfter(moment(document.expiresAt))
    }

    async updateExpiredDocuments(documents) {
        for (let document of documents) {
            if (this.isExpiredDocument(document)) {
                await documentRepository.update({_id: document._id}, {job: true, status: 'processing', message: ''})
                scrapper(document.cnpj, document.name)
            }
        }
    }
}

const updateDocuments = new UpdateDocuments()
export default updateDocuments

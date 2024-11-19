import _ from 'lodash'
import {userClient} from '@codate/commons'
import companyRepository from '../../repository/CompanyRepository.mjs'
import documentRepository from '../../repository/DocumentRepository.mjs'
import subscriptionRepository from '../../repository/SubscriptionRepository.mjs'
import {federal, plans} from './constants.mjs'
import generateDocuments from './GenerateDocuments.mjs'

class AddCompany {
    async execute(companyData, responder) {
        try {
            const user = await this.checkUserExists(companyData.email)
            await this.checkSubscriptionAllowed(user._id)
            const documents = this.prepareNewDocuments(companyData)
            const savedDocuments = await documentRepository.create(documents)
            const company = this.prepareNewCompany(companyData, user, savedDocuments)
            const companySaved = await companyRepository.save(company)
            await this.startScrappingDocuments(companySaved)
            responder.success(companySaved)
        } catch (err) {
            responder.error(err)
        }
    }

    async checkUserExists(email) {
        const matchedUser = await userClient.findByEmail(email)
        if (_.isEmpty(matchedUser)) {
            throw new Error('EMAIL_NOT_EXISTS')
        }
        return matchedUser
    }

    async checkSubscriptionAllowed(userId) {
        const subscription = await subscriptionRepository.findByOwner(userId)
        const currentCompaniesLength = await companyRepository.countByOwner(userId)
        const plan = plans[subscription.level]
        if (currentCompaniesLength + 1 > plan.companiesAllowed) {
            throw new Error('CURRENT_PLAN_NOT_ALLOWED_MORE_COMPANIES')
        }
    }

    prepareNewCompany(companyData, user, documents) {
        return {
            owner: user,
            cnpj: companyData.cnpj,
            documents: documents
        }
    }

    prepareNewDocuments(company) {
        const documents = []
        let index = 1
        _.forEach(federal, (value) => {
            documents.push({order: index, cnpj: company.cnpj, name: value, status: 'processing'})
            index = index + 1
        })
        return documents
    }

    async startScrappingDocuments(company) {
        const cnpj = company.cnpj
        const documents = []
        _.forEach(company.documents, (doc) => {
            documents.push(doc.name)
        })
        await generateDocuments.execute(cnpj, documents)
    }
}

const addCompany = new AddCompany()
export default addCompany

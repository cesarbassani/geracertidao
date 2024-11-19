import mongoose from 'mongoose'
import Company from './Company.mjs'

class CompanyRepository {
    async save(companyData) {
        const companySaved = await (new Company(companyData)).save()
        return companySaved
    }

    async findByOwner(userId) {
        const owner = new mongoose.mongo.ObjectId(userId)
        const companies = await Company.find({'owner': owner}).populate('owner documents').exec()
        return companies
    }

    async countByOwner(userId) {
        const owner = new mongoose.mongo.ObjectId(userId)
        const total = await Company.count({'owner': owner}).exec()
        return total
    }

    async findByOwnerAndCnpj(userId, cnpj) {
        const owner = new mongoose.mongo.ObjectId(userId)
        const companies = await Company.find({'owner': owner, 'cnpj': cnpj}).exec()
        return companies
    }

    async findCompanyById(companyId) {
        const id = new mongoose.mongo.ObjectId(companyId)
        const company = await Company.findOne({'_id': id}).populate('documents').exec()
        return company
    }

    async findByCnpj(cnpj) {
        return await Company.find({cnpj}).populate('owner').exec()
    }

    async findByCnpjIn(cnpjList) {
        const query = {
            cnpj: {
                $in: cnpjList
            }
        }
        return await Company.find(query).populate('documents').exec()
    }

    async findByOwnerIn(ownerList) {
        const query = {owner: {$in: ownerList}}
        return await Company.find(query).exec()
    }

    async update(cnpj, companyInfo) {
        await Company.updateMany({cnpj}, companyInfo)
    }
}

const companyRepository = new CompanyRepository()
export default companyRepository

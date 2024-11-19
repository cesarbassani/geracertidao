import mongoose from 'mongoose'
import userDashboardRepository from '../../repository/UserDashboardRepository.mjs'
import companyRepository from '../../repository/CompanyRepository.mjs'

class UserDashboardDTO {
    constructor(user, companies) {
        this._id = user._id
        this.name = user.name
        this.email = user.email
        this.createdAt = user.createdAt
        this.companies = companies
    }
}

class UserDashboard {
    async execute(pageNumber, size, responder) {
        const page = await userDashboardRepository.findAll(pageNumber, size)
        const userIdList = this.getUserIdList(page.content)
        const companiesList = await this.findCompanies(userIdList)
        page.content = this.associateUsersWithCompanies(page.content, companiesList)
        console.log(page.content)
        responder.success(page)
    }

    getUserIdList(users) {
        const userIdList = []
        users.map(user => userIdList.push(mongoose.mongo.ObjectId(user._id)))
        return userIdList
    }

    async findCompanies(userIdList) {
        return await companyRepository.findByOwnerIn(userIdList)
    }

    associateUsersWithCompanies(users, companiesList) {
        const usersDTO = []
        users.forEach(user => {
            const companies = []
            companiesList.forEach(company => {
                if (company.owner.toString() === user._id.toString()) {
                    companies.push({
                        _id: company._id,
                        name: company.name,
                        cnpj: company.cnpj
                    })
                }
            })
            usersDTO.push(new UserDashboardDTO(user, companies))
        })
        return usersDTO
    }
}

const userDashboard = new UserDashboard()
export default userDashboard
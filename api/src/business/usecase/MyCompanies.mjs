import companyRepository from '../../repository/CompanyRepository.mjs'

class MyCompanies {
    async execute(id, responder) {
        try {
            const companies = await companyRepository.findByOwner(id)
            responder.success(companies)
        } catch (err) {
            responder.error(err)
        }
    }
}

const myCompanies = new MyCompanies()
export default myCompanies

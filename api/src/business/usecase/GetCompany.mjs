import companyRepository from '../../repository/CompanyRepository.mjs'
import _ from 'lodash'

class GetCompany {
    async execute({userId, cnpj}, responder) {
        try {
            const companies = await companyRepository.findByOwnerAndCnpj(userId, cnpj)
            if (!_.isEmpty(companies)) {
                responder.success(companies[0])
            } else {
                const err = {message: 'COMPANY_HAS_NOT_FOUND'}
                responder.notFound(err)
            }
        } catch (err) {
            responder.error(err)
        }
    }
}

const getCompany = new GetCompany()
export default getCompany

import companyRepository from '../../repository/CompanyRepository.mjs'

class UpdateCompany {
    async execute({cnpj, companyInfo}, responder) {
        try {
            cleanInvalidaCharacters(companyInfo)
            await companyRepository.update(cnpj, companyInfo)
            responder.success()
        } catch (err) {
            responder.error(err)
        }
    }
}

function cleanInvalidaCharacters(companyInfo) {
    for (let key of Object.keys(companyInfo)) {
        let cleanedData = companyInfo[key].trim()
        cleanedData = cleanedData.replace('\n')
        cleanedData = cleanedData.replace('\t')
        companyInfo[key] = cleanedData
    }
}

const updateCompany = new UpdateCompany()
export default updateCompany

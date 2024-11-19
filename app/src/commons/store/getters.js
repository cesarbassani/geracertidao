export default {
    getCurrentCompany: (state) => (cnpj) => {
        return state.companiesAllowed.find(company => company.cnpj === cnpj)
    },

    isProcessingDocuments: () => (company) => {
        let isProcessing = false
        for (let doc of company.documents) {
            if (doc.status === 'processing') {
                isProcessing = true
                break
            }
        }
        return isProcessing
    },

    isPremmium: (state) => () => {
        return state.subscription.level !== 'FREEMIUM'
    },

    companiesSize: (state) => () => {
        return state.companiesAllowed.length
    },

    documentsSize: (state) => () => {
        return state.companiesAllowed.reduce((acumulado, company) => acumulado + company.documents.reduce((a, c) => a + (c.status === 'success' ? 1 : 0), 0), 0)
    },

    noCompanies: (state) => () => {
        return state.companiesAllowed.length === 0
    },

    hasCompanies: (state) => () => {
        return state.companiesAllowed.length > 0
    },

    hasDocumentsToDownload: () => (company) => {
        let hasDocuments = false
        for (let doc of company.documents) {
            if (doc.status === 'success') {
                hasDocuments = true
                break
            }
        }
        return hasDocuments
    }
}

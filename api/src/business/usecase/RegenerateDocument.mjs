import generateDocuments from './GenerateDocuments.mjs'

class RegenerateDocument {
    async execute({cnpj, document}, responder) {
        await generateDocuments.execute(cnpj, [document])
        responder.success()
    }
}

const regenerateDocument = new RegenerateDocument()
export default regenerateDocument
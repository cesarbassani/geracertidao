import mongoose from 'mongoose'

const CompanySchema = new mongoose.Schema({
    name: {type: String, required: false},
    cnpj: {type: String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    documents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: false}],
    createdAt: {type: Date, default: Date.now},
    status: {type: String, required: false},
    street: {type: String, required: false},
    number: {type: String, required: false},
    complement: {type: String, required: false},
    zipCode: {type: String, required: false},
    neighborhood: {type: String, required: false},
    city: {type: String, required: false},
    state: {type: String, required: false}
})

export default mongoose.model('Company', CompanySchema)

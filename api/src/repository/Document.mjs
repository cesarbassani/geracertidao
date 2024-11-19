import mongoose from 'mongoose'

const DocumentSchema = new mongoose.Schema({
    cnpj: {type: String, required: true},
    order: {type: Number, required: true},
    name: {type: String, required: true},
    status: {type: String, enum: ['processing', 'success', 'error'], required: true},
    message: {type: String, required: false},
    filename: {type: String, required: false},
    job: {type: Boolean, default: false},
    expiresAt: {type: Date, required: false},
    createdAt: {type: Date, default: Date.now}
})

export default mongoose.model('Document', DocumentSchema)

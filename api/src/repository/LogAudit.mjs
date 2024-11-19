import mongoose from 'mongoose'

const LogAudit = new mongoose.Schema({
    createdAt: {type: Date, default: Date.now, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    action: {type: String, required: true},
    companyCnpj: {type: String, required: false},
    companyName: {type: String, required: false},
    ip: {type: String, required: false}
})

export default mongoose.model('LogAudit', LogAudit)

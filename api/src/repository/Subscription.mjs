import mongoose from 'mongoose'

const SubscriptionSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    level: {type: String, default: 'FREEMIUM', required: true},
    paid: {type: Boolean, required: true, default: false},
    createdAt: {type: Date, default: Date.now, required: true},
    expiresAt: {type: Date, required: true},
})

export default mongoose.model('Subscription', SubscriptionSchema)

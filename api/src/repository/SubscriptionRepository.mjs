import mongoose from 'mongoose'
import Subscription from './Subscription.mjs'

class SubscriptionRepository {
    async create(subscriptionData) {
        const subscription = await Subscription.create(subscriptionData)
        return subscription
    }

    async findByOwner(userId) {
        const owner = new mongoose.mongo.ObjectId(userId)
        const subscription = await Subscription.findOne({'owner': owner}).exec()
        return subscription
    }
}

const subscriptionRepository = new SubscriptionRepository()
export default subscriptionRepository

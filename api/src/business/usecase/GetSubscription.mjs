import _ from 'lodash'
import mongoose from 'mongoose'
import moment from 'moment'
import subscriptionRepository from '../../repository/SubscriptionRepository.mjs'

class GetSubscription {
    async execute(userId, responder) {
        try {
            let subscription = await subscriptionRepository.findByOwner(userId)
            if (_.isEmpty(subscription)) {
                const freemium = this.createFreemiumSubscrition(userId)
                subscription = await subscriptionRepository.create(freemium)
            }
            responder.success(subscription)
        } catch (err) {
            responder.error(err)
        }
    }

    createFreemiumSubscrition(userId) {
        return {
            owner: new mongoose.mongo.ObjectId(userId),
            level: 'BASIC',
            paid: true,
            createdAt: moment().toDate(),
            expiresAt: moment().add(30, 'd').toDate()
        }
    }
}


const getSubscription = new GetSubscription()
export default getSubscription

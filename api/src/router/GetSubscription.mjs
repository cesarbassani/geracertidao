import Joi from 'joi'
import passport from 'passport'
import express from 'express'
import validate from 'express-validation'
import {Responder} from '@codate/commons'
import getSubscription from '../business/usecase/GetSubscription.mjs'
import audit from './audit.mjs'

const schema = {
    query: {
        userId: Joi.any().required()
    }
}

const usecase = (req, res, next) => {
    getSubscription.execute(req.query.userId, new Responder(req, res, next))
}

const router = express.Router()
router.get('/subscriptions',
    passport.authenticate('jwt', {session: false}),
    validate(schema),
    audit('ENTER_APP'),
    usecase)

export default router

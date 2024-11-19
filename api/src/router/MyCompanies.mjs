import Joi from 'joi'
import passport from 'passport'
import express from 'express'
import validate from 'express-validation'
import {Responder} from '@codate/commons'
import myCompanies from '../business/usecase/MyCompanies.mjs'

const schema = {
    query: {
        id: Joi.any().required()
    }
}

const usecase = (req, res, next) => {
    myCompanies.execute(req.query.id, new Responder(req, res, next))
}

const router = express.Router()
router.get('/companies/mine',
    passport.authenticate('jwt', {session: false}),
    validate(schema),
    usecase)

export default router

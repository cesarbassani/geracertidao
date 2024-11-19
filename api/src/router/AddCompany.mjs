import Joi from 'joi'
import passport from 'passport'
import express from 'express'
import validate from 'express-validation'
import {Responder} from '@codate/commons'
import addCompany from '../business/usecase/AddCompany.mjs'
import audit from './audit.mjs'

const schema = {
    body: {
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        cnpj: Joi.string().regex(/^[0-9]+$/, 'numbers').max(14).required()
    }
}

const usecase = (req, res, next) => {
    addCompany.execute(req.body, new Responder(req, res, next))
}

const router = express.Router()
router.post('/companies',
    passport.authenticate('jwt', {session: false}),
    validate(schema),
    audit('ADD_COMPANY'),
    usecase)
export default router

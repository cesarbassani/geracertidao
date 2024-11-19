import Joi from 'joi'
import passport from 'passport'
import express from 'express'
import validate from 'express-validation'
import {Responder} from '@codate/commons'
import regenerateDocument from '../business/usecase/RegenerateDocument.mjs'
import audit from './audit.mjs'

const schema = {
    body: {
        cnpj: Joi.string().regex(/^[0-9]+$/, 'numbers').max(14).required(),
        document: Joi.string().required()
    }
}

const usecase = (req, res, next) => {
    regenerateDocument.execute(req.body, new Responder(req, res, next))
}

const router = express.Router()
router.post('/documents/generate',
    passport.authenticate('jwt', {session: false}),
    validate(schema),
    audit('REGENERATE_DOCUMENT'),
    usecase)

export default router

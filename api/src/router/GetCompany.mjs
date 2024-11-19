import Joi from 'joi'
import express from 'express'
import validate from 'express-validation'
import {Responder} from '@codate/commons'
import getCompany from '../business/usecase/GetCompany.mjs'

const schema = {
    query: {
        userId: Joi.any().required(),
        cnpj: Joi.string().regex(/^[0-9]+$/, 'numbers').max(14).required()
    }
}

const router = express.Router()
router.get('/companies',  validate(schema), (req, res, next) => {
    getCompany.execute({userId: req.query.userId, cnpj: req.query.cnpj}, new Responder(req, res, next))
})

export default router

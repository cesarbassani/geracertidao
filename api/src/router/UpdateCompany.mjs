import Joi from 'joi'
import express from 'express'
import validate from 'express-validation'
import {Responder} from '@codate/commons'
import updateCompany from '../business/usecase/UpdateCompany.mjs'

const schema = {
    body: {
        cnpj: Joi.string().required(),
        companyInfo: Joi.object().required()
    }
}

const router = express.Router()
router.put('/companies', validate(schema), async (req, res, next) => {
    await updateCompany.execute(req.body, new Responder(req, res, next))
})

export default router

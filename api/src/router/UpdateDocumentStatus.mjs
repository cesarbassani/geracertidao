import Joi from 'joi'
import express from 'express'
import validate from 'express-validation'
import {Responder} from '@codate/commons'
import updateDocumentStatus from '../business/usecase/UpdateDocumentStatus.mjs'

const schema = {
    body: {
        cnpj: Joi.string().regex(/^[0-9]+$/, 'numbers').max(14).required(),
        document: Joi.object().required()
    }
}

const router = express.Router()
router.put('/documents/status', validate(schema), async (req, res, next) => {
    await updateDocumentStatus.execute(req.body, new Responder(req, res, next))
})

export default router

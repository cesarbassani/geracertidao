import Joi from 'joi'
import express from 'express'
import validate from 'express-validation'
import {Responder} from '@codate/commons'
import downloadAll from '../business/usecase/DownloadAll.mjs'

const schema = {
    params: {
        companyId: Joi.any().required()
    }
}

const usecase = (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const downloadData = {companyId: req.params.companyId, name: req.query.name, email: req.query.email, ip: ip}
    downloadAll.execute(downloadData, new Responder(req, res, next))
}

const router = express.Router()
router.get('/companies/:companyId/downloadAll',
    validate(schema),
    usecase)

export default router

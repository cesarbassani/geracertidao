import Joi from 'joi'
import express from 'express'
import validate from 'express-validation'
import {Responder} from '@codate/commons'
import logDashboard from '../business/usecase/LogDashboard.mjs'
import userDashboard from '../business/usecase/UserDashboard.mjs'

const schema = {
    query: {
        page: Joi.string().required(),
        size: Joi.string().required()
    }
}

const usecase = (instance, req, res, next) => {
    const page = parseInt(req.query.page)
    const size = parseInt(req.query.size)
    const responder = new Responder(req, res, next)
    instance.execute(page, size, responder)
}

const router = express.Router()
router.get('/dashboard/logs', validate(schema), (req, res, next) => {
    usecase(logDashboard, req, res, next)
})

router.get('/dashboard/users', validate(schema), (req, res, next) => {
    usecase(userDashboard, req, res, next)
})

export default router
import {Responder} from '@codate/commons'
import audit from '../business/usecase/Audit.mjs'

export default (action) => {
    return (req, res, next) => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        const name = req.user.name ? req.user.name : 'login'
        const auditData = {ip: ip, name, email: req.user.email, action: action}
        audit.execute(auditData, new Responder(req, res, next))
    }
}

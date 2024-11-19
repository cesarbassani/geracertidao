import {userClient} from '@codate/commons'
import logAuditRepository from '../../repository/LogAuditRepository.mjs'

class Audit {
    async execute(auditData, responder) {
        try {
            await logAuditRepository.create(auditData)
            responder.next()
        } catch (err) {
            responder.error(err)
        }
    }
}

const audit = new Audit()
export default audit

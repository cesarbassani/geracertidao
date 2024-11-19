import logAuditRepository from '../../repository/LogAuditRepository.mjs'

class LogDashboard {
    async execute(pageNumber, size, responder) {
        const page = await logAuditRepository.findAll(pageNumber, size)
        responder.success(page)
    }
}

const logDashboard = new LogDashboard()
export default logDashboard
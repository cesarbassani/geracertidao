import LogAudit from './LogAudit.mjs'
import PaginationRepository from './PaginationRepository.mjs'

class LogAuditRepository extends PaginationRepository {
    async create(logAuditData) {
        await LogAudit.create(logAuditData)
    }

    async findAll(page, size) {
        return await super.findAll(LogAudit, page, size, 'createdAt', 'desc')
    }
}

const logAuditRepository = new LogAuditRepository()
export default logAuditRepository

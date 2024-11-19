import PaginationRepository from './PaginationRepository.mjs'
import {User} from '@codate/auth/src/repository/User.mjs'

class UserDashboardRepository extends PaginationRepository {
    async findAll(page, size) {
        return await super.findAll(User, page, size)
    }
}

const userDashboardRepository = new UserDashboardRepository()
export default userDashboardRepository
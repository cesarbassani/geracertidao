export default class PaginationRepository {
    async findAll(model, pageNumber, size, sortBy, sortDir) {
        const page = pageNumber
        const skip = (pageNumber - 1) * size
        const content = await this.executeQuery(model, skip, size, sortBy, sortDir)
        const totalElements = await this.getTotalElements(model)
        const pages = await this.countPages(totalElements, size)
        return {content, pages, page, size, totalElements}
    }

    async executeQuery(model, skip, size, sortBy, sortDir) {
        return await model.find()
            .skip(skip)
            .limit(size)
            .sort({[sortBy]: sortDir})
    }

    async countPages(totalElements, size) {
        let pages = Math.trunc(totalElements / size)
        if (pages < 1) {
            pages = 1
        } else if (totalElements % size) {
            pages = pages + 1
        }
        return pages
    }

    async getTotalElements(model) {
        return await model.countDocuments()
    }
}
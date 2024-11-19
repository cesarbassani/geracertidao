const dnode = require('dnode')
const logger = require('../common/logger')
const database = require('../common/database')
const singleScrapperExecution = require('../scrapper/SingleScrapperExecution')

class Server {
    async start() {
        this.listen(process.env.RPC_PORT)
        await this.connectDatabase()
        logger.info('Server started on port %s', process.env.RPC_PORT)
    }

    listen(port) {
        const rpc = dnode({
            getDocument(docNumber, docType) {
                singleScrapperExecution.execute(docNumber, docType)
            }
        })
        rpc.listen(port)
    }

    async connectDatabase() {
        await database.connect()
    }
}

module.exports = Server
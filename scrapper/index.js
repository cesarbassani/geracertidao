require('dotenv').config()
const Server = require('./src/common/Server')

const server = new Server()
server.start()
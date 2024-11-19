import app from './src/index.mjs'
import Server from './src/Server.mjs'

const server = new Server(app)
server.start()

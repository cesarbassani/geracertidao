import mongoose from 'mongoose'
import schedule from 'node-schedule'
import https from 'https'
import http from 'http'
import fs from 'fs'
import {logger} from '@codate/commons'
import updateDocuments from './business/job/UpdateDocuments.mjs'

export default class Server {
    constructor(app) {
        this.app = app
    }

    async start() {
        this.registerGlobalEvents()
        this.registerJobs()
        await this.connectDb()
        return this.startApp()
    }

    registerGlobalEvents() {
        process.on('unhandledRejection', (reason, p) => {
            throw reason
        })
        process.on('uncaughtException', (error) => {
            logger.error('Error not handled %s', error)
            process.exit(1)
        })
    }

    registerJobs() {
        schedule.scheduleJob(process.env.CRON_UPDATE_DOCUMENTS, () => {
            updateDocuments.execute()
        })
    }

    async connectDb() {
        mongoose.Promise = global.Promise
        const options = {
            autoIndex: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 3,
            bufferMaxEntries: 0
        }
        return mongoose.connect(process.env.DB_URL, options)
    }

    async startApp() {
        return new Promise((resolve, reject) => {
            try {

                // const options = {
                //     key: fs.readFileSync('./src/ssl/server.key'),
                //     cert: fs.readFileSync('./src/ssl/server.crt'),
                //     requestCert: false,
                //     rejectUnauthorized: false
                // };

                // const serverOn = https.createServer(options, this.app).listen(process.env.PORT, () => {
                //     logger.info('Server started on port %s', process.env.PORT)
                //     resolve(serverOn)
                // })

                const options = {}
                const serverOn = http.createServer(options, this.app).listen(process.env.PORT, () => {
                    logger.info('Server started on port %s', process.env.PORT)
                    resolve(serverOn)
                })
            } catch (err) {
                logger.error('Error on starting server %s', err)
                reject(err)
            }
        })
    }
}

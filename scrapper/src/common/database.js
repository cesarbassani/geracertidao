const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
const fs = require('fs')

class Database {
    constructor() {
        this.gfs = undefined
    }

    connect() {
        return new Promise((resolve, reject) => {
            const mongoUrl = process.env.DATABASE_URL
            const that = this
            this.conn = mongoose.createConnection(mongoUrl)
            this.conn.once('open', () => {
                that.gfs = Grid(that.conn.db, mongoose.mongo)
                resolve()
            })
        })
    }

    removeFile(filename) {
        return new Promise((resolve, reject) => {
            this.gfs.remove({filename}, (err) => {
                if (err) {
                    return reject(err)
                }
                resolve()
            })
        })
    }

    updateFile(path, filename, metadata) {
        return new Promise(async (resolve) => {
            await this.removeFile(filename)
            const writestream = this.gfs.createWriteStream({
                filename,
                metadata
            })
            fs.createReadStream(path).pipe(writestream)
            writestream.on('close', function (file) {
                resolve(file.filename)
            })
        })
    }
}

const database = new Database()
module.exports = database
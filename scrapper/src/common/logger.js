const bunyan = require('bunyan')

const logger = bunyan.createLogger({
    name: 'scrapper',
    src: true,
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'info',
            path: '/var/tmp/gera-certidao-scrapper.log'
        }
    ]
})

module.exports = logger

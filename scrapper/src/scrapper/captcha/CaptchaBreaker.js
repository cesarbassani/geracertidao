const anticaptcha = require('./anticaptcha')(process.env.ANTICAPTCHA_KEY)
const logger = require('../../common/logger')

class CaptchaBreaker {
    hasAvailableBalance() {
        return new Promise((resolve, reject) => {
            anticaptcha.getBalance((err, balance) => {
                if (err) {
                    logger.error(err)
                    return reject(err)
                } else if (balance === 0) {
                    //TODO enviar email aos admins para colocar crédito no anti-captcha
                    //TODO marcar documento não atualizado por falta de credito
                }
                else if (balance < 2) {
                    //TODO enviar email aos admins para colocar crédito no anti-captcha
                } else {
                    resolve(balance)
                }
            })
        })
    }

    async breakRecaptcha() {
        const taskId = await this.createRecaptchaTask()
        return await this.getTaskResponse(taskId)
    }

    async breakImageCaptcha(base64) {
        const taskId = await this.createImageCaptchaTask(base64)
        return await this.getTaskResponse(taskId)
    }

    createImageCaptchaTask(base64) {
        return new Promise((resolve, reject) => {
            anticaptcha.createImageToTextTask({case: true, body: base64}, (err, taskId) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                resolve(taskId)
            })
        })
    }

    createRecaptchaTask() {
        return new Promise((resolve, reject) => {
            anticaptcha.createTask((err, taskId) => {
                if (err) {
                    logger.error(err)
                    return reject(err)
                }
                resolve(taskId);
            }, 'NoCaptchaTaskProxyless')
        })
    }

    async getTaskResponse(taskId) {
        return new Promise((resolve, reject) => {
            anticaptcha.getTaskSolution(taskId, (err, taskSolution) => {
                if (err) {
                    logger.error(err)
                    return reject(err)
                }
                resolve(taskSolution)
            })
        })
    }

    setWebsiteUrl(websiteUrl) {
        anticaptcha.setWebsiteURL(websiteUrl)
    }

    setSiteKey(siteKey) {
        anticaptcha.setWebsiteKey(siteKey)
    }
}

module.exports = CaptchaBreaker
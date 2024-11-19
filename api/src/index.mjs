import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import passport from 'passport'
import {validationError, joiError, mongoError, generalError} from '@codate/commons'
import {confirm, exists, forgetPassword, login, loginFacebook, register, updatePassword, verifyToken, getUser, updateUser} from '@codate/auth'
import {createFile, getFile, removeFile} from '@codate/file'
import {sendEmail} from '@codate/email'

import addCompany from './router/AddCompany.mjs'
import myCompanies from './router/MyCompanies.mjs'
import updateDocumentStatus from './router/UpdateDocumentStatus.mjs'
import downloadAll from './router/DownloadAll.mjs'
import getCompany from './router/GetCompany.mjs'
import regenerateDocument from './router/RegenerateDocument.mjs'
import getSubscription from './router/GetSubscription.mjs'
import updateCompany from './router/UpdateCompany.mjs'
import dashboard from './router/Dashboard.mjs'

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(helmet())
app.use(cors())

app.use('/api', passport.initialize())
app.use('/api', exists)
app.use('/api', register)
app.use('/api', confirm)
app.use('/api', login)
app.use('/api', updatePassword)
app.use('/api', verifyToken)
app.use('/api', createFile)
app.use('/api', getFile)
app.use('/api', removeFile)
app.use('/api', loginFacebook)
app.use('/api', forgetPassword)
app.use('/api', getUser)
app.use('/api', updateUser)
app.use('/api', addCompany)
app.use('/api', myCompanies)
app.use('/api', updateDocumentStatus)
app.use('/api', regenerateDocument)
app.use('/api', downloadAll)
app.use('/api', getCompany)
app.use('/api', getSubscription)
app.use('/api', updateCompany)
app.use('/api', sendEmail)
app.use('/api', dashboard)

app.use(validationError)
app.use(joiError)
app.use(mongoError)
app.use(generalError)

export default app

import _ from 'lodash'
import fs from 'fs'
import tmp from 'tmp'
import archiver from 'archiver'
import {userClient} from '@codate/commons'
import {fileClient} from '@codate/commons'
import companyRepository from '../../repository/CompanyRepository.mjs'
import audit from './Audit.mjs'

const WAIT_TO_REMOVE_FILES = 2000

class DownloadAll {
    async execute({companyId, name, email, ip}, responder) {
        try {
            const documents = await getDocuments(companyId)
            const tempDir = createTemporaryFolder()
            const dowloadFiles = await downloadAllFiles(documents, tempDir.name)
            createZipFileInMemory(dowloadFiles, responder)

            await registerLogAudit(companyId, name, email, ip, responder)
            setTimeout(() => {
                removeAllFiles(dowloadFiles)
                removeTemporaryFolder(tempDir)
            }, WAIT_TO_REMOVE_FILES)
        } catch (err) {
            responder.error(err)
        }
    }
}

async function getDocuments(companyId) {
    const company = await companyRepository.findCompanyById(companyId)
    if (_.isEmpty(company.documents)) {
        throw new Error('NO_DOCUMENTS')
    }
    return company.documents
}

function createTemporaryFolder() {
    return tmp.dirSync()
}

function removeTemporaryFolder(tempDir) {
    tempDir.removeCallback()
}

async function downloadAllFiles(documents, tempDir) {
    const dowloadFiles = []
    for (let i in documents) {
        if (!_.isEmpty(documents[i].filename)) {
            const fullname = await fileClient.downloadFile(documents[i].filename, tempDir)
            dowloadFiles.push(fullname)
        }
    }
    return dowloadFiles
}

function removeAllFiles(files) {
    for (let i in files) {
        fs.unlinkSync(files[i])
    }
}

function createZipFileInMemory(files, responder) {
    const zipname = 'certidoes.zip'
    const mimetype = 'application/zip'
    const archive = archiver('zip', {zlib: {level: 9}})
    responder.prepareToDownload(archive, zipname, mimetype)
    for (let index in files) {
        archive.append(fs.createReadStream(files[index]), {name: getFilename(files[index])})
    }
    archive.finalize()
}

function getFilename(fullPath) {
    return fullPath.replace(/^.*[\\\/]/, '')
}

async function registerLogAudit(companyId, name, email, ip, responder) {
    const company = await companyRepository.findCompanyById(companyId)
    const auditData = {
        ip: ip,
        name: name,
        email: email,
        companyCnpj: company.cnpj,
        companyName: company.name,
        action: 'DOWNLOAD_ALL'
    }
    await audit.execute(auditData, responder)
}


const downloadAll = new DownloadAll()
export default downloadAll

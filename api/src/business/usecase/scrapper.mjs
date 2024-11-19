import dnode from 'dnode'

export default (cnpj, documentType) => {
    const scrapperClient = dnode.connect(process.env.SCRAP_SERVER_PORT)
    scrapperClient.on('remote', (remote) => {
        remote.getDocument(cnpj, documentType)
    })
}

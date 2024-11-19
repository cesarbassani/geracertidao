<template>
    <div>
        <app-header/>
        <detail-highlight :company="company" @regenerateAll="regenerateAll"/>
        <detail-documents :documents="company.documents" @generateDocument="generateDocument"/>
    </div>
</template>

<script>
    import {actionTypes} from '@/commons/constants'
    import DetailHighlight from './DetailHighlight'
    import DetailDocuments from './DetailDocuments'
    import AppHeader from '@/commons/components/AppHeader'

    const REFRESH_TIMEOUT = 5 * 1000
    const MAX_REFRESH_TIMES = 72

    export default {
        name: 'detail',
        components: {AppHeader, DetailHighlight, DetailDocuments},
        data() {
            return {
                refreshTimes: 0,
                processId: null
            }
        },
        computed: {
            company() {
                return this.$store.getters.getCurrentCompany(this.$route.params.cnpj)
            },
            isProcessingDocuments() {
                return this.$store.getters.isProcessingDocuments(this.company)
            }
        },
        created() {
            this.startAutoRefresh()
        },
        destroyed() {
            this.cancelAutoRefresh()
        },
        methods: {
            startAutoRefresh() {
                if (this.isProcessingDocuments) {
                    this.processId = window.setInterval(this.runAutoRefresh, REFRESH_TIMEOUT)
                }
            },
            cancelAutoRefresh() {
                if (this.processId) {
                    window.clearInterval(this.processId)
                }
            },
            async cancelUpdateForDocuments(documents) {
                for (let document of documents) {
                    const payload = {
                        cnpj: this.company.cnpj,
                        document: {
                            docType: document.name,
                            status: 'error',
                            message: 'tempo excedido.'
                        }
                    }
                    await this.$store.dispatch(actionTypes.UPDATE_DOCUMENT_STATUS, payload)
                }
            },
            async runAutoRefresh() {
                this.refreshTimes++
                if (this.hasExceededUpdateTime()) {
                    const documents = this.getNotGeneratedDocuments()
                    await this.cancelUpdateForDocuments(documents)
                    this.cancelAutoRefresh()
                }
                await this.$store.dispatch(actionTypes.MY_COMPANIES, this.$store.state.loggedUser.id)
            },
            hasExceededUpdateTime() {
                return this.refreshTimes > MAX_REFRESH_TIMES
            },
            getNotGeneratedDocuments() {
                const documentsWithError = []
                this.company.documents.forEach(document => {
                    if (document.status === 'processing') {
                        documentsWithError.push(document)
                    }
                })
                return documentsWithError
            },
            async generateDocument(documentName) {
                this.refreshTimes = 0
                const payload = {
                    cnpj: this.company.cnpj,
                    document: documentName
                }
                await this.$store.dispatch(actionTypes.GENERATE_DOCUMENT, payload)
                await this.runAutoRefresh()
                await this.startAutoRefresh()
            },
            async regenerateAll() {
                this.refreshTimes = 0
                for (let document of this.company.documents) {
                    await this.generateDocument(document.name)
                }
            }
        }
    }
</script>

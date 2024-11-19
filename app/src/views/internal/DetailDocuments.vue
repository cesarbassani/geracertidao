<template>
    <div class="container">
        <app-space/>
        <div class="row">
            <div class="col-md-6 text-center offset-3">
                <p>Sempre que um documento desta lista vencer enviamos um e-mail pra você com todos os documentos renovados!</p>
            </div>
        </div>
        <ul class="lista_default">
            <detail-documents-item :document="doc" v-for="doc in documents" @generateDocument="generateDocument"/>
        </ul>
        <app-space/>
    </div>
</template>

<script>
    import DetailDocumentsItem from './DetailDocumentsItem'
    import AppSpace from '@/commons/components/AppSpace'

    export default {
        name: 'detail-documents',
        components: {AppSpace, DetailDocumentsItem},
        props: ['documents'],
        methods: {
            generateDocument(payload) {
                this.$emit('generateDocument', payload)
            }
        }
    }
</script>

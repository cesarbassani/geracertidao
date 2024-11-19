<template>
    <div class="box_destaque">
        <div class="container">
            <div class="col-md-12">
                <h1>{{company.name}}</h1>
                <h2>{{company.cnpj | cpfCnpj}}</h2>
                <a v-if="stillProcessing" class="btn-prime">
                    <v-icon name="spinner" pulse></v-icon> GERANDO CERTIDÕES
                </a>
                <a v-if="!stillProcessing && !isPremmium && hasDocumentsToDownload" href="/#/upgrade" class="btn-prime">
                    <v-icon name="check"></v-icon> BAIXAR CERTIDÕES
                </a>
                <a v-if="!stillProcessing && isPremmium && hasDocumentsToDownload" :href="downloadAll" class="btn-prime">
                    <v-icon name="check"></v-icon> BAIXAR CERTIDÕES
                </a>
                <a v-if="!stillProcessing && !hasDocumentsToDownload" @click.prevent="$emit('regenerateAll')" class="btn-prime">
                    <v-icon name="redo-alt"/> REGERAR CERTIDÕES
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    import Icon from 'vue-awesome/components/Icon'

    export default {
        name: 'detail-highlight',
        props: ['company'],
        components: {
            'v-icon': Icon
        },
        computed: {
            downloadAll() {
                return `/api/companies/${this.company._id}/downloadAll?name=${this.$store.state.loggedUser.name}&email=${this.$store.state.loggedUser.email}`
            },
            isPremmium() {
                return this.$store.getters.isPremmium()
            },
            stillProcessing() {
                return this.$store.getters.isProcessingDocuments(this.company)
            },
            hasDocumentsToDownload() {
                return this.$store.getters.hasDocumentsToDownload(this.company)
            }
        }
    }
</script>

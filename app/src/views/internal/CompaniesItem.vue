<template>
    <li>
        <a :href="linkDetail(model)">
            <div class="row">
                <div class="col-md-8">
                    <p>
                        <strong>Empresa:</strong> {{model.name}} <br>
                        <strong>CNPJ:</strong> {{model.cnpj | cpfCnpj}}
                    </p>
                </div>
                <div class="col-md-2">
                    <span class="badge badge-success">{{documentsSize}} certidões geradas</span>
                </div>
                <div class="col-md-2">
                </div>
            </div>
        </a>
    </li>
</template>

<script>
    export default {
        name: 'companies',
        props: ['model'],
        computed: {
            documentsSize() {
                return this.model.documents.reduce((a, d) => a + (d.status === 'success' ? 1 : 0), 0)
            }
        },
        methods: {
            linkDetail(company) {
                return `/#/detail/${company.cnpj}`
            }
        }
    }
</script>

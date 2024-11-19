<template>
    <div style="height: 100%">
        <app-header v-if="$store.getters.hasCompanies()"/>
        <div class="box_center primeira_empresa">
            <div class="container text-center">
                <div class="offset-md-2 col-md-8 text-center">
                    <h1 v-if="$store.getters.noCompanies()">
                        Olá <strong>{{$store.state.loggedUser.name}}</strong>, bem vindo.<br>
                        Comece cadastrando uma empresa, qual seu <strong>CNPJ</strong>?
                    </h1>
                    <h1 v-else>
                        Qual o <strong>CNPJ</strong> da nova empresa?
                    </h1>
                    <app-space/>
                    <form v-on:submit.prevent="submit">
                        <the-mask autofocus class="form-control cnpj" mask="##.###.###/####-##" name="CNPJ" :masked="false"
                                  :class="{ 'is-invalid': submitted && errors.has('CNPJ') }"
                                  v-model="cnpj" v-validate="{required: true, checkCnpj: true, existCnpj: $store.state.loggedUser.id}"
                                  placeholder="00.000.0000/00001-00"/>
                        <div v-if="submitted && errors.has('CNPJ')" class="invalid-feedback">{{ errors.first('CNPJ') }}</div>
                        <app-space/>
                        <button class="btn-prime" type="submit" :disabled="(submitted && errors.any()) || $store.state.loading">
                            <span v-if="!$store.state.loading">GERAR CERTIDÕES</span>
                            <span v-if="$store.state.loading">PROCESSANDO</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {actionTypes} from '@/commons/constants'
    import AppSpace from '@/commons/components/AppSpace'
    import AppHeader from '@/commons/components/AppHeader'

    export default {
        name: 'add-company',
        components: {AppSpace, AppHeader},
        data() {
            return {
                cnpj: '',
                submitted: false
            }
        },
        methods: {
            async submit() {
                this.submitted = true
                const isValid = await this.$validator.validateAll()
                if (isValid) {
                    this.addCompany()
                }
            },
            async addCompany() {
                try {
                    const companyData = {email: this.$store.state.loggedUser.email, cnpj: this.cnpj}
                    await this.$store.dispatch(actionTypes.ADD_COMPANY, companyData)
                    this.redirectToDetail()
                } catch (err) {
                    this.$refs.alert.showError(dictionary(err))
                }
            },
            redirectToDetail() {
                this.$router.push({name: 'Detail', params: {cnpj: this.cnpj}})
            }
        }
    }
</script>

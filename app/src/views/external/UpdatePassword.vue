<template>
    <div style="height: 100%">
        <app-header/>
        <app-content>
            <app-logo/>
            <app-space/>
            <app-space/>
            <app-alert ref="alert"></app-alert>
            <form v-on:submit.prevent="submit" autocomplete="off">
                <div class="form-group">
                    <input ref="senha" type="password" name="Senha" class="form-control senha"
                           :class="{ 'is-invalid': submitted && errors.has('Senha') }"
                           placeholder="Sua senha" v-validate="'required'" v-model="password">
                    <div v-if="submitted && errors.has('Senha')" class="invalid-feedback">{{ errors.first('Senha') }}</div>
                </div>
                <div class="form-group">
                    <input type="password" name="Confirmacao" class="form-control senha"
                           :class="{ 'is-invalid': submitted && errors.has('Confirmacao') }"
                           placeholder="Confirme sua senha" v-validate="'confirmed:senha'" v-model="confirmation">
                    <div v-if="submitted && errors.has('Confirmacao')" class="invalid-feedback">{{ errors.first('Confirmacao') }}</div>
                </div>
                <app-space/>
                <button class="btn-prime" type="submit" :disabled="(submitted && errors.any()) || $store.state.loading">
                    <span v-if="!$store.state.loading">ALTERAR A SENHA</span>
                    <span v-if="$store.state.loading">PROCESSANDO</span>
                </button>
            </form>
            <app-space/>
            <app-space/>
        </app-content>
    </div>
</template>

<script>
    import {query, actionTypes} from '@/commons/constants'
    import {dictionary} from '@/commons/utils'
    import AppHeader from "@/commons/components/AppHeader"
    import AppContent from "@/commons/components/AppContent"
    import AppLogo from "@/commons/components/AppLogo"
    import AppSpace from "@/commons/components/AppSpace"
    import AppAlert from "@/commons/components/AppAlert"

    export default {
        components: {AppAlert, AppSpace, AppLogo, AppContent, AppHeader},
        data() {
            return {
                token: '',
                password: '',
                confirmation: '',
                submitted: false
            }
        },
        beforeRouteEnter(to, from, next) {
            next(async vm => {
                vm.token = to.query.token
            })
        },
        methods: {
            async submit() {
                this.submitted = true
                const isValid = await this.$validator.validateAll()
                if (isValid) {
                    this.updatePassword()
                }
            },
            async updatePassword() {
                try {
                    const userData = {token: this.token, password: this.password}
                    await this.$store.dispatch(actionTypes.UPDATE_PASSWORD, userData)
                    this.redirectToHome()
                } catch (err) {
                    this.$refs.alert.showError(dictionary(err))
                }
            },
            redirectToHome() {
                this.$router.push({name: 'Home'})
            }
        }
    }
</script>

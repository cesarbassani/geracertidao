<template>
    <div style="height: 100%">
        <app-loading/>
        <app-header/>
        <app-content>
            <app-logo/>
            <app-space/>
            <facebook/>
            <app-space/>
            <app-alert ref="alert"></app-alert>
            <form v-on:submit.prevent="submit" autocomplete="off">
                <div class="form-group">
                    <input type="text" name="Email" class="form-control email" :class="{ 'is-invalid': submitted && errors.has('Email') }"
                           placeholder="Digite seu E-mail" v-validate="'required|email'" v-model="email">
                    <div v-if="submitted && errors.has('Email')" class="invalid-feedback">{{ errors.first('Email') }}</div>
                </div>
                <div class="form-group text-left">
                    <input type="password" name="Senha" class="form-control senha" :class="{ 'is-invalid': submitted && errors.has('Senha') }"
                           placeholder="Digite a sua Senha" v-validate="'required'" v-model="password">
                    <div v-if="submitted && errors.has('Senha')" class="invalid-feedback">{{ errors.first('Senha') }}</div>
                    <a class="esqueceusenha" href="/#/forget-password">Esqueci a senha</a>
                </div>

                <button class="btn-prime" type="submit" :disabled="(submitted && errors.any()) || $store.state.loading">
                    <span v-if="!$store.state.loading">ENTRAR</span>
                    <span v-if="$store.state.loading">PROCESSANDO</span>
                </button>
            </form>
            <app-space/>

            <app-space/>
            <a class="cadastrar" href="/#/register">Criar Conta Gratuita!</a>
            <app-space/>
        </app-content>
        <policies-terms/>
    </div>
</template>

<script>
    import {actionTypes} from '@/commons/constants'
    import {dictionary, query} from '@/commons/utils'
    import AppLoading from "@/commons/components/AppLoading.vue"
    import AppHeader from "@/commons/components/AppHeader"
    import AppContent from "@/commons/components/AppContent"
    import AppLogo from "@/commons/components/AppLogo"
    import AppSpace from "@/commons/components/AppSpace"
    import AppAlert from "@/commons/components/AppAlert"
    import Facebook from "./shared/Facebook"
    import PoliciesTerms from './shared/PoliciesTerms'

    export default {
        name: 'login',
        components: {PoliciesTerms, Facebook, AppSpace, AppLogo, AppContent, AppHeader, AppLoading, AppAlert},
        data() {
            return {
                email: '',
                password: '',
                submitted: false
            }
        },
        beforeRouteEnter(to, from, next) {
            next(async vm => {
                const emailConfirmedToken = query('emailConfirmed')
                if (emailConfirmedToken) {
                    await vm.$store.dispatch(actionTypes.CONFIRM_EMAIL, emailConfirmedToken)
                    vm.redirectToHome()
                } else {
                    const code = query('code')
                    if (code) {
                        await vm.$store.dispatch(actionTypes.LOGIN_FACEBOOK, code)
                        vm.redirectToHome()
                    }
                }
            })
        },
        methods: {
            async submit() {
                this.submitted = true
                const isValid = await this.$validator.validateAll()
                if (isValid) {
                    this.login()
                }
            },
            async login() {
                try {
                    const credentials = {email: this.email, password: this.password}
                    await this.$store.dispatch(actionTypes.LOGIN, credentials)
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

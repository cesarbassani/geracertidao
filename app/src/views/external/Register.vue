<template>
    <div style="height: 100%">
        <app-header/>
        <app-content>
            <app-logo/>
            <app-space/>
            <facebook/>
            <app-space/>
            <app-alert ref="alert"></app-alert>
            <form v-on:submit.prevent="submit" autocomplete="off">
                <div class="form-group">
                    <input type="text" name="Nome" class="form-control nome" :class="{ 'is-invalid': submitted && errors.has('Nome') }"
                           placeholder="Seu nome" v-validate="'required'" v-model="name">
                    <div v-if="submitted && errors.has('Nome')" class="invalid-feedback">{{ errors.first('Nome') }}</div>
                </div>
                <div class="form-group">
                    <input type="text" name="Email" class="form-control email" :class="{ 'is-invalid': submitted && errors.has('Email') }"
                           placeholder="Seu e-mail" v-validate="'required|email'" v-model="email">
                    <div v-if="submitted && errors.has('Email')" class="invalid-feedback">{{ errors.first('Email') }}</div>
                </div>
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
                    <span v-if="!$store.state.loading">CADASTRAR</span>
                    <span v-if="$store.state.loading">PROCESSANDO</span>
                </button>
            </form>
            <app-space/>
            <app-space/>
            <policies-terms/>
        </app-content>
    </div>
</template>

<script>
    import {actionTypes} from '@/commons/constants'
    import {dictionary} from '@/commons/utils'
    import AppHeader from "@/commons/components/AppHeader"
    import AppContent from "@/commons/components/AppContent"
    import AppLogo from "@/commons/components/AppLogo"
    import AppSpace from "@/commons/components/AppSpace"
    import AppAlert from "@/commons/components/AppAlert"
    import Facebook from './shared/Facebook'
    import PoliciesTerms from './shared/PoliciesTerms'

    export default {
        components: {AppAlert, AppSpace, AppLogo, AppContent, AppHeader, Facebook, PoliciesTerms},
        data() {
            return {
                name: '',
                email: '',
                password: '',
                confirmation: '',
                submitted: false
            }
        },
        methods: {
            async submit() {
                this.submitted = true
                const isValid = await this.$validator.validateAll()
                if (isValid) {
                    this.register()
                }
            },
            async register() {
                try {
                    const userData = {name: this.name, email: this.email, password: this.password}
                    await this.$store.dispatch(actionTypes.REGISTER, userData)
                    this.redirectToConfirmation()
                } catch (err) {
                    this.$refs.alert.showError(dictionary(err))
                }
            },
            redirectToConfirmation() {
                this.$router.push({name: 'WaitingConfirmation', params: {action: 'REGISTER'}})
            }
        }
    }
</script>

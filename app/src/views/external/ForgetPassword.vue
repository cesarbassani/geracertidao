<template>
    <div style="height: 100%">
        <app-loading/>
        <app-header/>
        <app-content>
            <app-logo/>
            <app-space/>
            <app-space/>
            <app-alert ref="alert"></app-alert>
            <form v-on:submit.prevent="submit" autocomplete="off">
                <div class="form-group">
                    <input type="text" name="Email" class="form-control email" :class="{ 'is-invalid': submitted && errors.has('Email') }"
                           placeholder="Insira seu email para procurar sua conta" v-validate="'required|email'" v-model="email">
                    <div v-if="submitted && errors.has('Email')" class="invalid-feedback">{{ errors.first('Email') }}</div>
                </div>
                <app-space/>
                <button class="btn-prime" type="submit" :disabled="(submitted && errors.any()) || $store.state.loading">
                    <span v-if="!$store.state.loading">ALTERAR SENHA</span>
                    <span v-if="$store.state.loading">PROCESSANDO</span>
                </button>
            </form>
            <app-space/>
            <app-space/>
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
    import AppLoading from '@/commons/components/AppLoading'

    export default {
        name: 'forget-password',
        components: {AppLoading, AppSpace, AppLogo, AppContent, AppHeader, AppAlert},
        data() {
            return {
                email: '',
                submitted: false
            }
        },
        methods: {
            async submit() {
                this.submitted = true
                const isValid = await this.$validator.validateAll()
                if (isValid) {
                    this.forgetPassword()
                }
            },
            async forgetPassword() {
                try {
                    await this.$store.dispatch(actionTypes.FORGET_PASSWORD, this.email)
                    this.redirectToConfirmation()
                } catch (err) {
                    this.$refs.alert.showError(dictionary(err))
                }
            },
            redirectToConfirmation() {
                this.$router.push({name: 'WaitingConfirmation', params: { action: 'FORGET_PASSWORD' }})
            }
        }
    }
</script>

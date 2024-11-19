<template>
    <div style="height: 100%">
        <app-header/>
        <app-content>
            <app-logo/>
            <app-space/>
            <app-space/>
            <div v-if="action == 'REGISTER'" class="alert alert-success" role="alert">
                <h4 class="alert-heading">Bom trabalho!</h4>
                <p>Acabamos de te enviar um email, deve estar chegando.</p>
                <p>Para continuar, basta entrar no email que te enviamos e clicar no link de confirmação. Fácil, né?</p>
                <hr>
            </div>
            <div v-if="action == 'FORGET_PASSWORD'" class="alert alert-success" role="alert">
                <h4 class="alert-heading">Bom trabalho!</h4>
                <p>Acabamos de te enviar um email, deve estar chegando.</p>
                <p>Clique no link do email que acabamos de te enviar para poder alterar a sua senha</p>
                <hr>
            </div>
            <app-space/>
            <app-space/>
        </app-content>
    </div>
</template>

<script>
    import AppHeader from "@/commons/components/AppHeader"
    import AppContent from "@/commons/components/AppContent"
    import AppLogo from "@/commons/components/AppLogo"
    import AppSpace from "@/commons/components/AppSpace"

    export default {
        name: 'waiting-confirmation',
        components: {AppSpace, AppLogo, AppContent, AppHeader},
        data() {
            return {
                action: 'REGISTER'
            }
        },
        beforeRouteUpdate(to, from, next) {
            this.action = to.params.action
            next()
        }
    }
</script>

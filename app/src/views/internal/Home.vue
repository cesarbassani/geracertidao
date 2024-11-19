<template>
    <div style="height: 100%">
        <app-loading/>
        <app-menu/>

        <div class="box_destaque" style="background: url('img/bg_painel.png');">
            <div class="container">
                <div class="col-md-12">
                    <h1>Olá, {{$store.state.loggedUser.name}}</h1>
                    <h2>{{$store.getters.companiesSize()}} empresas | {{$store.getters.documentsSize()}} certidões geradas</h2>
                </div>
            </div>
        </div>

        <div class="container">
            <ul class="lista_default lista_link">
                <companies-item :model="company" v-for="company in $store.state.companiesAllowed"></companies-item>
            </ul>
        </div>

        <div class="btn_action_footer">
            <a class="btn-prime" href="#/add-company">Nova Empresa</a>
        </div>
    </div>
</template>

<script>
    import AppMenu from '@/commons/components/AppMenu.vue'
    import CompaniesItem from './CompaniesItem.vue'
    import AppLoading from '@/commons/components/AppLoading.vue'

    export default {
        components: {
            AppLoading, AppMenu, CompaniesItem
        }
    }
</script>

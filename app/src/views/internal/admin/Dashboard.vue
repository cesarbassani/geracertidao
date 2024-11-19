<template>
  <div>
    <app-menu title="Dashboard" color="#19396A"/>
    <app-internal-subtitle subtitle="Itens disponíveis"/>
    <div class="container nofificacoes">
      <div class="row">
        <div class="offset-md-3 col-md-6">
          <ul class="lista_default lista_link">
            <li v-for="(dash, index) in dashList" :key="index">
              <a @click.prevent="navigateTo(dash.route)">
                <p>{{dash.name}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import AppMenu from '@/commons/components/AppMenu'
    import AppInternalTitle from '@/commons/components/AppInternalTitle'
    import AppInternalSubtitle from '../../../commons/components/AppInternalSubtitle'

    export default {
        components: {
            AppInternalSubtitle,
            AppInternalTitle,
            AppMenu
        },
        name: 'dashboard',
        data() {
            return {
                dashList: [{
                    name: 'Logs de Acessos',
                    route: 'LogsDashboard'
                }, {
                    name: 'Clientes',
                    route: 'UsersDashboard'
                }]
            }
        },
        methods: {
            navigateTo(routeName) {
                this.$router.push({name: routeName})
            }
        }
    }
</script>
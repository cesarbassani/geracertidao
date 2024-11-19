<template>
  <div>
    <app-internal-title title="Dashboard" icon="arrow_left_white"/>
    <app-internal-subtitle subtitle="Log completo de acessos"/>
    <div class="container">
      <div class="row">
        <div class="col-md-12" v-if="logs">
          <table class="table table-striped">
            <thead>
            <tr>
              <th scope="col">Data/Hora</th>
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
              <th scope="col">Atividade</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(log, index) in logs.content" :key="index">
              <td>{{log.createdAt | date('DD/MM/YYYY HH:mm:ss')}}</td>
              <td>{{log.name}}</td>
              <td>{{log.email}}</td>
              <td>{{log.action | action}}</td>
            </tr>
            </tbody>
          </table>

          <hr>
          <hr class="space"/>

          <app-table-pagination :current-page="page" :total-pages="logs.pages" @paginate="paginate"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import AppInternalTitle from '@/commons/components/AppInternalTitle'
    import AppInternalSubtitle from '@/commons/components/AppInternalSubtitle'
    import {actionTypes} from '@/commons/constants'
    import AppTablePagination from '@/commons/components/AppTablePagination'

    export default {
        name: 'logs-dashboard',
        components: {
            AppTablePagination,
            AppInternalTitle,
            AppInternalSubtitle
        },
        data() {
            return {
                logs: undefined,
                page: 1,
                pages: undefined,
                size: 10
            }
        },
        async mounted() {
            await this.findAllLogs()
        },
        methods: {
            async findAllLogs() {
                this.logs = await this.$store.dispatch(actionTypes.ALL_LOGS, {page: this.page, size: this.size})
            },
            async paginate(page) {
                this.page = page
                await this.findAllLogs()
            }
        },
        filters: {
            action(actionType) {
                const firstLetter = actionType[0]
                actionType = actionType.toLowerCase()
                actionType = actionType.replace('_', ' ')
                actionType = firstLetter + actionType.substr(1, actionType.length)
                return actionType
            }
        }
    }
</script>
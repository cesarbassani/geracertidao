<template>
  <div>
    <app-internal-title title="Dashboard" icon="arrow_left_white"/>
    <app-internal-subtitle subtitle="Lista completa de clientes"/>
    <div class="container">
      <div class="row">
        <div class="col-md-12" v-if="users">
          <table class="table table-striped">
            <thead>
            <tr>
              <th scope="col">Criação</th>
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
              <th scope="col" class="text-center">Empresas</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="customer in users.content" :key="customer._id">
              <td>{{customer | date('DD/MM/YYYY HH:mm:ss')}}</td>
              <td>{{customer.name}}</td>
              <td>{{customer.email}}</td>
              <td>
                <div v-for="company in customer.companies" :key="company._id">
                  <span class="badge badge-secondary mr-1">{{company.name | clip-text}}</span>
                  <br/>
                </div>
              </td>
            </tr>
            </tbody>
          </table>

          <hr>
          <hr class="space"/>

          <app-table-pagination :current-page="page" :total-pages="users.pages" @paginate="paginate"/>
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
        name: 'users-dashboard',
        components: {
            AppTablePagination,
            AppInternalTitle,
            AppInternalSubtitle
        },
        data() {
            return {
                users: undefined,
                page: 1,
                pages: undefined,
                size: 10
            }
        },
        async mounted() {
            await this.findAllUsers()
        },
        methods: {
            async findAllUsers() {
                this.users = await this.$store.dispatch(actionTypes.ALL_USERS, {
                    page: this.page,
                    size: this.size
                })
            },
            async paginate(page) {
                this.page = page
                await this.findAllUsers()
            }
        },
        filters: {
            clipText(text, limit = 50) {
                if (!text) {
                    return ''
                }
                if (text.length < limit) {
                    return text
                }
                return `${text.substr(0, limit)}...`
            }
        }
    }
</script>
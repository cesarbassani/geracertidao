<template>
    <div>
        <div class="menu_top menu_fix">
            <a href="/#/home" class="btn_left">
                <img src="img/close.svg" alt="Fechar" width="24"/>
            </a>
            <span class="title">Minha Conta</span>
        </div>
        <hr class="space">
        <hr class="space">
        <hr class="space">
        <hr class="space">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="dados" role="tabpanel" aria-labelledby="dados-gerais">
                            <div class="row">
                                <div class="offset-md-3 col-md-6">
                                    <app-alert ref="alert"></app-alert>
                                    <form v-on:submit.prevent="submit" autocomplete="off">
                                        <div class="form-group">
                                            <label>Nome</label>
                                            <input type="text" name="Nome" class="form-control"
                                                   :class="{ 'is-invalid': submitted && errors.has('Nome') }"
                                                   placeholder="Informe o seu nome" v-validate="'required'" v-model="name">
                                        </div>
                                        <div class="form-group">
                                            <label>E-mail</label>
                                            <input disabled type="text" name="email" class="form-control" v-model="$store.state.loggedUser.email">
                                        </div>
                                        <div class="form-group">
                                            <label for="telefone">Telefone:</label>
                                            <the-mask id="telefone" name="telefone" class="form-control" placeholder="ex: (00) 00000-0000"
                                                   :class="{ 'is-invalid': submitted && errors.has('telefone') }"
                                                   v-validate="'required'" v-model="phoneNumber" type="text" :mask="['(##) ####-####', '(##) #####-####']" :masked="false"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="plano">Plano:</label>
                                            <h5><a class="text-muted" href="/#/upgrade"> {{ $store.state.subscription.level | dictionary}}</a></h5>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn_action_footer">
            <button class="btn-prime" @click="submit">SALVAR</button>
        </div>
    </div>
</template>

<script>
    import {actionTypes} from '@/commons/constants'
    import {dictionary} from '@/commons/utils'
    import AppAlert from "@/commons/components/AppAlert"

    export default {
        name: 'profile',
        components: {AppAlert},
        data() {
            return {
                name: this.$store.state.loggedUser.name,
                phoneNumber: this.$store.state.loggedUser.phoneNumber,
                submitted: false
            }
        },
        methods: {
            async submit() {
                this.submitted = true
                const isValid = await this.$validator.validateAll()
                if (isValid) {
                    this.updateUser()
                }
            },
            async updateUser() {
                try {
                    const userData = {id: this.$store.state.loggedUser.id, name: this.name, phoneNumber: this.phoneNumber}
                    await this.$store.dispatch(actionTypes.UPDATE_USER, userData)
                    this.$refs.alert.showSuccess(dictionary('USER_UPDATED'))
                } catch (err) {
                    this.$refs.alert.showError(dictionary(err))
                }
            }
        }
    }
</script>

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './commons/store'
import {actionTypes} from './commons/constants'

class AppBuilder {
    async build() {
        await this._initializeState()
        this._criarInstanciaVue()
    }

    async _initializeState() {
        const token = sessionStorage.getItem('jwt')
        if (token) {
            await store.dispatch(actionTypes.VERIFY_TOKEN, token)
            await store.dispatch(actionTypes.MY_COMPANIES, store.state.loggedUser.id)
            await store.dispatch(actionTypes.MY_SUBSCRIPTION, store.state.loggedUser.id)
        }
    }

    _criarInstanciaVue() {
        new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
}

export default new AppBuilder()

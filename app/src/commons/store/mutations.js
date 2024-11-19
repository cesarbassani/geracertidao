import {mutationTypes} from '../constants'

export default {

    [mutationTypes.ADD_COMPANY](state, company) {
        state.companiesAllowed.push(company)
    },

    [mutationTypes.SET_GLOBAL_LOADING](state, isLoading) {
        state.loading = isLoading
    },

    [mutationTypes.SET_TOKEN](state, token) {
        state.token = token
    },

    [mutationTypes.SET_LOGGED_USER](state, user) {
        state.loggedUser = user
    },

    [mutationTypes.SET_SUBSCRIPTION](state, subscription) {
        state.subscription = subscription
    },

    [mutationTypes.SET_COMPANY](state, companies) {
        state.companiesAllowed.splice(0)
        Array.prototype.push.apply(state.companiesAllowed, companies)
    }
}

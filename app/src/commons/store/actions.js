import axios from 'axios'
import {actionTypes, mutationTypes} from '../constants'
import {jwt} from '../utils'

export default {
    [actionTypes.ADD_TOKEN](context, token) {
        sessionStorage.setItem('jwt', token)
    },

    [actionTypes.REMOVE_TOKEN]() {
        sessionStorage.removeItem('jwt')
    },

    async [actionTypes.AFTER_LOGIN]({dispatch, commit}, data) {
        dispatch(actionTypes.ADD_TOKEN, data.token)
        commit(mutationTypes.SET_TOKEN, data.token)
        commit(mutationTypes.SET_LOGGED_USER, data.payload)
        await dispatch(actionTypes.MY_COMPANIES, data.payload.id)
        await dispatch(actionTypes.MY_SUBSCRIPTION, data.payload.id)
    },

    async [actionTypes.LOGIN]({dispatch}, credencials) {
        const {data} = await axios.post(`api/auth/login`, credencials)
        await dispatch(actionTypes.AFTER_LOGIN, data)
    },

    async [actionTypes.REGISTER](context, userData) {
        const {data} = await axios.post(`api/auth/register`, userData)
        return data
    },

    async [actionTypes.CONFIRM_EMAIL]({dispatch}, emailConfirmedToken) {
        const {data} = await axios.get(`api/auth/confirm/${emailConfirmedToken}`)
        await dispatch(actionTypes.AFTER_LOGIN, data)
    },

    async [actionTypes.LOGIN_FACEBOOK]({dispatch}, code) {
        const {data} = await axios.get(`api/auth/login/facebook?code=${code}`)
        await dispatch(actionTypes.AFTER_LOGIN, data)
    },

    async [actionTypes.LOGOUT]({dispatch, commit}) {
        dispatch(actionTypes.REMOVE_TOKEN)
        commit(mutationTypes.SET_TOKEN, '')
        commit(mutationTypes.SET_LOGGED_USER, '')
        commit(mutationTypes.SET_COMPANY, {})
    },

    async [actionTypes.FORGET_PASSWORD](context, email) {
        const {data} = await axios.post(`api/auth/password/${email}`)
        return data
    },

    async [actionTypes.UPDATE_DOCUMENT_STATUS]({state}, document) {
        await axios.put('api/documents/status', document, jwt(state))
    },

    async [actionTypes.UPDATE_PASSWORD]({dispatch}, credencials) {
        const {data} = await axios.put(`api/auth/password`, credencials)
        await dispatch(actionTypes.AFTER_LOGIN, data)
    },

    async [actionTypes.ADD_COMPANY]({commit, state}, companyData) {
        const {data} = await axios.post(`api/companies`, companyData, jwt(state))
        commit(mutationTypes.ADD_COMPANY, data)
    },

    async [actionTypes.VERIFY_TOKEN]({commit}, token) {
        const {data} = await axios.get(`api/auth/verify/${token}`)
        commit(mutationTypes.SET_TOKEN, token)
        commit(mutationTypes.SET_LOGGED_USER, data)
    },

    async [actionTypes.MY_COMPANIES]({commit, state}, userId) {
        const {data} = await axios.get(`api/companies/mine?id=${userId}`, jwt(state))
        commit(mutationTypes.SET_COMPANY, data)
    },

    async [actionTypes.MY_SUBSCRIPTION]({commit, state}, userId) {
        const {data} = await axios.get(`api/subscriptions?userId=${userId}`, jwt(state))
        commit(mutationTypes.SET_SUBSCRIPTION, data)
    },

    async [actionTypes.GENERATE_DOCUMENT]({state}, payload) {
        await axios.post(`api/documents/generate`, payload, jwt(state))
    },

    async [actionTypes.UPDATE_USER]({commit}, userData) {
        const {data} = await axios.put(`api/users`, userData)
        commit(mutationTypes.SET_LOGGED_USER, data)
    },

    async [actionTypes.ALL_LOGS](context, {page, size}) {
        const {data} = await axios.get(`api/dashboard/logs?page=${page}&size=${size}`)
        return data
    },

    async [actionTypes.ALL_USERS](context, {page, size}) {
        const {data} = await axios.get(`api/dashboard/users?page=${page}&size=${size}`)
        return data
    }
}

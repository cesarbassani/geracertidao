import _ from 'lodash'
import store from '@/commons/store'
import {mutationTypes} from '@/commons/constants'

export default (to, from, next) => {
    if (isPublicPage(to)) {
        return next()
    }
    handlePrivatePages(to, from, next)
}

function handlePrivatePages(to, from, next) {
    if (iAmNotLoggedIn()) {
        return redirectToLogin(to, next)
    }

    if (iAmOnHomePage(to) && iDoNotHaveRegisteredCompany()) {
        return redirectToAddCompany(next)
    }

    if (imAdmin()) {
        return redirectToDashboard(next)
    }

    next()
}

function iDoNotHaveRegisteredCompany() {
    return _.isEmpty(store.state.companiesAllowed)
}

function iAmOnHomePage(to) {
    return to.name === 'Home'
}

function isPublicPage(to) {
    return !to.matched.some(record => record.meta.requiresAuth)
}

function iAmNotLoggedIn() {
    return !(sessionStorage.getItem('jwt') !== null)
}

function imAdmin() {
    return store.state.loggedUser.isAdmin
}

function redirectToLogin(to, next) {
    next({
        path: '/login',
        params: {redirectTo: to.fullPath}
    })
}

function redirectToAddCompany(next) {
    next({name: 'AddCompany'})
}

function redirectToDashboard(next) {
    next({name: 'Dashboard'})
}

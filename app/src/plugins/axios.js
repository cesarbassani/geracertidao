import axios from 'axios'
import store from '@/commons/store/index'
import {mutationTypes} from '@/commons/constants/index'

const requestSuccessInterceptor = config => {
    store.commit(mutationTypes.SET_GLOBAL_LOADING, true)
    return config
}

const responseSuccessInterceptor = response => {
    store.commit(mutationTypes.SET_GLOBAL_LOADING, false)
    return response
}

const errorHandlerInterceptor = error => {
    store.commit(mutationTypes.SET_GLOBAL_LOADING, false)
    return Promise.reject(error)
}

axios.interceptors.request.use(requestSuccessInterceptor, errorHandlerInterceptor)
axios.interceptors.response.use(responseSuccessInterceptor, errorHandlerInterceptor)

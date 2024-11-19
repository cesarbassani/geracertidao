import Vue from 'vue'
import appBuilder from './AppBuilder'
import filters from '@/commons/filters'
import '@babel/polyfill'
import './plugins'
import 'vue-awesome/icons'


Vue.use(filters)

appBuilder.build()

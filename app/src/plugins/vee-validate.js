import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import ptBR from 'vee-validate/dist/locale/pt_BR'
import {existCnpj, checkCnpj} from '@/commons/validators'

Validator.extend('existCnpj', existCnpj, {immediate: false})
Validator.extend('checkCnpj', checkCnpj)
Validator.localize('pt_BR', ptBR)

Vue.use(VeeValidate, {
    locale: 'pt_BR'
})

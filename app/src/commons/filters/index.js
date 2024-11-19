import filtroData from './filtro-data'
import filtroTitleCase from './filtro-title-case'
import filtroCpfCnpj from './filtro-cpf-cnpj'
import filtroDictionary from './filtro-dictionary'

export default {
    install(Vue) {
        Vue.filter('date', filtroData)
        Vue.filter('titleCase', filtroTitleCase)
        Vue.filter('cpfCnpj', filtroCpfCnpj)
        Vue.filter('dictionary', filtroDictionary)
    }
}

export {
    filtroData,
    filtroTitleCase,
    filtroCpfCnpj,
    filtroDictionary
}

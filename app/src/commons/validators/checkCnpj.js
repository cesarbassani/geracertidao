import {isValid} from '@fnando/cnpj'

export default {
    getMessage(field, args) {
        return 'CNPJ é inválido'
    },
    validate(value, args) {
        return isValid(value)
    }
}

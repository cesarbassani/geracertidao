import axios from 'axios'
import store from '@/commons/store/index'
import _ from 'lodash'

export default {
    getMessage(field, args) {
        return 'Este CNPJ já foi inserido anteriormente'
    },
    async validate(value, args) {
        try {
            const userId = args[0]
            const {data} = await axios.get(`/api/companies?cnpj=${value}&userId=${userId}`)
            if (!_.isEmpty(data)) {
                return false
            }
        } catch (err) {
            if (err.response.status == 404) {
                return true
            }
            return false
        }
    }
}

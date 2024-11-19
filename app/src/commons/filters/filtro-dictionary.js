import {dictionary} from '../utils'

const filtroDictionary = function (val) {
    return (val) ? dictionary(val) : ''
}

export default filtroDictionary

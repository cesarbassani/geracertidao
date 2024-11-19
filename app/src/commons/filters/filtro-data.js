import moment from 'moment-timezone'
import {formatosDefault} from '../constants'

const filtroData = function (val, format = undefined) {
    if (!format) {
        format = formatosDefault.DATA
    }
    return (val) ? moment(val).format(format) : ''
}

export default filtroData

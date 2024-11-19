import StringMask from 'string-mask'

const filtroCpfCnpj = function (cpfCnpj) {
    if (!cpfCnpj) {
        return 'Não informado'
    }
    if (cpfCnpj.length < 12) {
        return new StringMask('###.###.###-##').apply(cpfCnpj)
    } else {
        return new StringMask('##.###.###/####-##').apply(cpfCnpj)
    }
}

export default filtroCpfCnpj

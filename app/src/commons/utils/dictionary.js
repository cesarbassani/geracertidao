const DICTIONARY_TERMS = {
    CANOT_CHANGE_USER_FROM_SOCIAL_NETWORK: 'Ops, seu usuário foi criado a partir de uma rede social, não é possível alterar a senha por aqui.',
    CANOT_CREATE_THUMBNAL: 'Ops, infelizmente não conseguimos criar uma imagem minificada. Por favor, informe outra imagem.',
    DUPLICATE_REGISTER: 'Ops, este email já foi inserido antes, por favor, verifique a opção esqueci senha',
    EMAIL_NOT_EXISTS: 'Ops, verificamos que este email não existe em nosso cadastro.',
    FILE_CORRUPTED: 'Ops, não conseguimos recuperar este arquivo',
    FILE_NOT_FOUND: 'Ops, não conseguimos encontrar este arquivo no nosso cadastro',
    WRONG_PASSWORD: 'Ops, sua senha ou email são inválidos, por favor, tente novamente.',
    WAITING_PROCESSING: 'Ops, ainda não conseguimos emitir sua certidão, aguarde o fim do processamento.',
    CURRENT_PLAN_NOT_ALLOWED_MORE_COMPANIES: 'Ops, o seu plano não permite adicionar mais empresas. Por favor, atualize o seu plano.',
    CNPJ_INSCRICAO_SITUACAO_CADASTRAL: '<strong>CNPJ</strong> - Inscrição e de Situação Cadastral',
    CERTIDAO_DEBITOS_RELATIVOS_CREDITOS_TRIBUTARIOS_FEDERAIS_DIVIDA_ATIVA_UNIAO: '<strong>CNDT-DAU</strong> - Certidão de Débitos Relativos a Créditos Tributários<br/>Federais e à Dívida Ativa da União',
    CERTIDAO_NEGATIVA_DEBITOS_TRABALHISTAS: '<strong>CNDT</strong> - Certidão de Negativa de Débitos Trabalhistas',
    CERTIFICADO_REGULARIDADE_FGTS: '<strong>FGTS</strong> - Certificado de Regularidade do FGTS',
    CERTIDAO_NEGATIVA_CONTAS_JULGADAS_IRREGULARES: '<strong>TCU</strong> - Certidão Negativa de Contas Julgadas Irregulares',
    CERTIDAO_NEGATIVA_DEBITO_PREVIDENCIA_SOCIAL: '<strong>CND</strong> Certidão Negativa INSS',
    FREEMIUM: 'Gratuito',
    BASIC: 'Básico',
    MEDIUM: 'Gestão',
    ADVANCED: 'Inteligência',
    USER_UPDATED: 'Seus dados pessoais foram atualizados com sucesso.'
}
const MSG_DEFAULT = 'Ops, ocorreu um erro desconhecido'

export default (errOrTerm) => {
    let term = errOrTerm

    if (!term) {
        return MSG_DEFAULT
    }

    if (errOrTerm.response && errOrTerm.response.data.message) {
        term = errOrTerm.response.data.message
    }

    const translated = DICTIONARY_TERMS[term]
    return translated || MSG_DEFAULT
}



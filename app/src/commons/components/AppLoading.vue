<template>
    <div class="preloader" v-if="show">
        <div class="itens">
            <img class="pulse" width="150" src="img/badge_gera_certidao.svg" alt=""/>
            <br/>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'app-loading',
        props: {
            disabled: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        computed: {
            show() {
                return this.disabled ? false : this.$store.state.loading
            }
        }
    }
</script>

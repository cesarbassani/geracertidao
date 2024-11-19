<template>
  <div class="menu_top menu_fix">
    <a href="/#/" class="btn_left" v-if="!hideIcon">
      <img :src="iconSrc" alt="Fechar" width="24"/>
    </a>
    <span class="title">{{title}}</span>
  </div>
</template>
<script>
    export default {
        name: 'app-internal-title',
        props: {
            title: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                default: 'close'
            },
            hideIcon: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            iconSrc() {
                return `/img/${this.icon}.svg`
            }
        }
    }
</script>

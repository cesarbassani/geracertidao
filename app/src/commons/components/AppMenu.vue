<template>
    <div>
        <div id="menu_principal" class="overlay">
            <div class="subtitulo">
                <div class="container">
                    <div class="row">
                        <div class="col text-center">
                            <span>MENU</span>
                        </div>
                    </div>
                </div>
            </div>
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <div class="overlay-content">
                <a href="#/profile"><i class="fas fa-user"></i> Minha Conta</a>
                <a href="#" @click="logout"><i class="fas fa-sign-out-alt"></i> Sair</a>
            </div>
        </div>

        <div class="menu_top menu_top_transparent">
            <a onclick="openNav()" href="#" class="btn_left">
                <img src="/img/menu.svg" alt="Voltar" width="24"/>
            </a>
            <span class="title" :style="titleStyle">&nbsp;{{title}}</span>
        </div>
    </div>
</template>
<script>
    import {actionTypes} from '@/commons/constants'

    export default {
        name: 'app-menu',
        props: {
            title: {
                type: String,
                default: ''
            },
            color: {
                type: String,
                default: ''
            }
        },
        computed: {
            titleStyle() {
                return {
                    'background-color': this.color
                }
            }
        },
        methods: {
            async logout() {
                await this.$store.dispatch(actionTypes.LOGOUT)
                window.location.href = '/'
            }
        }
    }
</script>

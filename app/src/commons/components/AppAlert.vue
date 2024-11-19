<template>
    <div :class="{'alert': true, 'alert-danger': error, 'alert-success': !error}" role="alert" v-if="show">
        {{message}}
    </div>
</template>
<script>
    const TIMEOUT = 5 * 1000

    export default {
        name: 'app-alert',
        data() {
            return {
                message: '',
                error: false,
                show: false
            }
        },
        methods: {
            showSuccess(message) {
                this.message = message
                this.error = false
                this.show = true
                this.autoHide()
            },
            showError(message) {
                this.message = message
                this.error = true
                this.show = true
                this.autoHide()
            },
            autoHide() {
                setTimeout(() => {
                    this.show = false
                }, TIMEOUT)
            }
        }
    }
</script>

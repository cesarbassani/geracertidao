<template>
  <li>
    <a style="cursor: default">
      <div class="row">
        <div class="col-md-8">
          <span>
            <span class="number">{{document.order}}</span>
            <span v-html="name"></span>
          </span>
          <app-alert ref="alert"></app-alert>
        </div>
        <div class="col-md-4 text-right">
          <span v-if="success" data-toggle="tooltip" data-placement="top" title="Válido até">
            {{document.expiresAt | date}}
            <v-icon name="check"></v-icon>
          </span>
          <span v-if="error" class="error-message">
            Erro: {{document.message}}
            <span class="btn btn-info" @click="$emit('generateDocument', document.name)">
              Regerar <v-icon name="redo-alt" class="regerar"></v-icon>
            </span>
          </span>
          <span v-if="processing" class="gerando">
            Aguarde a emissão desta certidão
            <v-icon name="spinner" pulse></v-icon>
          </span>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
    import Icon from 'vue-awesome/components/Icon'
    import {dictionary} from '@/commons/utils'
    import AppAlert from '@/commons/components/AppAlert'

    export default {
        name: 'detail-documents-item',
        props: ['document'],
        components: {'v-icon': Icon, AppAlert},
        computed: {
            success() {
                return this.document.status === 'success'
            },
            error() {
                return this.document.status === 'error'
            },
            processing() {
                return this.document.status === 'processing'
            },
            name() {
                return this.$options.filters.dictionary(this.document.name)
            }
        },
        methods: {
            downloadLink() {
                if (this.document.done) {
                    window.open(`/api/files/${this.document.filename}/download`, '_blank')
                } else {
                    this.$refs.alert.showError(dictionary('WAITING_PROCESSING'))
                }
            }
        }
    }
</script>

<style scoped>
  .error-message {
    color: darkred;
    font-size: 13px;
  }

  .btn-info {
    background: #00d0a5;
    padding: 5px 10px 9px 10px;
    line-height: 0;
    border: 1px solid #00d0a5;
    border-radius: 4px;
    font-size: 16px;
  }

  .btn .regerar {
    width: 14px;
    padding-top: 4px;
  }
</style>

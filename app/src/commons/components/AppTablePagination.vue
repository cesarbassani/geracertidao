<template>
  <div class="text-center">
    <nav>
      <ul class="pagination justify-content-center">
        <li :class="priorBtnClass">
          <a class="page-link" @click.prevent="paginate(currentPage - 1)">Anterior</a>
        </li>
        <li :class="getPageNumberClass(index)" v-for="index in totalPages" :key="index">
          <a class="page-link" @click.prevent="paginate(index)">{{index}}</a>
        </li>
        <li :class="nextBtnClass">
          <a class="page-link" @click.prevent="paginate(currentPage + 1)">Próximo</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
    export default {
        name: 'app-table-pagination',
        props: {
            currentPage: {
                type: Number,
                required: true
            },
            totalPages: {
                type: Number,
                required: true
            }
        },
        computed: {
            priorBtnClass() {
                return {
                    'page-item': true,
                    'disabled': this.currentPage === 1
                }
            },
            nextBtnClass() {
                return {
                    'page-item': true,
                    'disabled': this.currentPage === this.totalPages
                }
            }
        },
        methods: {
            getPageNumberClass(page) {
                return {
                    'page-item': true,
                    'active': this.currentPage === page
                }
            },
            paginate(page) {
                this.$emit('paginate', page)
            }
        }
    }
</script>

<style>
  .page-item.active .page-link {
    background-color: #19396A;
    border-color: #19396A;
  }
</style>
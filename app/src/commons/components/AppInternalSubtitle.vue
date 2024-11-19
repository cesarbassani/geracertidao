<template>
  <div class="subtitulo">
    <div class="container">
      <div class="row">
        <div class="col text-center">
          <span>{{subtitle}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'app-internal-subtitle',
        props: {
            subtitle: {
                required: true
            }
        }
    }
</script>
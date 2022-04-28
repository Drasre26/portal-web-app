<template>
  <div class="about">
     <br/>
    <Banner></Banner>
    <br/>
    <Inscripcion></Inscripcion>
    <h1>This is an about page</h1>
  </div>
</template>

<script>
  import Banner from '../components/shared/Banner.vue'
  import Inscripcion from '../components/Inscripcion.vue'

  export default {
    name: 'Home',

    components: {
      Banner,Inscripcion
    },
  }
</script>
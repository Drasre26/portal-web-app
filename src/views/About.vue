<template>
  <div class="about">
     <br/>
    <Banner class="animate__animated animate__backInLeft"></Banner>
    <br/>
    <Registrarme></Registrarme>
    <h1>This is an about page</h1>
  </div>
</template>

<script>
  import Banner from '../components/shared/Banner.vue'
  //import Inscripcion from '../components/Inscripcion.vue'
  import Registrarme from '../components/Inscripcion/Registrarme.vue'

  export default {
    name: 'Home',

    components: {
      Banner,Registrarme
    },
  }
</script>
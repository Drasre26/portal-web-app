import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as dayjs from 'dayjs'
import CKEditor from '@ckeditor/ckeditor5-vue2';
import 'dayjs/locale/es'
dayjs.locale('es')

Vue.use( CKEditor );
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

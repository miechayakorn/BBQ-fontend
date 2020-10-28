import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import ToggleButton from 'vue-js-toggle-button'
import 'sweetalert2/dist/sweetalert2.min.css';
import DataTable from 'v-data-table'
import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';
import i18n from './i18n'

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(DataTable)
Vue.use(ToggleButton)
Vue.use(VCalendar)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

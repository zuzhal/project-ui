import { createApp } from 'vue'
import App  from './App.vue'
import router from './router'
import './index.css'
import 'vue-progress-path/dist/vue-progress-path.css'
// import VueProgress from 'vue-progress-path'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt, faUser, faAt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BaseCard from "./components/ui/BaseCard.vue";


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import store from './store/index'

import axios from 'axios'
import VueAxios from 'vue-axios'


library.add(faSignOutAlt, faUser, faAt)

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(store)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('base-card', BaseCard);

app.use(VueAxios, axios)

app.mount('#app')


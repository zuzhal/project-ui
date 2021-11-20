import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import 'vue-progress-path/dist/vue-progress-path.css'
import VueProgress from 'vue-progress-path'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt, faUser, faAt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import store from './store/index.js'

import axios from 'axios'
import VueAxios from 'vue-axios'


library.add(faSignOutAlt, faUser, faAt)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(VueProgress, {
    // defaultShape: 'circle',
})
app.use(ElementPlus)
app.use(store)

app.use(VueAxios, axios)

app.mount('#app')


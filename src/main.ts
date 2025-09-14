import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Buefy from 'buefy'

import './styles/App.scss'
import 'buefy/dist/css/buefy.css'
import { Quill } from '@vueup/vue-quill'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Buefy)
//app.use(Quill)
app.mount('#app')

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Buefy from 'buefy'

import './styles/App.scss'
import 'buefy/dist/css/buefy.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Editor from 'primevue/editor'

library.add(faSearch, faAdd);
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia())
app.use(router)
app.use(Buefy, {
    defaultIconComponent: 'font-awesome-icon',
    defaultIconPack: 'fas',
})
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.component('Editor', Editor)
app.mount('#app')

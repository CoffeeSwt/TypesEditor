import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import './assets/main.css'

import { router } from "@renderer/router";
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')

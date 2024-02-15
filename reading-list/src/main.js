import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { auth } from '@/firebase/config'


let app = null

auth.onAuthStateChanged(() => {
    if (app === null) {
        app = createApp(App).use(router).mount('#app')
    }
})

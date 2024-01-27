import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

// import { projectAuth } from '@/firebase/config'
// import { ref } from 'vue'

// let app
// const user = ref(projectAuth.currentUser)

// projectAuth.onAuthStateChanged(() => {
//     if (!app) {
//         app = createApp(App).use(router).mount('#app')
//     }
// })

createApp(App).use(router).mount('#app')
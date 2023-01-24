import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
window.Kakao.init("c52a4b92c9a951d6828e47e7f3a34c99")
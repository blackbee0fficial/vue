import Vue from 'vue'
import App from './App.vue'

// Filter
import '@/filters/mask.js'

// Style
import '@/assets/scss/style.scss'

new Vue({ render: h => h(App) }).$mount('#app')

document.addEventListener('mousedown', () => {
   let select = document.querySelectorAll('.select.active')
   for (let item of select) item.classList.remove('active')
})

Vue.config.devtools = true

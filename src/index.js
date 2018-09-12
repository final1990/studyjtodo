import Vue from 'vue'
import App from './app.vue'
import '../asserts/styles/app.css'
import '../asserts/images/coffee.svg'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(App)
}).$mount(root)
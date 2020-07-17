import Vue, { VNode } from 'vue'
import Dev from './serve.vue'

Vue.config.productionTip = false

new Vue({
  render: (h: (arg0: any) => any): VNode => h(Dev),
}).$mount('#app')

import Vue from 'vue';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

// eslint-disable-next-line vue/require-name-property
new Vue({
	router,
	...App
}).$mount('#app');

import Vue from 'vue';
import VueRouter from 'vue-router';

import App from '@/App';
Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history', //this needs server configuration to redirect every url to "/index.html" file
	base: process.env.BASE_URL,
	routes: [
		{
			path: '',
			name: 'App',
			component: App
		},
	]
});

export default router;

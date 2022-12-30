import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';

export default defineConfig(() => {
	return {
		plugins: [
			vue(),
		],

		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
				'~@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
	};
});

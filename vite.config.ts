import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		host: true,
		port: 4173,
		// proxy: {
		// 	'/api': 'http://localhost:4173',
		// }
	}
})

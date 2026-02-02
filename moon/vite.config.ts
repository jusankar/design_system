/// <reference types="vitest/config" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'
import { peerDependencies } from './package.json'

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		tsconfigPaths(),
		dts({
			tsconfigPath: './tsconfig.json',
			rollupTypes: false,
			insertTypesEntry: true,
			outDir: 'dist',
			staticImport: true,
		}),
	],
	build: {
		lib: {
			entry: {
				index: './index.ts',
				icons: './src/icons.ts',
			},
			formats: ['es'],
		},
		rollupOptions: {
			external: [...Object.keys(peerDependencies), 'react/jsx-runtime'],
			output: {
				entryFileNames: '[name].js',
			},
		},
		minify: false,
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './src/tests/vitest.setup.ts',
	},
})

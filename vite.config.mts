import { svelte } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';
import path from 'node:path';

const config = {
	root: 'src/',
	base: '/systems/nimble/',
	publicDir: path.resolve(__dirname, 'public'),
	server: {
		port: 30001,
		open: true,
		proxy: {
			'^(/systems/nimble/(assets|style.css))': 'http://localhost:30000',
			'^(?!/systems/nimble)': 'http://localhost:30000',
			'/socket.io': {
				target: 'ws://localhost:30000',
				ws: true,
			},
		},
	},
	build: {
		outDir: path.resolve(__dirname, 'dist'),
		emptyOutDir: true,
		sourcemap: true,
		brotliSize: true,
		lib: {
			name: 'Nimble 2',
			entry: path.resolve(__dirname, 'src/nimble.ts'),
			formats: ['es'],
			fileName: 'nimble',
		},
	},
	esbuild: {
		keepNames: true,
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({
				typescript: {
					tsconfigFile: './tsconfig.json',
				},
			}),
			onwarn: (warning, handler) => {
				// Suppress `a11y-missing-attribute` for missing href in <a> links.
				// Foundry doesn't follow accessibility rules.
				if (warning.message.includes('<a> element should have an href attribute')) return;
				if (warning.code === 'a11y-click-events-have-key-events') return;

				// eslint-disable-next-line no-console
				console.log(warning);

				// Let Rollup handle all other warnings normally.
				handler?.(warning);
			},
		}),
	],
};

export default config;

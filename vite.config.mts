import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { esbuildPluginVersionInjector } from 'esbuild-plugin-version-injector';
import path from 'node:path';
import vike from 'vike/plugin';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
		build: {
			manifest: true,
			target: 'esnext',
			sourcemap: false,
			minify: 'esbuild',
			cssCodeSplit: true,
			chunkSizeWarningLimit: 2000,
		},
		server: { hmr: { clientPort: 3030, port: 3030 }, host: true },
		optimizeDeps: {
			exclude: ['node-stdlib-browser'],
		},
		ssr: {
			noExternal: ['buffer'],
		},
		assetsInclude: ['**/*.md', '**/*.mdx'],
		plugins: [
			vike(),
			react(),
			svgr(),
			tailwindcss(),
			viteImagemin({
				gifsicle: { optimizationLevel: 3 },
				mozjpeg: { quality: 75 },
				pngquant: { quality: [0.7, 0.9] },
				webp: { quality: 75 },
			}),
			compression({ algorithm: 'brotliCompress', ext: '.br' }),
			esbuildPluginVersionInjector(),
		],
		css: {
			modules: {
				generateScopedName: '[hash:base64:48]',
			},
		},
		resolve: {
			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
	});

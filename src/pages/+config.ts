import vikeCloudflare from 'vike-cloudflare/config';
import vikeReact from 'vike-react/config';
import type { Config } from 'vike/types';
import favicon from '../assets/favicon.ico';

// Default config (can be overridden by pages)
// https://vike.dev/config
export default {
	prerender: true,
	favicon,

	// https://vike.dev/head-tags
	title: 'Website',
	description: 'My first website!',

	server: 'workers/index.ts',

	extends: [vikeReact, vikeCloudflare],
} as Config;

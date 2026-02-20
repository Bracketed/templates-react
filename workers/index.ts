import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { apply } from 'vike-cloudflare/hono';
import { serve } from 'vike-cloudflare/hono/serve';

export default (() => {
	const app = new Hono<Env>();

	app.use(trimTrailingSlash())
	app.use(logger());

	apply(app);
	return serve(app, {
		port: 3000,
	});
})();

/// <reference types="node" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.css' {
	const classes: { readonly [key: string]: string };
	export default classes;
}

declare module '*.scss' {
	const classes: { readonly [key: string]: string };
	export default classes;
}

declare module '*.svg' {
	import React from 'react';
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}

declare module '*.sass' {
	const classes: { readonly [key: string]: string };
	export default classes;
}

declare module 'vike/client/router' {
	type Options = /*ModifyUrlSameOriginOptions &*/ {
		// url?: string // or name it `href?: string` instead?
		keepScrollPosition?: boolean;
		overwriteLastHistoryEntry?: boolean;
		pageContext?: Record<string, unknown>;
	};

	/** Programmatically navigate to a new page.
	 *
	 * https://vike.dev/navigate
	 *
	 * @param url - The URL of the new page.
	 * @param keepScrollPosition - Don't scroll to the top of the page, instead keep the current scroll position.
	 * @param overwriteLastHistoryEntry - Don't create a new entry in the browser's history, instead let the new URL replace the current URL. (This effectively removes the current URL from the browser history).
	 */
	const navigate: (url: string, options?: Options) => Promise<void>;

	export { navigate };
}

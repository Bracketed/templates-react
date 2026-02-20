import React from 'react';

export const Link = React.forwardRef<
	HTMLAnchorElement,
	React.AnchorHTMLAttributes<HTMLAnchorElement> & {
		to: string;
		replace?: boolean;
		reloadDocument?: boolean;
		state?: unknown; // not supported in Vike (placeholder for API compat)
	}
>(function LinkWithRef({ to, replace, reloadDocument, state, onClick, ...rest }, ref) {
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (onClick) onClick(e);

		if (
			e.defaultPrevented || // user prevented
			reloadDocument || // force full reload
			e.metaKey ||
			e.altKey ||
			e.ctrlKey ||
			e.shiftKey || // new tab / special click
			e.button !== 0 // not left click
		)
			return;

		e.preventDefault();

		// Vike navigation — just set window.location (client router intercepts)
		if (replace) {
			globalThis.history.replaceState(state ?? {}, '', to);
			globalThis.dispatchEvent(new PopStateEvent('popstate'));
		} else {
			globalThis.history.pushState(state ?? {}, '', to);
			globalThis.dispatchEvent(new PopStateEvent('popstate'));
		}
	};

	return <a href={to} ref={ref} onClick={handleClick} {...rest} />;
});

Link.displayName = 'Link';

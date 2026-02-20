import { useEffect } from 'react';

interface Options {
	addBodyClass?: boolean;
	display?: string | null;
}

const defaultOptions: Options = {
	addBodyClass: false,
	display: 'swap',
};

/**
 * useGoogleFonts hook
 *
 * A React hook for loading Google Fonts using the modern Font Loading API
 *
 * Example:
 * ```
 * import useGoogleFonts from 'use-google-fonts'
 *
 * useGoogleFonts([
 *   ['Roboto', '300,500'],
 *   ['Open Sans']
 * ])
 * ```
 *
 * @param fonts Array of Google fonts and weights
 * @param options Options
 * @returns void
 */
const useGoogleFonts = (fonts: Array<[string, string?]>, options: Options = defaultOptions): void => {
	useEffect(() => {
		const fontsWithSizes = fonts.map(([name, weights]) => {
			const font = name.replace(/\s+/g, '+');
			return weights ? `${font}:${weights}` : font;
		});

		const fontsUri = fontsWithSizes.join('|');
		const swap = `&display=${options.display || 'swap'}`;

		// Load Google Fonts stylesheet
		const link = document.createElement('link');
		link.href = `https://fonts.googleapis.com/css?family=${fontsUri}${swap}`;
		link.rel = 'stylesheet';
		document.head.appendChild(link);

		// When fonts are loaded, optionally add body classes
		fonts.forEach(([fontName]) => {
			const fontClass = fontName.replace(/\s+/g, '-').toLowerCase();

			// Load font via modern API
			document.fonts.load(`1em "${fontName}"`).then(() => {
				if (options.addBodyClass) document.documentElement.classList.add(fontClass);
			});
		});

		return () => {
			// Clean up stylesheet link on unmount
			document.head.removeChild(link);
		};
	}, [fonts, options.addBodyClass, options.display]);
};

export { useGoogleFonts };

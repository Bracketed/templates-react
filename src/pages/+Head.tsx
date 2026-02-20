// Environment: server

export function Head() {
	return (
		<>
			<link rel='canonical' href='https://example.com' />

			{/* More Open Graph tags */}
			<meta property='og:type' content='website' />
			<meta property='og:site_name' content='Website' />
			<meta property='og:locale' content='en_US' />
			<meta
				property='og:image'
				content='https://raw.githubusercontent.com/Bracketed/Assets/refs/heads/main/Banners/LogoBanner.png'
			/>

			{/* Twitter Head Meta */}
			<meta
				name='twitter:image'
				content='https://raw.githubusercontent.com/Bracketed/Assets/refs/heads/main/Banners/LogoBanner.png'
			/>
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:site' content='@TeamBracketed' />
			<meta name='twitter:title' content='Hi!' />
			<meta name='twitter:alt' content='Hello!' />
		</>
	);
}

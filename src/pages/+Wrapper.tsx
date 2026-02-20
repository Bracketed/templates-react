import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { queryClient, setupQueryPersistence } from '@/lib/query';
import { useGoogleFonts } from '@/lib/use-google-fonts';

import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import '@/index.css';

export default function Wrapper({ children }: { children: React.ReactNode }) {
	const [ready, setReady] = useState<boolean>(false);

	useGoogleFonts(
		[
			['Albert Sans', '100,200,300,400,500,600,700,800,900'],
			['Urbanist', '100,200,300,400,500,600,700,800,900'],
			['Source Code Pro', '100,200,300,400,500,600,700,800,900'],
		],
		{
			addBodyClass: true,
			display: 'swap',
		}
	);

	useEffect(() => {
		const unsubscribe = setupQueryPersistence();
		setReady(true);

		return () => unsubscribe?.();
	}, []);

	if (!ready) return null; // or a splash/loading screen

	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<Toaster />
				{children}
			</TooltipProvider>
		</QueryClientProvider>
	);
}

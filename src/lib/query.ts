import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 minutes
			gcTime: 10 * 60 * 1000, // 10 minutes
			retry: 2,
			refetchOnWindowFocus: false,
			networkMode: 'offlineFirst', // Use cache when offline
		},
	},
});

export function setupQueryPersistence() {
	if (typeof window === 'undefined') return;

	const [unsubscribe] = persistQueryClient({
		queryClient,
		persister: createAsyncStoragePersister({
			storage: window.localStorage,
		}),
		maxAge: 15 * 60 * 1000, // must match (or exceed) staleTime
	});

	return unsubscribe;
}

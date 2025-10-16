import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ApiProvider } from "./provider/ApiProvider.tsx";

const RSSA_API_DEV = import.meta.env.VITE_RSSA_API_DEV!;
const RSSA_API = import.meta.env.VITE_RSSA_API!;
const api_url_base = process.env.NODE_ENV === "development" ? RSSA_API_DEV : RSSA_API;
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			gcTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	},
});
const localStoragePersister = createAsyncStoragePersister({
	storage: {
		getItem: (key) => Promise.resolve(localStorage.getItem(key)),
		setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
		removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
	},
});
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<PersistQueryClientProvider client={queryClient} persistOptions={{ persister: localStoragePersister }}>
			<ApiProvider base_path={api_url_base}>
				<App />
			</ApiProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</PersistQueryClientProvider>
	</StrictMode>
);

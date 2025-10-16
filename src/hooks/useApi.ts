import { createContext, useContext } from "react";

interface ApiContextType {
	basePath: string;
}

export const ApiContext = createContext<ApiContextType | undefined>(undefined);
export const useApi = () => {
	const context = useContext(ApiContext);
	if (context === undefined) {
		throw new Error("useApi must be used within a ApiProvider");
	}
	return context;
};

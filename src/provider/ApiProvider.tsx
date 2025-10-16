import { useState, type ReactNode } from "react";
import { ApiContext } from "../hooks/useApi";

export const ApiProvider = ({ base_path, children }: { base_path: string; children: ReactNode }) => {
	const [basePath, setBasePath] = useState<string>(base_path);
	const value = { basePath };

	if (base_path === "") {
		setBasePath("http://localhost");
	}

	return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

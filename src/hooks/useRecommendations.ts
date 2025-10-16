import { useQuery } from "@tanstack/react-query";
import type { MovieDetails, RatedItem } from "../types/movie.types";
import { ApiContext } from "./useApi";
import { useContext } from "react";

/**
 * Fetches movie recommendations from the API based on a list of rated movies.
 * @param ratedMovies - A Map of movies the user has rated.
 * @param contextTag - The specific context for the recommendation (e.g., 'topN', 'controversial').
 * @returns A promise that resolves to an array of recommended movies.
 */
const fetchRecommendations = async (
	basePath: string,
	ratedMovies: Map<string, RatedItem>,
	contextTag: string
): Promise<MovieDetails[]> => {
	const payload = {
		context_tag: contextTag,
		ratings: Array.from(ratedMovies.values()).map((item) => ({
			item_id: item.item_id,
			rating: item.rating,
		})),
	};

	const response = await fetch(`${basePath}recommendations/altrecs`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch recommendations for context: ${contextTag}`);
	}

	return response.json();
};

/**
 * A custom hook to get movie recommendations.
 * Encapsulates the TanStack Query logic for fetching and caching.
 * @param ratedMovies - A Map of movies the user has rated.
 * @param contextTag - The recommendation context.
 * @param minRatingCount - The minimum number of ratings required to enable the query.
 * @param isEnabled - An additional flag to control if the query should be enabled.
 */
export const useRecommendations = (
	ratedMovies: Map<string, RatedItem>,
	contextTag: string,
	minRatingCount: number,
	isEnabled: boolean = true
) => {
	const api = useContext(ApiContext);
	if (api === undefined) {
		throw new Error("useApi must be used within a ApiProvider");
	}
	const ratedItemsKey = Array.from(ratedMovies.values())
		.map((item) => ({ id: item.item_id, rating: item.rating }))
		.sort((a, b) => a.id.localeCompare(b.id));

	return useQuery<MovieDetails[]>({
		queryKey: ["recommendations", contextTag, ratedItemsKey],
		queryFn: () => fetchRecommendations(api?.basePath, ratedMovies, contextTag),
		enabled: isEnabled && ratedMovies.size >= minRatingCount,
	});
};

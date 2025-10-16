import { useMemo, useState } from "react";
import { CustomSelect, type SelectOption } from "../components/CustomSelect";
import MovieCard from "../components/MovieCard";
import PaginatedResourceViewer from "../components/PaginatedResourceViewer";
import { useRecommendations } from "../hooks/useRecommendations";
import type { MovieDetails, RatedItem } from "../types/movie.types";

const rssaOptions: SelectOption[] = [
	{ value: "-1", label: "Please choose a recommendation type" },
	{ value: "controversial", label: "...we think are controversial." },
	{ value: "hate", label: "...we think you will hate." },
	{ value: "hip", label: "...we think you will be the first to try." },
	{ value: "noclue", label: "...we have no idea about." },
];

const RecommendationCarousel = ({
	title,
	movies,
	isLoading,
	error,
}: {
	title: string;
	movies: MovieDetails[] | undefined;
	isLoading: boolean;
	error: Error | null;
}) => {
	return (
		<div className="bg-gray-700/50 rounded-lg">
			<h3 className="p-3 font-bold text-xl text-white">{title}</h3>
			<div className="flex w-full overflow-x-auto gap-2 p-2 rounded-b-lg min-h-[150px] items-center">
				{isLoading && <p className="text-gray-400 px-2">Loading recommendations...</p>}
				{error && <p className="text-red-400 px-2">Could not load recommendations. Please try again later.</p>}
				{!isLoading && !error && (!movies || movies.length === 0) && (
					<p className="text-gray-400 px-2">No recommendations available.</p>
				)}
				{!error &&
					movies?.map((movie) => (
						<div className="flex-shrink-0" key={movie.id}>
							<MovieCard
								movie={movie}
								userRating={undefined}
								hideRating={true}
								ratingCallback={() => {}}
								height={45}
								disableHover={true}
							/>
						</div>
					))}
			</div>
		</div>
	);
};

const Rssa = () => {
	const itemsPerPage = 12;
	const minRatingCount = 10;

	const [rssaCondition, setRssaCondition] = useState<string>("-1");
	const [ratedMovies, setRatedMovies] = useState<Map<string, RatedItem>>(new Map());

	const ratedMoviesArray = useMemo(() => Array.from(ratedMovies.values()), [ratedMovies]);
	const {
		data: topNRec,
		isLoading: topNRecLoading,
		error: topNRecError,
	} = useRecommendations(ratedMovies, "topN", minRatingCount);
	const {
		data: altRec,
		isLoading: altRecLoading,
		error: altRecError,
	} = useRecommendations(ratedMovies, rssaCondition, minRatingCount, rssaCondition !== "-1");

	const handleRating = (ratedItem: RatedItem) => {
		setRatedMovies((prevRatedMovies) => {
			const newRatedMovies = new Map(prevRatedMovies);
			newRatedMovies.set(ratedItem.item_id, ratedItem);
			return newRatedMovies;
		});
	};

	return (
		<div className="p-4 lg:p-6 bg-gray-900 min-h-screen text-gray-200 rounded-lg">
			<h1 className="font-bold text-3xl text-white">Recommender System</h1>
			<p className="text-gray-400 mt-1">
				Rate at least {minRatingCount} movies from the gallery to see recommendations.
			</p>

			<div className="flex flex-col lg:flex-row gap-6 mt-6">
				<div className="lg:w-2/5">
					<div className="bg-gray-800 rounded-lg p-3">
						<h3 className="text-white font-bold text-xl mb-3">Gallery</h3>
						<PaginatedResourceViewer<MovieDetails> apiResourceTag="movies" limit={itemsPerPage}>
							{(movies) => (
								<div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
									{movies.map((movie) => (
										<MovieCard
											key={movie.id}
											movie={movie}
											userRating={ratedMovies.get(movie.id)}
											ratingCallback={handleRating}
										/>
									))}
								</div>
							)}
						</PaginatedResourceViewer>
					</div>
				</div>

				<div className="lg:w-3/5 space-y-6">
					<div className="bg-gray-800 rounded-lg">
						<h3 className="p-3 text-white font-bold text-xl">
							Movies You've Rated ({ratedMoviesArray.length})
						</h3>
						<div className="flex w-full overflow-x-auto gap-2 p-2 rounded-b-lg min-h-[120px] items-center">
							{ratedMoviesArray.length > 0 ? (
								ratedMoviesArray.map((ratedItem) => (
									<div className="flex-shrink-0" key={ratedItem.item_id}>
										<MovieCard
											movie={ratedItem.movie!}
											userRating={ratedItem}
											ratingCallback={() => {}}
											height={36}
											disableHover={true}
										/>
									</div>
								))
							) : (
								<p className="px-2 text-gray-400">Your rated movies will appear here.</p>
							)}
						</div>
					</div>

					<RecommendationCarousel
						title="Top Movies We Think You'll Like"
						movies={topNRec}
						isLoading={topNRecLoading}
						error={topNRecError}
					/>

					<div className="bg-gray-800 rounded-lg p-3 space-y-3">
						<div>
							<h3 className="font-bold text-xl text-white">Discover something new...</h3>
							<p className="text-sm text-gray-400">Find movies that are...</p>
						</div>
						<CustomSelect
							options={rssaOptions}
							value={rssaCondition}
							onChange={setRssaCondition}
							disabled={altRecLoading || ratedMovies.size < minRatingCount}
						/>
						<RecommendationCarousel
							title="Results"
							movies={altRec}
							isLoading={altRecLoading}
							error={altRecError}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Rssa;

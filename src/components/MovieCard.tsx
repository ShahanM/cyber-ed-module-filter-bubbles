import clsx from "clsx";
import { useEffect, useState } from "react";
import type { MovieDetails, RatedItem } from "../types/movie.types";
import StarRating from "./StarRating";

const MovieCard = ({
	movie,
	userRating,
	ratingCallback,
	height,
	disableHover = false,
	hideRating = false,
}: {
	movie: MovieDetails;
	userRating: RatedItem | undefined;
	ratingCallback: (ratedItem: RatedItem) => void;
	height?: number;
	disableHover?: boolean;
	hideRating?: boolean;
}) => {
	const initialRating = userRating;
	const [movieRating, setMovieRating] = useState<number>(0);
	const [isLoaded, setIsLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);
	useEffect(() => {
		if (initialRating) {
			setMovieRating(initialRating.rating);
		}
	}, [initialRating]);

	const handleRating = (newRating: number) => {
		const newRatedItem = {
			item_id: movie.id,
			rating: newRating,
			movie: movie,
		};
		ratingCallback(newRatedItem);
	};

	return (
		<div
			className={clsx(
				"bg-red-200",
				"rounded-lg overflow-hidden shadow-lg cursor-pointer",
				!disableHover && "transform transition-transform duration-300 hover:scale-115",
				"flex flex-col hover:z-10"
			)}
		>
			<div
				className={clsx(
					"relative flex items-center justify-center bg-black",
					!height && "lg:h-54 lg:w-36 xxl:h-81 xxl:w-45"
				)}
				style={height ? { height: `${height / 4}rem`, width: `${height / 4}rem` } : undefined}
			>
				{imageError ? (
					<div className="flex h-full items-center justify-center bg-gray-800 p-2 text-center text-white">
						Could not load image
					</div>
				) : (
					<img
						className={clsx(
							"h-full w-full object-contain transition-opacity duration-300",
							isLoaded ? "opacity-100" : "opacity-0"
						)}
						src={movie.poster}
						alt={`Poster for ${movie.title}`}
						onLoad={() => setIsLoaded(true)}
						onError={() => setImageError(true)}
					/>
				)}
				<div className={clsx("absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent")}>
					<div className="absolute bottom-0 w-full pt-4 px-1 flex flex-col items center text-center">
						<p className="text-white text-md font-medium mb-0 leading-tight">{movie.title}</p>
						<p className="text-gray-300 text-md mx-auto">{movie.year}</p>
					</div>
				</div>
			</div>
			{!hideRating && (
				<div className="bg-gray-700 py-1">
					<StarRating initialRating={movieRating} onRatingChange={handleRating} maxStars={5} />
				</div>
			)}
		</div>
	);
};

export default MovieCard;

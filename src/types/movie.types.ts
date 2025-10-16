export interface RatedItem {
	id?: string;
	item_id: string;
	rating: number;
	version?: number;
	movie?: MovieDetails;
}
export interface MovieEmotions {
	id: string;
	movie_id: string;
	movielens_id: string;

	anger: number;
	anticipation: number;
	disgust: number;
	fear: number;
	joy: number;
	surprise: number;
	sadness: number;
	trust: number;
}

export interface MovieRecommendationText {
	movie_id: string;
	formal: string;
	informal: string;
	source: string | null;
	model: string | null;
	created_at: string;
	updated_at: string;
}

export interface Movie {
	id: string;
	imdb_id: string | null;
	tmdb_id: string | null;
	movielens_id: string;

	title: string;
	year: number;
	ave_rating: number;

	imdb_avg_rating: number | null;
	imdb_rate_count: number | null;

	tmdb_avg_rating: number | null;
	tmdb_rate_count: number | null;

	genre: string;
	director: string | null;
	cast: string;
	description: string;
	poster: string;
	tmdb_poster: string;
	poster_identifier: string;
}

export interface EmotionMovies extends Movie, MovieEmotions {}
export interface MovieRecommdantions extends Movie, MovieRecommendationText {}
export interface MovieDetails extends Movie {
	emotions: MovieEmotions | null;
	recommendations_text: MovieRecommendationText | null;
}

import axios from "axios"
import type Movie from "../types/movie";

 interface MovieResponse  { 
  results: Movie[];
}

export default async function fetchMovies(searchQuery: string): Promise<Movie[]> {
    const response = await axios.get<MovieResponse>("https://api.themoviedb.org/3/search/movie", {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
        params: {
            query: searchQuery,
        }
    })
    return response.data.results;
}
   
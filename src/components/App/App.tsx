import { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid';
import type Movie from '../../types/movie'
import toast from 'react-hot-toast';
import fetchMovies from '../../services/movieService';
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast("No movies found for your request", { duration: 2000 })
      }
      setMovies(data);
    } catch {
      setIsError(true);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
    
}
  
    return (
      <>
        <SearchBar onSubmit={handleSearch} />
         {isLoading && <Loader />}
      {!isLoading && isError && <ErrorMessage />}
        {!isLoading && !isError && (
         <MovieGrid
          movies={movies}
          onSelect={(movie) => setSelectedMovie(movie)}
        />
        )}
        {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      </>
    )
  }
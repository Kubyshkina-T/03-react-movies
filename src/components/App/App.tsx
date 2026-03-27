import { Toaster } from 'react-hot-toast'
import SearchBar from '../SearchBar/SearchBar'
import './App.module.css'

export default function App() { 
  const handleSearch = (query: string) => {
  }
  // const[articles, setArticles] = useState([])
  const fetchMovies = (searchQuery: string) => {
    console.log(searchQuery);
  } 
  return (
    <>
      <SearchBar onSubmit={fetchMovies} />
      
    </>
  )
}
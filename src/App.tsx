
import './App.css'
import { Button } from './components/ui/button'
import MovieTable from './components/Movie_table'
import { useState, } from 'react'
import { moviesData } from './data/movie_data'
import type { Movie } from './types/Movie_types'
import MovieForm from './components/Movie_form'
import SearchBar from './components/Movie_search'




function App() {
  const [movieList, setMovieList] = useState<Movie[]>(moviesData)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const [showForm, setShowForm] = useState(false);


// delete function for movies
const deleteMovie = (id:number) => {
  const confirmed = window.confirm('Are you sure, you want to delete this movie?');
  if (!confirmed) return;

  setMovieList((prev) =>
    prev.filter((movie) => movie.id !== id)
  );
};
// edit function for movies
const editMovie = (id: number) => {
  const movieToEdit = movieList.find((movie) => movie.id === id)
  if (!movieToEdit) return 
  const confirmed = window.confirm('Do you want to edit this movie?')
  if (!confirmed) return
  setEditingMovie(movieToEdit)
  setShowForm(true)
}
// submit function for movies
const onSubmit = (data: any, editingId: number | null) => {
  if (editingId !== null) {
    setMovieList((prev) =>
      prev.map((movie) =>
        movie.id === editingId
          ? { ...movie, ...data, year: Number(data.year) }
          : movie
      )
    )
  } else {
    setMovieList((prev) => [
      ...prev,
      { id: Date.now(), ...data, year: Number(data.year) }
    ])
  }
  setEditingMovie(null)
}
// filter movies based on search term
const filteredMovies = movieList.filter((movie) =>
  movie.title.toLowerCase().includes(searchTerm.toLowerCase())
);
//main div
  return (    
  <div className='body'> 
    <h1 className='text-5xl font-bold mb-4 text-white py-4'>Welcome to Movie Stream</h1>
    <p className='text-lg mb-8 text-white'>Stream your favorite movies anytime, anywhere.</p>
    <Button variant="default" size="lg" onClick={() =>  { setEditingMovie(null); setShowForm(true) }}>+ ADD New Movie</Button>
    <MovieForm showForm={showForm} setShowForm={setShowForm} onSave={onSubmit} editingMovie={editingMovie}/>
    <SearchBar onSearch={(term) => setSearchTerm(term)} />
    <MovieTable movies={filteredMovies} onEdit={editMovie} onDelete={deleteMovie}/>
  </div>
  )
}
export default App





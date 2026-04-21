
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from './components/ui/table'

import { useEffect, useState, } from 'react'
import { moviesData } from './data/movie_data'






function App() {
  const [movieList, setMovieList] = useState<any[]>(moviesData)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null);
  const[title, setTitle] = useState('')
  const[year, setYear] = useState('')
  const[genre, setGenre] = useState('')
  const[posterURL, setPosterURL] = useState('')
  const [showForm, setShowForm] = useState(false);


//add, delete, edit functions for movies


const deleteMovie = (id:number) => {
  const confirmed = window.confirm('Are you sure, you want to delete this movie?');
  if (!confirmed) return;

  setMovieList((prev) =>
    prev.filter((movie) => movie.id !== id)
  );
};



const clearMovie = () => {
  const confirmed = window.confirm('Do You want to clear the form?');
  if (confirmed) {

    setTitle('');
    setYear('');
    setGenre('');
    setPosterURL('');
    setEditingId(null);
  }
  resetForm();
}

const editMovie = (id: number) => {
  const movieToEdit = movieList.find((movie) => movie.id === id);
  const confirmed = window.confirm('Do you want to edit this movie?');
  if (!confirmed) return;

  setTitle(movieToEdit.title);
  setYear(movieToEdit.year.toString());
  setGenre(movieToEdit.genre);
  setPosterURL(movieToEdit.posterURL);
  setEditingId(id);

  setShowForm(true);
};



const saveMovie = () => {
  if (!title || !year || !genre || !posterURL) return;

  if (editingId !== null) {
    setMovieList((prev) =>
      prev.map((movie) =>
        movie.id === editingId
          ? {
              ...movie,
              title,
              year: Number(year),
              genre,
              posterURL: posterURL,
            }
          : movie
      )
    );

    setEditingId(null);
  } else {
    setMovieList((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        year: Number(year),
        genre,
        posterURL: posterURL,
      },
    ]);
  }

  resetForm();
};

const resetForm = () => {
  setTitle("");
  setYear("");
  setGenre("");
  setPosterURL("");
  setEditingId(null);
  setShowForm(false);
};


const filteredMovies = movieList.filter((movie) =>
  movie.title.toLowerCase().includes(searchTerm.toLowerCase())
);

//

  return (
    
  <div className='body'>
  
    <h1 className='text-5xl font-bold mb-4 text-white py-4'>Welcome to Movie Stream</h1>
    <p className='text-lg mb-8 text-white'>Stream your favorite movies anytime, anywhere.</p>
    <Button variant="default" size="lg" onClick={() => setShowForm((prev) => !prev)}> + ADD New Movie</Button>
    {showForm && (
      <div className='flex flex-row justify-center gap-4 mt-4'>
        <Input type="text" placeholder='Title of the movie' className='p-2 rounded-md mb-2' onChange={(e)=>setTitle(e.target.value)} value={title} />
        <Input type="text" placeholder='Year of release' className='p-2 rounded-md mb-2' onChange={(e)=>setYear(e.target.value)} value={year} />
        <Input type="text" placeholder='Genre' className='p-2 rounded-md mb-2' onChange={(e)=>setGenre(e.target.value)} value={genre} />
        <Input type='text' placeholder='Poster URL' className='p-2 rounded-md mb-2' onChange={(e)=>setPosterURL(e.target.value)} value={posterURL} />
        <Button variant="outline" size="sm" onClick={saveMovie}>{editingId !== null ? "Update" : "Submit"}</Button>
      <Button variant="destructive" size="sm" onClick={()=>clearMovie()}>Clear</Button>
      </div>
    )}
    {!showForm && (
    <Input className='mt-4' placeholder='Search movies...' 
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
    onKeyDown={(e) => {
    if (e.key === "Enter") {
      setSearchTerm(searchInput);
    }else{
      setSearchTerm('');
    }
    }} />
    )}


    <div className='mt-8 w-full max-w-4xl bg-muted/20 rounded shadow-xl p-4'>
      <Table>
        
        <TableHeader>
          <TableRow className=''>
        
          <TableHead>ID</TableHead>
          <TableHead >Poster</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Genre</TableHead>
          <TableHead>Actions</TableHead>
          </TableRow>
        
      </TableHeader>
      <TableBody>
        {filteredMovies.map((movie,index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell><img src ={movie.posterURL} className="w-16 h-24 object-cover rounded mx-auto" /></TableCell>
            <TableCell>{movie.title}</TableCell>
            <TableCell>{movie.year}</TableCell>
            <TableCell>{movie.genre}</TableCell>
            <TableCell >
              <div className="flex justify-center gap-3">
              
              <Button variant="outline" size="sm" onClick={() => editMovie(movie.id)}>
                Edit
              </Button>
            
              <Button variant="destructive" size="sm" onClick={() => deleteMovie(movie.id)}>
                Delete
              </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}  
      </TableBody>
    </Table>
    </div>
      
    

  </div>
  )
}

export default App





//react hook form
//validation
//pop-up(modal for the form)

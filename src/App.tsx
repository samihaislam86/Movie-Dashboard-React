
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from './components/ui/table'
import { useForm } from 'react-hook-form'
import { useState, } from 'react'
import { moviesData } from './data/movie_data'
import {Dialog,DialogContent,DialogHeader,DialogTitle,} from "./components/ui/dialog"


type MovieFormValues = {
  title: string
  year: string
  genre: string
  posterURL: string
}



function App() {
  const [movieList, setMovieList] = useState<any[]>(moviesData)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<MovieFormValues>()
  const [showForm, setShowForm] = useState(false);


//add, delete, edit functions for movies


const deleteMovie = (id:number) => {
  const confirmed = window.confirm('Are you sure, you want to delete this movie?');
  if (!confirmed) return;

  setMovieList((prev) =>
    prev.filter((movie) => movie.id !== id)
  );
};





const editMovie = (id: number) => {
  const movieToEdit = movieList.find((movie) => movie.id === id);
  const confirmed = window.confirm('Do you want to edit this movie?');
  if (!confirmed) return;

  setValue('title', movieToEdit.title)
    setValue('year', movieToEdit.year.toString())
    setValue('genre', movieToEdit.genre)
    setValue('posterURL', movieToEdit.posterURL)
    setEditingId(id)
    setShowForm(true)
};



  const onSubmit = (data: MovieFormValues) => {
    if (editingId !== null) {
      setMovieList((prev) =>
        prev.map((movie) =>
          movie.id === editingId
            ? { ...movie, ...data, year: Number(data.year) }
            : movie
        )
      )
      setEditingId(null)
    } else {
      setMovieList((prev) => [
        ...prev,
        { id: Date.now(), ...data, year: Number(data.year) },
      ])
    }
    reset()
    setShowForm(false)
  };




const filteredMovies = movieList.filter((movie) =>
  movie.title.toLowerCase().includes(searchTerm.toLowerCase())
);

//

  return (
    
  <div className='body'>
  
    <h1 className='text-5xl font-bold mb-4 text-white py-4'>Welcome to Movie Stream</h1>
    <p className='text-lg mb-8 text-white'>Stream your favorite movies anytime, anywhere.</p>
    <Button variant="default" size="lg" onClick={() => { reset(); setShowForm((prev) => !prev) }}>+ ADD New Movie</Button>
    <Dialog open={showForm} onOpenChange={(open) => { if (!open) { reset(); setEditingId(null); setShowForm(false) } }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editingId !== null ? 'Edit Movie' : 'Add New Movie'}</DialogTitle>
        </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col justify-center gap-4 mt-4'>
          <div className="flex flex-col">
            <Input placeholder='Title'{...register('title', { required: 'Title is required' })}
          className={errors.title ? 'border-red-500' : ''}/>
        {errors.title && <span className="text-red-400 text-xs mt-1">{errors.title.message}</span>}
        </div>

      
      <div className="flex flex-col">
        <Input
          placeholder='Year'
          {...register('year', {
            required: 'Year is required',
            pattern: { value: /^\d{4}$/, message: 'Enter a valid 4-digit year' },
            min: { value: 1888, message: 'Year must be after 1888' },
            max: { value: new Date().getFullYear(), message: 'Year cannot be in the future' }
          })}
          className={errors.year ? 'border-red-500' : ''}
        />
        {errors.year && <span className="text-red-400 text-xs mt-1">{errors.year.message}</span>}
      </div>

      
      <div className="flex flex-col">
        <Input
          placeholder='Genre'
          {...register('genre', {
            required: 'Genre is required',
            minLength: { value: 3, message: 'Genre must be at least 3 characters' }
          })}
          className={errors.genre ? 'border-red-500' : ''}
        />
        {errors.genre && <span className="text-red-400 text-xs mt-1">{errors.genre.message}</span>}
      </div>

   
      <div className="flex flex-col">
        <Input
          placeholder='Poster URL'
          {...register('posterURL', {
            required: 'Poster URL is required',
            pattern: { value: /^(https?:\/\/|\/).+/, message: 'Enter a valid URL or path' }
          })}
          className={errors.posterURL ? 'border-red-500' : ''}
        />
        {errors.posterURL && <span className="text-red-400 text-xs mt-1">{errors.posterURL.message}</span>}
      </div>

      <Button type="submit" variant="outline" size="sm">
        {editingId !== null ? 'Update' : 'Submit'}
      </Button>
      <Button type="button" variant="destructive" size="sm" onClick={() => { reset(); setShowForm(false) }}>
        Clear
      </Button>

    </div>
  </form>
  </DialogContent>

</Dialog>
  

    
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





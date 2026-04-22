import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import type { Movie } from '../types/Movie_types'

type Props = {
  movies: Movie[]
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export default function MovieTable({ movies, onEdit, onDelete }: Props) {
  return (
    <div className='mt-8 w-full max-w-4xl bg-muted/20 rounded shadow-xl p-4'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Poster</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie, index) => (
            <TableRow key={movie.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <img
                  src={movie.posterURL}
                  alt={movie.title}
                  className="w-16 h-24 object-cover rounded mx-auto"
                />
              </TableCell>
              <TableCell>{movie.title}</TableCell>
              <TableCell>{movie.year}</TableCell>
              <TableCell>{movie.genre}</TableCell>
              <TableCell>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" size="sm" onClick={() => onEdit(movie.id)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => onDelete(movie.id)}>
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
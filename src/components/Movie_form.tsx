import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import type { Movie } from '../types/Movie_types'

type MovieFormValues = {
  title: string
  year: string
  genre: string
  posterURL: string
}

type Props = {
  showForm: boolean
  setShowForm: (value: boolean) => void
  onSave: (data: MovieFormValues, editingId: number | null) => void
  editingMovie: Movie | null
}

export default function MovieForm({ showForm, setShowForm, onSave, editingMovie }: Props) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<MovieFormValues>()

  useEffect(() => {
    if (editingMovie) {
      setValue('title', editingMovie.title)
      setValue('year', editingMovie.year.toString())
      setValue('genre', editingMovie.genre)
      setValue('posterURL', editingMovie.posterURL)
    } else {
      reset()
    }
  }, [editingMovie])

  const onSubmit = (data: MovieFormValues) => {
    onSave(data, editingMovie ? editingMovie.id : null)
    reset()
    setShowForm(false)
  }

  return (
    <Dialog open={showForm} onOpenChange={(open) => { if (!open) { reset(); setShowForm(false) } }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editingMovie ? 'Edit Movie' : 'Add New Movie'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-4 mt-4'>

            <div className="flex flex-col">
              <Input placeholder='Title'
                {...register('title', { required: 'Title is required' })}
                className={errors.title ? 'border-red-500' : ''} />
              {errors.title && <span className="text-red-400 text-xs mt-1">{errors.title.message}</span>}
            </div>

            <div className="flex flex-col">
              <Input placeholder='Year'
                {...register('year', {
                  required: 'Year is required',
                  pattern: { value: /^\d{4}$/, message: 'Enter a valid 4-digit year' },
                  min: { value: 1888, message: 'Year must be after 1888' },
                  max: { value: new Date().getFullYear(), message: 'Year cannot be in the future' }
                })}
                className={errors.year ? 'border-red-500' : ''} />
              {errors.year && <span className="text-red-400 text-xs mt-1">{errors.year.message}</span>}
            </div>

            <div className="flex flex-col">
              <Input placeholder='Genre'
                {...register('genre', {
                  required: 'Genre is required',
                  minLength: { value: 3, message: 'Genre must be at least 3 characters' }
                })}
                className={errors.genre ? 'border-red-500' : ''} />
              {errors.genre && <span className="text-red-400 text-xs mt-1">{errors.genre.message}</span>}
            </div>

            <div className="flex flex-col">
              <Input placeholder='Poster URL'
                {...register('posterURL', {
                  required: 'Poster URL is required',
                  pattern: { value: /^(https?:\/\/|\/).+/, message: 'Enter a valid URL or path' }
                })}
                className={errors.posterURL ? 'border-red-500' : ''} />
              {errors.posterURL && <span className="text-red-400 text-xs mt-1">{errors.posterURL.message}</span>}
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="destructive" size="sm" onClick={() => { reset(); setShowForm(false) }}>
                Cancel
              </Button>
              <Button type="submit" variant="outline" size="sm">
                {editingMovie ? 'Update' : 'Submit'}
              </Button>
            </div>

          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
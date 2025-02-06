// src/components/AddMovieForm.tsx
import React, { useState } from 'react';

interface AddMovieFormProps {
  onAddMovie: (movie: { title: string, genre: string, watched_date: string }) => void;
}

const AddMovieForm: React.FC<AddMovieFormProps> = ({ onAddMovie }) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [watched_date, setWatched_date] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && genre && watched_date) {
      onAddMovie({ title, genre, watched_date });
      setTitle('');
      setGenre('');
      setWatched_date('');
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie title"
          required
        />
      </div>
      
      <div>
        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Enter movie genre"
          required
        />
      </div>

      <div>
        <label>Watched Date:</label>
        <input
          type="date"
          value={watched_date}
          onChange={(e) => setWatched_date(e.target.value)}
          required
        />
      </div>

      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovieForm;

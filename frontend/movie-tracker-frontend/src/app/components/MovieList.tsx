// src/components/MovieList.tsx
import React from 'react';

interface Movie {
  id: number;
  title: string;
  genre: string;
  watched_date: string;
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div>
      <h2>Movie List</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> | {movie.genre} | {movie.watched_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;

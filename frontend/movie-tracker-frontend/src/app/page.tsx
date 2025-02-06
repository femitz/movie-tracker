'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';  
import styles from './page.module.css';

interface Movie {
  id: number;
  title: string;
  genre: string;
  watched_date: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleAddMovie = (movie: { title: string, genre: string, watched_date: string }) => {
    const newMovie = movie;
    axios.post('http://localhost:8080/api/movies', newMovie)
    .then(response => {
      // Se a requisição for bem-sucedida, adiciona o filme à lista local
      setMovies([...movies, response.data]);
    })
    .catch(error => {
      console.error('Error adding movie: ', error);
    });
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.header}>Movie Tracker</h1> 
        <AddMovieForm onAddMovie={handleAddMovie} />
        <MovieList movies={movies} />
      </main>
    </div>
  );
}

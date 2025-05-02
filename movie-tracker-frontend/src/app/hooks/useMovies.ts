import { useState, useEffect } from "react";
import api from "../services/api";

export interface Movie {
  id: number;
  title: string;
  genre: string;
  watched_date: string;
}

function sortMovies(movies: Movie[]) {
  return movies.sort((a, b) => {
    const dateA = new Date(a.watched_date);
    const dateB = new Date(b.watched_date);
    if (dateB.getTime() === dateA.getTime()) return a.id - b.id;
    return dateB.getTime() - dateA.getTime();
  });
}

export function useMovies() {
  const URL = '/api/movies'  
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get(URL);
        setMovies(sortMovies(response.data));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchMovies();
  }, []);

  const addMovie = async (movie: Omit<Movie, "id">) => {
    try {
      const response = await api.post(URL, movie);
      setMovies((prev) => sortMovies([...prev, response.data]));
    } catch (error) {
      console.error("Error adding movie: ", error);
    }
  };

  const removeById = async (id: number) => {
    try {
      await api.delete(`${URL}/${id}`);
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error removing movie: ", error);
    }
  };

  return { movies, addMovie, removeById };
}
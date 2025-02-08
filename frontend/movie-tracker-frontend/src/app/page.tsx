"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "./components/MovieList/MovieList";
import AddMovieForm from "./components/AddMovieForm/AddMovieForm";
import styles from "./page.module.css";
import { time } from "console";

interface Movie {
  id: number;
  title: string;
  genre: string;
  watched_date: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/movies");
        const sortedMovies = response.data.sort((a: Movie, b: Movie) => {
          const dateA = new Date(a.watched_date);
          const dateB = new Date(b.watched_date);

          if (dateB.getTime() === dateA.getTime()) {
            return a.id - b.id; // Ordena por ID se as datas forem iguais
          }

          return dateB.getTime() - dateA.getTime(); // Ordena por data (mais recente primeiro)
        });
        setMovies(sortedMovies);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchMovies();
  }, []);

  const handleAddMovie = async (movie: {
    title: string;
    genre: string;
    watched_date: string;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/movies",
        movie
      );
      const updatedMovies = [...movies, response.data].sort(
        (a: Movie, b: Movie) => {
          const dateA = new Date(a.watched_date);
          const dateB = new Date(b.watched_date);

          if (dateB.getTime() === dateA.getTime()) {
            return a.id - b.id;
          }

          return dateB.getTime() - dateA.getTime();
        }
      );
      setMovies(updatedMovies);
    } catch (error) {
      console.error("Error adding movie: ", error);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const circle = document.querySelector(`.${styles["cursor-circle"]}`) as HTMLElement;
      if (circle) {
        circle.style.left = `${e.clientX}px`;
        circle.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); 

  return (
    <div className={styles.page}>
      <div className={styles["cursor-circle"]}></div>
      <main className={styles.main}>
        <h1 className={styles.header}>🍿 Movie Tracker</h1>
        <AddMovieForm onAddMovie={handleAddMovie} />
        <MovieList movies={movies} />
      </main>
    </div>
  );
}

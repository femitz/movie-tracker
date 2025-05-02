"use client";

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import MovieList from "../components/MovieList/MovieList";
import AddMovieForm from "../components/AddMovieForm/AddMovieForm";
import styles from "../page.module.css";
import { useMovies } from "../hooks/useMovies";
import { auth } from "../services/api";

export default function MoviesPage() {
  const { movies, addMovie, removeById } = useMovies();
  const router = useRouter();

  const handleLogout = () => {
    auth.logout();
    router.push('/auth');
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
        <div className={styles.headerContainer}>
          <h1 className={styles.header}>🍿 Movie Tracker</h1>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Sair
          </button>
        </div>
        <AddMovieForm onAddMovie={addMovie} />
        <MovieList movies={movies} removeById={removeById}/>
      </main>
    </div>
  );
} 
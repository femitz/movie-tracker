"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "./components/MovieList/MovieList";
import AddMovieForm from "./components/AddMovieForm/AddMovieForm";
import styles from "./page.module.css";
import { useMovies } from "./hooks/useMovies";

export default function Home() {
  const { movies, addMovie, removeById } = useMovies();


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
        <AddMovieForm onAddMovie={addMovie} />
        <MovieList movies={movies} removeById={removeById}/>
      </main>
    </div>
  );
}

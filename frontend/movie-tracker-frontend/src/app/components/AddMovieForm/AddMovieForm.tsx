import React, { useState } from "react";
import styles from "./AddMovieForm.module.css";
import { useReward } from "react-rewards";

interface AddMovieFormProps {
  onAddMovie: (movie: {
    title: string;
    genre: string;
    watched_date: string;
  }) => void;
}

const AddMovieForm: React.FC<AddMovieFormProps> = ({ onAddMovie }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [watched_date, setWatched_date] = useState("");

  const { reward, isAnimating } = useReward('rewardId', 'confetti')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && genre && watched_date) {
      onAddMovie({ title, genre, watched_date });
      setTitle("");
      setGenre("");
      setWatched_date("");
      reward()
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.movieForm}>
      <h2 className={styles.movieFormH2}>Add a New Movie</h2>

      <div className={styles.divMovieForm}>
        <label className={styles.labelMovieForm}>Title:</label>
        <input
          className={styles.placeholderMovieForm}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie title"
          required
        />
      </div>

      <div className={styles.divMovieForm}>
        <label className={styles.labelMovieForm}>Genre:</label>
        <input
          className={styles.placeholderMovieForm}
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Enter movie genre"
          required
        />
      </div>

      <div className={styles.divMovieForm}>
        <label className={styles.labelMovieForm}>Watched Date:</label>
        <input
          className={styles.placeholderMovieForm}
          type="date"
          value={watched_date}
          onChange={(e) => setWatched_date(e.target.value)}
          required
        />
      </div>

      <button className={styles.button} type="submit" disabled={isAnimating}>
        Add Movie
        <span id='rewardId' />
      </button>
    </form>
  );
};

export default AddMovieForm;

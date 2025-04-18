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
  const [genre, setGenre] = useState<string[]>([]);
  const [watched_date, setWatched_date] = useState("");
  const genresList = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Musical",
    "Mystery",
    "Noir",
    "Romance",
    "Sci-Fi",
    "Short",
    "Sport",
    "Thriller",
    "War",
    "Western",
    "Reality-TV"
  ];

  const { reward, isAnimating } = useReward('rewardId', 'confetti')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && genre && watched_date) {
      onAddMovie({ title, genre: genre.join(', '), watched_date });
      setTitle("");
      setGenre([]);
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
        <div className={styles.genreCheckboxGroup}>
          {genresList.map((g) => (
            <label key={g} className={styles.genreCheckboxLabel}>
              <input
                type="checkbox"
                className={styles.genreCheckboxInput}
                value={g}
                checked={genre.includes(g)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setGenre([...genre, g]);
                  } else {
                    setGenre(genre.filter(item => item !== g));
                  }
                }}
              />
              {g}
            </label>
          ))}
        </div>
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

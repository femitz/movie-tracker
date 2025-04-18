package com.femitz.movietracker.movie_tracker.repository;

import com.femitz.movietracker.movie_tracker.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {
}

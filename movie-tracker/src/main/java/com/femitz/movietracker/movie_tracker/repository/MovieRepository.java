package com.femitz.movietracker.movie_tracker.repository;

import com.femitz.movietracker.movie_tracker.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository <Movie, Long> {
}

package com.femitz.movietracker.movie_tracker.repository;

import com.femitz.movietracker.movie_tracker.model.Movie;
import com.femitz.movietracker.movie_tracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByUser(User user);
}

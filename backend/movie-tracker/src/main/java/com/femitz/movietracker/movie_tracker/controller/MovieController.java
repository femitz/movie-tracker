package com.femitz.movietracker.movie_tracker.controller;

import com.femitz.movietracker.movie_tracker.model.Movie;
import com.femitz.movietracker.movie_tracker.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @PostMapping
    public ResponseEntity<Movie> addMovies(@RequestBody Movie movie) {
        Movie savedMovie = movieService.saveMovie(movie);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMovie);
    }

    @GetMapping
    public ResponseEntity<List<Movie>> listMovies() {
        List<Movie> movies = movieService.listMovies();
        return ResponseEntity.ok(movies);
    }

    @PostMapping("/batch")
    public ResponseEntity<List<Movie>> addMoviesBatch(@RequestBody List<Movie> movies) {
        List<Movie> savedMovies = movieService.saveMoviesBatch(movies);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMovies);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        boolean deleted = movieService.deleteMovieById(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

}

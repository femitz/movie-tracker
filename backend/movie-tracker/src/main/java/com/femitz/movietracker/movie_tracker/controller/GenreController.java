package com.femitz.movietracker.movie_tracker.controller;

import com.femitz.movietracker.movie_tracker.model.Genre;
import com.femitz.movietracker.movie_tracker.model.Movie;
import com.femitz.movietracker.movie_tracker.service.GenreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
public class GenreController {

    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping
    public List<Genre> getAllGenres() {
        return genreService.getAllGenres();
    }

    @PostMapping
    public Genre createGenre(@RequestBody Genre genre) {
        return genreService.createGenre(genre);
    }

    @PostMapping("/batch")
    public ResponseEntity<List<Genre>> addGenreBatch(@RequestBody List<Genre> genres) {
        List<Genre> savedGenres = genreService.saveGenreBatch(genres);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGenres);
    }
}
package com.femitz.movietracker.movie_tracker.service;

import com.femitz.movietracker.movie_tracker.model.Genre;
import com.femitz.movietracker.movie_tracker.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreService {

    @Autowired
    private GenreRepository genreRepository;

    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    public Genre createGenre(Genre genre) {
        return genreRepository.save(genre);
    }

    public List<Genre> saveGenreBatch(List<Genre> genres) {
        return genreRepository.saveAll(genres);
    }
}
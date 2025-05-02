package com.femitz.movietracker.movie_tracker.service;

import com.femitz.movietracker.movie_tracker.model.Movie;
import com.femitz.movietracker.movie_tracker.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public List<Movie> listMovies() {
        return movieRepository.findAll();
    }

    public List<Movie> saveMoviesBatch(List<Movie> movies) {
        return movieRepository.saveAll(movies);
    }

    public boolean deleteMovieById(Long id) {
        if (movieRepository.existsById(id)) {
            movieRepository.deleteById(id);
            return true;
        }
        return false;
    }

}

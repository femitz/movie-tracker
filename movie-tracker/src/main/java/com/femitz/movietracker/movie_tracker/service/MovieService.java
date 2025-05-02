package com.femitz.movietracker.movie_tracker.service;

import com.femitz.movietracker.movie_tracker.model.Movie;
import com.femitz.movietracker.movie_tracker.model.User;
import com.femitz.movietracker.movie_tracker.repository.MovieRepository;
import com.femitz.movietracker.movie_tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;
    
    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByEmail(userDetails.getUsername())
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public Movie saveMovie(Movie movie) {
        User currentUser = getCurrentUser();
        movie.setUser(currentUser);
        return movieRepository.save(movie);
    }

    public List<Movie> listMovies() {
        User currentUser = getCurrentUser();
        return movieRepository.findByUser(currentUser);
    }

    public List<Movie> saveMoviesBatch(List<Movie> movies) {
        User currentUser = getCurrentUser();
        movies.forEach(movie -> movie.setUser(currentUser));
        return movieRepository.saveAll(movies);
    }

    public boolean deleteMovieById(Long id) {
        User currentUser = getCurrentUser();
        Movie movie = movieRepository.findById(id).orElse(null);
        
        if (movie != null && movie.getUser().getId().equals(currentUser.getId())) {
            movieRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

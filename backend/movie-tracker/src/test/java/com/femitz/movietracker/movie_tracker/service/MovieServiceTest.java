package com.femitz.movietracker.movie_tracker.service;

import com.femitz.movietracker.movie_tracker.model.Movie;
import com.femitz.movietracker.movie_tracker.repository.MovieRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class MovieServiceTest {

    @Mock
    private MovieRepository movieRepository;

    @InjectMocks
    private MovieService movieService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveMovie() {
        Movie movie = new Movie("O Senhor dos Anéis", "Fantasy", LocalDate.of(2024, 2, 5));

        // Configura o comportamento do repositório
        when(movieRepository.save(any(Movie.class))).thenReturn(movie);

        // Testa o serviço
        Movie savedMovie = movieService.saveMovie(movie);

        assertNotNull(savedMovie);
        assertEquals("O Senhor dos Anéis", savedMovie.getTitle());
        assertEquals("Fantasy", savedMovie.getGenre());
        assertEquals(LocalDate.of(2024, 2, 5), savedMovie.getWatchedDate());

        // Verifica se o método do repositório foi chamado
        verify(movieRepository, times(1)).save(any(Movie.class));
    }

    @Test
    public void testListMovies() {
        Movie movie1 = new Movie("O Senhor dos Anéis", "Fantasy", LocalDate.of(2024, 2, 5));
        Movie movie2 = new Movie("Harry Potter", "Fantasy", LocalDate.of(2023, 12, 25));

        List<Movie> movies = Arrays.asList(movie1, movie2);

        // Configura o comportamento do repositório
        when(movieRepository.findAll()).thenReturn(movies);

        // Testa o serviço
        List<Movie> result = movieService.listMovies();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("O Senhor dos Anéis", result.get(0).getTitle());
        assertEquals("Harry Potter", result.get(1).getTitle());

        // Verifica se o método do repositório foi chamado
        verify(movieRepository, times(1)).findAll();
    }
}

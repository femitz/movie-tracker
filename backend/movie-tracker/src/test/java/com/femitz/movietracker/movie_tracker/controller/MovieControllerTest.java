package com.femitz.movietracker.movie_tracker.controller;

import com.femitz.movietracker.movie_tracker.model.Movie;
import com.femitz.movietracker.movie_tracker.service.MovieService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class MovieControllerTest {

    private MockMvc mockMvc;

    @Mock
    private MovieService movieService;

    @InjectMocks
    private MovieController movieController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(movieController).build();
    }

    @Test
    public void testAddMovie() throws Exception {
        Movie movie = new Movie("O Senhor dos Anéis", "Fantasy", LocalDate.of(2024, 2, 5));

        // Configura o comportamento do serviço
        when(movieService.saveMovie(any(Movie.class))).thenReturn(movie);

        // Envia a requisição POST e verifica a resposta
        mockMvc.perform(post("/api/movies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(movie)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("O Senhor dos Anéis"))
                .andExpect(jsonPath("$.genre").value("Fantasy"))
                .andExpect(jsonPath("$.watchedDate").value("2024-02-05"));

        // Verifica se o método do serviço foi chamado
        verify(movieService, times(1)).saveMovie(any(Movie.class));
    }

    @Test
    public void testListMovies() throws Exception {
        Movie movie1 = new Movie("O Senhor dos Anéis", "Fantasy", LocalDate.of(2024, 2, 5));
        Movie movie2 = new Movie("Harry Potter", "Fantasy", LocalDate.of(2023, 12, 25));

        List<Movie> movies = Arrays.asList(movie1, movie2);

        // Configura o comportamento do serviço
        when(movieService.listMovies()).thenReturn(movies);

        // Envia a requisição GET e verifica a resposta
        mockMvc.perform(get("/api/movies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("O Senhor dos Anéis"))
                .andExpect(jsonPath("$[1].title").value("Harry Potter"));

        // Verifica se o método do serviço foi chamado
        verify(movieService, times(1)).listMovies();
    }
}
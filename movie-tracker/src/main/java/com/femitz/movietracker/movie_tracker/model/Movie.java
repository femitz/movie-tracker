package com.femitz.movietracker.movie_tracker.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name =  "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String genre;

    @Column(name = "watched_date", nullable = true)
    @JsonProperty("watched_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate watchedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Movie() {
    }

    public Movie(String title, String genre, LocalDate watchedDate, User user) {
        this.title = title;
        this.genre = genre;
        this.watchedDate = watchedDate;
        this.user = user;
    }

    // Construtor Completo (Incluindo ID - Útil para respostas e testes)
    public Movie(Long id, String title, String genre, LocalDate watchedDate, User user) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.watchedDate = watchedDate;
        this.user = user;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public LocalDate getWatchedDate() {
        return watchedDate;
    }

    public void setWatchedDate(LocalDate watchedDate) {
        this.watchedDate = watchedDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

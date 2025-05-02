package com.femitz.movietracker.movie_tracker.controller;

import com.femitz.movietracker.movie_tracker.dto.AuthResponse;
import com.femitz.movietracker.movie_tracker.dto.LoginRequest;
import com.femitz.movietracker.movie_tracker.dto.RegisterRequest;
import com.femitz.movietracker.movie_tracker.service.AuthService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        logger.info("Recebendo requisição de registro para o email: {}", request.getEmail());
        try {
            AuthResponse response = authService.register(request);
            logger.info("Registro realizado com sucesso para o email: {}", request.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Erro ao registrar usuário: {}", e.getMessage());
            throw e;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        logger.info("Recebendo requisição de login para o email: {}", request.getEmail());
        try {
            AuthResponse response = authService.login(request);
            logger.info("Login realizado com sucesso para o email: {}", request.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Erro ao realizar login: {}", e.getMessage());
            throw e;
        }
    }

    @ResponseStatus(org.springframework.http.HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
            logger.error("Erro de validação no campo {}: {}", fieldName, errorMessage);
        });
        return errors;
    }

    @ResponseStatus(org.springframework.http.HttpStatus.BAD_REQUEST)
    @ExceptionHandler(RuntimeException.class)
    public Map<String, String> handleRuntimeException(RuntimeException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("error", ex.getMessage());
        logger.error("Erro durante a execução: {}", ex.getMessage());
        return errors;
    }
} 
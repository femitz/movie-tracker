package com.femitz.movietracker.movie_tracker.service;

import com.femitz.movietracker.movie_tracker.dto.AuthResponse;
import com.femitz.movietracker.movie_tracker.dto.LoginRequest;
import com.femitz.movietracker.movie_tracker.dto.RegisterRequest;
import com.femitz.movietracker.movie_tracker.model.User;
import com.femitz.movietracker.movie_tracker.repository.UserRepository;
import com.femitz.movietracker.movie_tracker.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        logger.info("Iniciando processo de registro para o email: {}", request.getEmail());

        // Verifica se o email já existe
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            logger.warn("Tentativa de registro com email já existente: {}", request.getEmail());
            throw new RuntimeException("Email já cadastrado");
        }

        try {
            User user = new User();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));

            userRepository.save(user);
            logger.info("Usuário registrado com sucesso: {}", user.getEmail());

            String token = jwtService.generateToken(new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                java.util.Collections.emptyList()
            ));

            return new AuthResponse(token, "Usuário registrado com sucesso");
        } catch (Exception e) {
            logger.error("Erro ao registrar usuário: {}", e.getMessage());
            throw new RuntimeException("Erro ao registrar usuário: " + e.getMessage());
        }
    }

    public AuthResponse login(LoginRequest request) {
        logger.info("Iniciando processo de login para o email: {}", request.getEmail());

        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    logger.error("Usuário não encontrado: {}", request.getEmail());
                    return new RuntimeException("Usuário não encontrado");
                });

            String token = jwtService.generateToken(new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                java.util.Collections.emptyList()
            ));

            logger.info("Login realizado com sucesso para o email: {}", user.getEmail());
            return new AuthResponse(token, "Login realizado com sucesso");
        } catch (BadCredentialsException e) {
            logger.error("Credenciais inválidas para o email: {}", request.getEmail());
            throw new RuntimeException("Credenciais inválidas");
        } catch (Exception e) {
            logger.error("Erro ao realizar login: {}", e.getMessage());
            throw new RuntimeException("Erro ao realizar login: " + e.getMessage());
        }
    }
} 
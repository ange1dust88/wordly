package com.example.back.controllers;

import com.example.back.models.User;
import com.example.back.services.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody User user) {
        try {
            authService.registerUser(user);  
            return ResponseEntity.ok("User registered successfully!");  
        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        try {
            authService.loginUser(user);  
            return ResponseEntity.ok("Login successful!"); 
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

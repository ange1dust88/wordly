package com.example.back.services;

import org.springframework.stereotype.Service;
import com.example.back.repositories.UserRepository;
import com.example.back.models.User;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private static String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";
    private static Pattern emailPattern = Pattern.compile(EMAIL_REGEX);

    private boolean isValidEmail(String email) {
        Matcher matcher = emailPattern.matcher(email);
        return matcher.matches();
    }

    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                hexString.append(Integer.toHexString(0xFF & b));
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error while hashing the password", e);
        }
    }

    public void registerUser(User user) {
        if (!isValidEmail(user.getEmail())) {
            throw new IllegalArgumentException("Invalid email format");
        }

        Optional<User> existingEmailUser = userRepository.findByEmail(user.getEmail());
        if (existingEmailUser.isPresent()) {
            throw new IllegalArgumentException("Email is already in use!");
        }

        Optional<User> existingUsernameUser = userRepository.findByUsername(user.getUsername());
        if (existingUsernameUser.isPresent()) {
            throw new IllegalArgumentException("Username is already in use!");
        }

        String hashedPassword = hashPassword(user.getPassword());
        user.setPassword(hashedPassword);
        userRepository.save(user);
    }

    public void loginUser(User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isEmpty()) {
            throw new IllegalArgumentException("User not found!");
        }

        String hashedPassword = hashPassword(user.getPassword());
        if (!hashedPassword.equals(existingUser.get().getPassword())) {
            throw new IllegalArgumentException("Invalid password!");
        }
    }
}
package com.example.back;

import com.example.back.models.User;
import com.example.back.repositories.UserRepository;
import com.example.back.services.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setUsername("testUser");
        testUser.setEmail("testUser@example.com");
        testUser.setPassword("password123");

        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getUserByUsername_Found() {
        when(userRepository.findByUsername("testUser")).thenReturn(java.util.Optional.of(testUser));

        User result = userService.getUserByUsername("testUser");
        assertNotNull(result);
        assertEquals("testUser", result.getUsername());
        assertEquals("testUser@example.com", result.getEmail());
    }

    @Test
    void getUserByUsername_NotFound() {
        when(userRepository.findByUsername("nonExistentUser")).thenReturn(java.util.Optional.empty());

        User result = userService.getUserByUsername("nonExistentUser");
        assertNull(result);
    }
}

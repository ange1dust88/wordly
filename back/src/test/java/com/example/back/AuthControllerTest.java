package com.example.back;

import com.example.back.controllers.AuthController;
import com.example.back.models.User;
import com.example.back.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.hamcrest.Matchers.containsString;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    @Test
    void registerUser_invalidEmail_returnsBadRequest() throws Exception {
        String invalidUserJson = """
            {
              "username": "testuser",
              "email": "invalid-email",
              "password": "password123"
            }
        """;

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidUserJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("Invalid email format")));
    }

    @Test
    void loginUser_invalidPassword_returnsBadRequest() throws Exception {
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("hashedpassword");
        Mockito.when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        String loginJson = """
            {
              "username": "testuser",
              "password": "wrongpassword"
            }
        """;

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("Invalid password")));
    }
}

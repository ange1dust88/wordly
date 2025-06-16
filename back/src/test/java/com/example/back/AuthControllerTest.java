package com.example.back;

import com.example.back.controllers.AuthController;
import com.example.back.models.User;
import com.example.back.services.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false) 
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean  
    private AuthService authService;

    private User testUser;

    @BeforeEach
    public void setUp() {
        testUser = new User();
        testUser.setUsername("testUser");
        testUser.setEmail("testUser@example.com");
        testUser.setPassword("password123");
    }

    @Test
    public void testRegisterUser_Success() throws Exception {
        doNothing().when(authService).registerUser(testUser);

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"testUser\",\"email\":\"testUser@example.com\",\"password\":\"password123\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string("User registered successfully!"));
    }

    @Test
    public void testLoginUser_Success() throws Exception {
        doNothing().when(authService).loginUser(testUser);

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"testUser\",\"password\":\"password123\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string("Login successful!"));
    }
}
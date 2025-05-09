package com.example.back;

import com.example.back.controllers.UserController;
import com.example.back.models.User;
import com.example.back.services.ModuleService;
import com.example.back.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.Mockito.*;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ModuleService moduleService;

    @MockBean
    private UserService userService;

    @Test
    void getUsersWithModuleCount_returnsUsers() throws Exception {
        Map<String, Object> user1 = new HashMap<>();
        user1.put("username", "user1");
        user1.put("moduleCount", 5);

        Map<String, Object> user2 = new HashMap<>();
        user2.put("username", "user2");
        user2.put("moduleCount", 3);

        List<Map<String, Object>> users = List.of(user1, user2);

        when(moduleService.getUsersWithModuleCount()).thenReturn(users);

        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].username").value("user1"))
                .andExpect(jsonPath("$[0].moduleCount").value(5))
                .andExpect(jsonPath("$[1].username").value("user2"))
                .andExpect(jsonPath("$[1].moduleCount").value(3));

        verify(moduleService, times(1)).getUsersWithModuleCount();
    }

    @Test
    void getUserByUsername_returnsUser() throws Exception {
        User user = new User();
        user.setUsername("user1");
        user.setEmail("user1@example.com");

        when(userService.getUserByUsername("user1")).thenReturn(Optional.of(user));

        mockMvc.perform(get("/api/users/user1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("user1"))
                .andExpect(jsonPath("$.email").value("user1@example.com"));

        verify(userService, times(1)).getUserByUsername("user1");
    }

    @Test
    void getUserByUsername_notFound() throws Exception {
        when(userService.getUserByUsername("user1")).thenReturn(Optional.empty());


        mockMvc.perform(get("/api/users/user1"))
                .andExpect(status().isNotFound());

        verify(userService, times(1)).getUserByUsername("user1");
    }

    @Test
    void getUserModules_returnsModules() throws Exception {
        Map<String, Object> userModules = new HashMap<>();
        userModules.put("module1", "Module 1");
        userModules.put("module2", "Module 2");

        when(moduleService.getUserModulesByUsername("user1")).thenReturn(userModules);

        mockMvc.perform(get("/api/users/user1/modules"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.module1").value("Module 1"))
                .andExpect(jsonPath("$.module2").value("Module 2"));

        verify(moduleService, times(1)).getUserModulesByUsername("user1");
    }

    @Test
    void getUserModules_notFound() throws Exception {
        when(moduleService.getUserModulesByUsername("user1")).thenReturn(null);

        mockMvc.perform(get("/api/users/user1/modules"))
                .andExpect(status().isNotFound());

        verify(moduleService, times(1)).getUserModulesByUsername("user1");
    }
}

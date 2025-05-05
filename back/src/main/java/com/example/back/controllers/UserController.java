package com.example.back.controllers;

import com.example.back.models.User;
import com.example.back.services.ModuleService;
import com.example.back.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private ModuleService moduleService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getUsersWithModuleCount() {
        List<Map<String, Object>> users = moduleService.getUsersWithModuleCount();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{username}/modules")
    public ResponseEntity<Map<String, Object>> getUserModules(@PathVariable String username) {
        Map<String, Object> result = moduleService.getUserModulesByUsername(username);
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}

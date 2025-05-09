package com.example.back.services;

import com.example.back.models.StudyModules;
import com.example.back.models.User;
import com.example.back.repositories.StudyModulesRepository;
import com.example.back.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ModuleService {

    @Autowired
    private StudyModulesRepository studyModulesRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Map<String, Object>> getUsersWithModuleCount() {
        List<StudyModules> modules = studyModulesRepository.findAll();
        Map<String, Integer> userModuleCount = new HashMap<>();

        for (StudyModules module : modules) {
            String author = module.getAuthor();
            userModuleCount.put(author, userModuleCount.getOrDefault(author, 0) + 1);
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : userModuleCount.entrySet()) {
            Map<String, Object> user = new HashMap<>();
            user.put("author", entry.getKey());
            user.put("moduleCount", entry.getValue());
            result.add(user);
        }

        result.sort((a, b) -> Integer.compare((Integer) b.get("moduleCount"), (Integer) a.get("moduleCount")));
        
        return result;
    }

    public Map<String, Object> getUserModulesByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user == null) {
            return null;
        }

        List<StudyModules> modules = studyModulesRepository.findByAuthor(user.get().getUsername());

        Map<String, Object> result = new HashMap<>();
        result.put("username", user.get().getUsername());
        result.put("modules", modules);
        return result;
    }
}

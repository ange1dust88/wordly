package com.example.back.controllers;

import com.example.back.models.StudyModules;
import com.example.back.models.Words;
import com.example.back.repositories.StudyModulesRepository;
import com.example.back.repositories.WordsRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/modules")
@CrossOrigin(origins = "https://localhost:3000")
public class ModuleController {

    @Autowired
    private StudyModulesRepository moduleRepository;

    @Autowired
    private WordsRepository wordRepository;

    @PostMapping
    public ResponseEntity<StudyModules> createModule(@RequestBody StudyModules module) {

        module = moduleRepository.save(module);

        for (Words word : module.getWords()) {
            word.setModule(module);  
            wordRepository.save(word);  
        }

        return ResponseEntity.ok(module);  
    }

 
    @GetMapping
    public ResponseEntity<Iterable<StudyModules>> getAllModules() {
        Iterable<StudyModules> modules = moduleRepository.findAll();
        return ResponseEntity.ok(modules);
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<StudyModules> getModuleByCode(@PathVariable String code) {
        StudyModules module = moduleRepository.findByCode(code); 
        if (module == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(module);
    }

    @GetMapping("/search")
    public ResponseEntity<List<StudyModules>> searchModulesByTitle(@RequestParam("title") String title) {
        List<StudyModules> modules = moduleRepository.findByTitleContainingIgnoreCase(title);
        return ResponseEntity.ok(modules);
    }

}

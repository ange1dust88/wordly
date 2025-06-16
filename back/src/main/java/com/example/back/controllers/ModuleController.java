package com.example.back.controllers;

import com.example.back.models.StudyModules;
import com.example.back.models.Words;
import com.example.back.repositories.StudyModulesRepository;
import com.example.back.repositories.WordsRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {

    private final StudyModulesRepository moduleRepository;
    private final WordsRepository wordRepository;

    public ModuleController(StudyModulesRepository moduleRepository, WordsRepository wordRepository) {
        this.moduleRepository = moduleRepository;
        this.wordRepository = wordRepository;
    }

    @PostMapping
    public ResponseEntity<StudyModules> createModule(@RequestBody StudyModules module) {
        try {
            module = moduleRepository.save(module);

            for (Words word : module.getWords()) {
                word.setModule(module);
                wordRepository.save(word);
            }

            return ResponseEntity.ok(module); 

        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);  
        }
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
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.ok(module); 
    }

    
    @GetMapping("/search")
    public ResponseEntity<List<StudyModules>> searchModulesByTitle(@RequestParam("title") String title) {
        List<StudyModules> modules = moduleRepository.findByTitleContainingIgnoreCase(title);
        return ResponseEntity.ok(modules);  
    }
}

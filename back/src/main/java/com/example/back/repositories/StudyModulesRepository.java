package com.example.back.repositories;

import com.example.back.models.StudyModules;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyModulesRepository extends JpaRepository<StudyModules, Long> {
    StudyModules findByCode(String code);  
    List<StudyModules> findByAuthor(String author);
}

package com.example.back.repositories;
import com.example.back.models.Words;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordsRepository extends JpaRepository<Words, Long> {
   
}
package com.example.back.models;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Words {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String term;
    private String definition;


    @ManyToOne
    @JoinColumn(name = "module_id", nullable = false)  
    @JsonBackReference  
    private StudyModules module;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public String getDefinition() {
        return definition;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }

    public StudyModules getModule() {
        return module;
    }

    public void setModule(StudyModules module) {
        this.module = module;
    }
}

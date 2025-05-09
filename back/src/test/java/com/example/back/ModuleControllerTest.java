package com.example.back;

import com.example.back.controllers.ModuleController;
import com.example.back.models.StudyModules;
import com.example.back.models.Words;
import com.example.back.repositories.StudyModulesRepository;
import com.example.back.repositories.WordsRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.Mockito.*;

@WebMvcTest(ModuleController.class)
@AutoConfigureMockMvc(addFilters = false)
class ModuleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudyModulesRepository moduleRepository;

    @MockBean
    private WordsRepository wordRepository;

    @Test
    void createModule_returnsCreated() throws Exception {

        StudyModules module = new StudyModules();
        module.setTitle("Test Module");

        Words word1 = new Words();
        word1.setTerm("Test Term 1");
        word1.setDefinition("Test Definition 1");

        Words word2 = new Words();
        word2.setTerm("Test Term 2");
        word2.setDefinition("Test Definition 2");

        module.setWords(List.of(word1, word2));

        when(moduleRepository.save(any(StudyModules.class))).thenReturn(module);
        when(wordRepository.save(any(Words.class))).thenReturn(word1).thenReturn(word2);

        String moduleJson = """
            {
              "title": "Test Module",
              "words": [
                {"term": "Test Term 1", "definition": "Test Definition 1"},
                {"term": "Test Term 2", "definition": "Test Definition 2"}
              ]
            }
        """;

        mockMvc.perform(post("/api/modules")
                .contentType(MediaType.APPLICATION_JSON)
                .content(moduleJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Module"))
                .andExpect(jsonPath("$.words[0].term").value("Test Term 1"))
                .andExpect(jsonPath("$.words[0].definition").value("Test Definition 1"))
                .andExpect(jsonPath("$.words[1].term").value("Test Term 2"))
                .andExpect(jsonPath("$.words[1].definition").value("Test Definition 2"));

        verify(moduleRepository, times(1)).save(any(StudyModules.class));
        verify(wordRepository, times(2)).save(any(Words.class));
    }

    @Test
    void getAllModules_returnsModules() throws Exception {
        StudyModules module1 = new StudyModules();
        module1.setTitle("Module 1");
        StudyModules module2 = new StudyModules();
        module2.setTitle("Module 2");

        List<StudyModules> modules = List.of(module1, module2);
        when(moduleRepository.findAll()).thenReturn(modules);

        mockMvc.perform(get("/api/modules"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Module 1"))
                .andExpect(jsonPath("$[1].title").value("Module 2"));
    }

    @Test
    void getModuleByCode_returnsModule() throws Exception {
        StudyModules module = new StudyModules();
        module.setTitle("Test Module");
        module.setCode("1234");

        when(moduleRepository.findByCode("1234")).thenReturn(module);

        mockMvc.perform(get("/api/modules/code/1234"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Module"))
                .andExpect(jsonPath("$.code").value("1234"));
    }

    @Test
    void searchModulesByTitle_returnsModules() throws Exception {
        StudyModules module1 = new StudyModules();
        module1.setTitle("Test Module 1");
        StudyModules module2 = new StudyModules();
        module2.setTitle("Test Module 2");

        List<StudyModules> modules = List.of(module1, module2);
        when(moduleRepository.findByTitleContainingIgnoreCase("test")).thenReturn(modules);

        mockMvc.perform(get("/api/modules/search?title=test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Test Module 1"))
                .andExpect(jsonPath("$[1].title").value("Test Module 2"));
    }
}

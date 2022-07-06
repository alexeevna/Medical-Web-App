package com.app.medicalwebapp.controllers;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest(properties = {"postgres.port=1111"})
@AutoConfigureMockMvc
@WithUserDetails(value = "userTest")
class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void getAllByUsernameWithoutUsername() throws Exception {
        this.mockMvc.perform(get("/api/search/all/username"))
                .andDo(print())
                .andExpect(authenticated())
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
    }

    @Test
    void getOneByUsernameWithUsername() throws Exception {
        this.mockMvc.perform(get("/api/search/all/username").param("username", "daniel"))
                .andDo(print())
                .andExpect(authenticated())
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
    }

    @Test
    void getAllByUsernameAndRoleWithoutUsername() throws Exception {
        this.mockMvc.perform(get("/api/search/username").param("role", "Врач"))
                .andDo(print())
                .andExpect(authenticated())
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
    }

    @Test
    void getOneByUsernameAndRoleWithUsername() throws Exception {
        this.mockMvc.perform(get("/api/search/username").param("username", "daniel")
                        .param("role", "Пользователь"))
                .andDo(print())
                .andExpect(authenticated())
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
    }

    @Test
    void getAllByInitials() throws Exception {
        this.mockMvc.perform(get("/api/search/all/initials").param("initials", "Шехаде Даниэль"))
                .andDo(print())
                .andExpect(authenticated())
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
    }

    @Test
    void getAllByInitialsAndRole() throws Exception {
        this.mockMvc.perform(get("/api/search/initials").param("initials", "Шехаде Даниэль")
                        .param("role", "Пользователь"))
                .andDo(print())
                .andExpect(authenticated())
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
    }
}
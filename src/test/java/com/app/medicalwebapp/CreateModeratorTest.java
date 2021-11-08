package com.app.medicalwebapp;

import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@SpringBootTest(properties = {"postgres.port=5555"})
public class CreateModeratorTest {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;
    @Test
    public void createModer() {
        if (!userRepository.existsByUsername("moderator")) {
            User user = new User();
            user.setUsername("moderator");
            user.setRole("Модератор");
            user.setPassword(encoder.encode("moderator"));
            user.setStatus(0);
            user.setRate(0);
            user.setRegisteredDate(LocalDateTime.now());
            userRepository.save(user);
        }
    }
}

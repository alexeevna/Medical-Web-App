package com.app.medicalwebapp;

import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.LocalDateTime;

@SpringBootTest(properties = {"postgres.port=1111"})
public class FillingTestingDataBaseTest {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Test
    public void filling() {
        if (!userRepository.existsByUsername("userTest")) {
            User user = new User();
            user.setUsername("userTest");
            user.setRole("Пользователь");
            user.setPassword(encoder.encode("userTest"));
            user.setStatus(0);
            user.setRate(0);
            user.setRegisteredDate(LocalDateTime.now());
            userRepository.save(user);
        }

        if(!userRepository.existsByUsername("daniel")){
            User user = new User();
            user.setUsername("daniel");
            user.setInitials("Шехаде Даниэль");
            user.setFirstname("Даниэль");
            user.setLastname("Шехаде");
            user.setRole("Пользователь");
            user.setPassword(encoder.encode("daniel"));
            user.setStatus(0);
            user.setRate(0);
            user.setRegisteredDate(LocalDateTime.now());

            userRepository.save(user);
        }

        if(!userRepository.existsByUsername("daniel")){
            User user = new User();
            user.setUsername("daniel");
            user.setInitials("Шехаде Даниэль");
            user.setFirstname("Даниэль");
            user.setLastname("Шехаде");
            user.setRole("Пользователь");
            user.setPassword(encoder.encode("daniel"));
            user.setStatus(0);
            user.setRate(0);
            user.setRegisteredDate(LocalDateTime.now());
            userRepository.save(user);
        }

        if(!userRepository.existsByUsername("irina")){
            User user = new User();
            user.setUsername("irina");
            user.setInitials("Шеремет Ирина");
            user.setFirstname("Ирина");
            user.setLastname("Шеремет");
            user.setRole("Врач");
            user.setPassword(encoder.encode("irina"));
            user.setStatus(0);
            user.setRate(0);
            user.setRegisteredDate(LocalDateTime.now());
            userRepository.save(user);
        }

        if(!userRepository.existsByUsername("slava")){
            User user = new User();
            user.setUsername("slava");
            user.setInitials("Латохин Святослав");
            user.setFirstname("Святослав");
            user.setLastname("Латохин");
            user.setPatronymic("Алексеевич");
            user.setRole("Врач");
            user.setPassword(encoder.encode("slava"));
            user.setStatus(0);
            user.setRate(0);
            user.setRegisteredDate(LocalDateTime.now());
            userRepository.save(user);
        }
    }
}

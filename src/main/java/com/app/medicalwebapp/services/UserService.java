package com.app.medicalwebapp.services;

import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAll() {
        return userRepository.findByRoleNotLikeOrderByInitialsAsc("Модератор");
    }

    public Optional<User> getOneByUsername(String username) {
        return userRepository.findByUsernameAndRoleNotLike(username, "Модератор");
    }

    public Optional<User> getOneByUsernameAndRole(String username, String role) {
        return userRepository.findByUsernameAndRole(username, role);
    }

    public List<User> getByInitials(String initials) {
        return userRepository.findByInitialsContainingAndRoleNotLikeOrderByInitialsAscAllIgnoreCase(initials, "Модератор");
    }

    public List<User> getAllByRole(String role) {
        return userRepository.findByRoleOrderByInitialsAsc(role);
    }

    public List<User> getByInitialsAndRole(String initials, String role) {
        return userRepository.findByInitialsContainingAndRoleOrderByInitialsAscAllIgnoreCase(initials, role);
    }

    public User getById(Long id) {
        return userRepository.getOne(id);
    }

    public User save(User user) {
        return userRepository.save(user);
    }
}
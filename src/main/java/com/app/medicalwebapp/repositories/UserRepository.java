package com.app.medicalwebapp.repositories;

import com.app.medicalwebapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameAndRoleNotLike(String username, String role);

    Optional<User> findByUsernameAndRole(String username, String role);

    List<User> findByRoleOrderByInitialsAsc(String role);

    List<User> findByRoleNotLikeOrderByInitialsAsc(String role);

    Boolean existsByUsername(String username);

    List<User> findByInitialsContainingAndRoleNotLikeOrderByInitialsAscAllIgnoreCase(String initials, String role);

    List<User> findByInitialsContainingAndRoleOrderByInitialsAscAllIgnoreCase(String initials, String role);

}

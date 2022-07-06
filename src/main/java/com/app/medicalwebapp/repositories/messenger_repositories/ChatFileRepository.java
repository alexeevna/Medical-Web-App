package com.app.medicalwebapp.repositories.messenger_repositories;

import com.app.medicalwebapp.model.messenger_models.ChatFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatFileRepository extends JpaRepository<ChatFile, Long> {
}

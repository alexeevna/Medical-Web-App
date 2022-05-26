package com.app.medicalwebapp.repositories.messengerRepositories;

import com.app.medicalwebapp.model.messengerModels.ChatFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatFileRepository extends JpaRepository<ChatFile, Long> {
}

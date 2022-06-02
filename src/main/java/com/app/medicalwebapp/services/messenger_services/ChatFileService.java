package com.app.medicalwebapp.services.messenger_services;

import com.app.medicalwebapp.model.messenger_models.ChatFile;
import com.app.medicalwebapp.repositories.messenger_repositories.ChatFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatFileService {
    @Autowired
    ChatFileRepository chatFileRepository;

    public ChatFile save(ChatFile file) {
        return chatFileRepository.save(file);
    }
}

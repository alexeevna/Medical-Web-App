package com.app.medicalwebapp.services.messengerServices;

import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.model.messengerModels.ChatFile;
import com.app.medicalwebapp.repositories.messengerRepositories.ChatFileRepository;
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

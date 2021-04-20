package com.app.medicalwebapp.services;

import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.repositories.FileObjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class FileObjectService {

    @Autowired
    FileObjectRepository fileObjectRepository;

    // 1) save file to downstream system
    // 2) if no exception thrown then the file was saved successfully

    public List<FileObject> getAllFilesForUser(Long userId) {
        return fileObjectRepository.findByOwner(userId);
    }

    public List<FileObject> getAllFileObjects() {
        return fileObjectRepository.findAll();
    }

    public FileObject saveFileObject(FileObject fileObject) {
        return fileObjectRepository.save(fileObject);
    }
}

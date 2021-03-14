package com.app.medicalwebapp.services;

import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.repositories.FileObjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FileObjectService {

    @Autowired
    FileObjectRepository fileObjectRepository;

    public List<FileObject> getAllFileObjects() {
        return fileObjectRepository.findAll();
    }

    public FileObject saveRecord(FileObject fileObject) {
        return fileObjectRepository.save(fileObject);
    }

}

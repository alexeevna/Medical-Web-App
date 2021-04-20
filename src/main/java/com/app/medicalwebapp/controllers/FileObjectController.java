package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.repositories.FileObjectRepository;
import com.app.medicalwebapp.security.data.UserDetailsImpl;
import com.app.medicalwebapp.security.data.response.MessageResponse;
import com.app.medicalwebapp.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/files")
public class FileObjectController {

    @Autowired
    FileObjectRepository fileObjectRepository;

    @Autowired
    FileService fileService;

    UserDetailsImpl getAuthenticatedUser() {
        return (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @GetMapping("{username}")
    public ResponseEntity<?> getAllFilesForUser(@PathVariable String username) {
        if (username.equals(getAuthenticatedUser().getUsername())) {
            return ResponseEntity.ok(fileObjectRepository.findByOwner(getAuthenticatedUser().getId()));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Нет прав доступа к этому контенту"));
    }


    @PostMapping("/upload")
    public ResponseEntity<?> uploadFiles(@RequestParam("files") MultipartFile[] files) {
        try {
            List<String> fileNames = new ArrayList<>();

            for (MultipartFile file: files) {
                fileService.saveFile(file.getOriginalFilename(), file.getBytes(), getAuthenticatedUser().getId());
                fileNames.add(file.getOriginalFilename());
            }

            return ResponseEntity.ok().body(new MessageResponse("Успешно загружены файлы: " + fileNames));
        } catch (Exception e) {
            return ResponseEntity.ok().body(new MessageResponse("Ошибка при загрузке файлов"));
        }
    }

//    @GetMapping("/files")
//    public ResponseEntity<List<FileInfo>> getListFiles() {
//        List<FileInfo> fileInfos = storageService.loadAll().map(path -> {
//            String filename = path.getFileName().toString();
//            String url = MvcUriComponentsBuilder
//                    .fromMethodName(FilesController.class, "getFile", path.getFileName().toString()).build().toString();
//
//            return new FileInfo(filename, url);
//        }).collect(Collectors.toList());
//
//        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
//    }
}

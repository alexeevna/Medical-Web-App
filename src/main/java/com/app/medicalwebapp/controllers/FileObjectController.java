package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.exceptions.FileNotExistsException;
import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.repositories.FileObjectRepository;
import com.app.medicalwebapp.security.data.UserDetailsImpl;
import com.app.medicalwebapp.security.data.response.MessageResponse;
import com.app.medicalwebapp.services.FileService;
import org.apache.http.entity.ContentType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/files")
public class FileObjectController {

    Logger log = LoggerFactory.getLogger(FileObjectController.class);

    @Autowired
    FileObjectRepository fileObjectRepository;

    @Autowired
    FileService fileService;

    UserDetailsImpl getAuthenticatedUser() {
        return (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }


    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            log.info("Got request to upload file");

            System.out.println(file.getOriginalFilename());
            fileService.saveFile(file.getOriginalFilename(), file.getBytes(), getAuthenticatedUser().getId());

            return ResponseEntity.ok().body(new MessageResponse("Успешно загружены файлы: " + file.getOriginalFilename()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new MessageResponse("Ошибка при загрузке файлов"));
        }
    }

    @GetMapping("{username}")
    public ResponseEntity<?> getAllFilesForUser(@PathVariable String username) {
        if (username.equals(getAuthenticatedUser().getUsername())) {
            List<FileObject> filesInfo = fileObjectRepository.findByOwner(getAuthenticatedUser().getId());
            filesInfo.stream().forEach(fileInfo -> fileInfo.setDownloadLink(
                    MvcUriComponentsBuilder
                            .fromMethodName(FileObjectController.class, "downloadFile", fileInfo.getId())
                            .build().toString()
            ));
            return ResponseEntity.ok().body(filesInfo);
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Нет прав доступа к этому контенту"));
    }

    @GetMapping("test/{username}")
    public ResponseEntity<?> getFilesList(@PathVariable String username) {
        if (username.equals(getAuthenticatedUser().getUsername())) {
            List<FileObject> filesInfo = fileObjectRepository.findByOwner(getAuthenticatedUser().getId());
            filesInfo.stream().forEach(fileInfo -> fileInfo.setDownloadLink(
                    MvcUriComponentsBuilder
                            .fromMethodName(FileObjectController.class, "downloadFile", fileInfo.getId())
                            .build().toString()
            ));
            return ResponseEntity.ok().body(filesInfo);
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Нет прав доступа к этому контенту"));
    }

    @GetMapping("download/{fileId}")
    public ResponseEntity<?> downloadFile(@PathVariable Long fileId) {
        try {
            log.info("Received request to download file");
            FileObject fileObject = fileObjectRepository.findById(fileId).orElseThrow(FileNotExistsException::new);
//            System.out.println(fileObject.getOwner());
//            System.out.println(fileObject.getOwner().equals(getAuthenticatedUser().getId()));
            if (getAuthenticatedUser() == null || !fileObject.getOwner().equals(getAuthenticatedUser().getId())) {
                throw new AuthorizationServiceException("User is not authorized to download this file");
            }
            byte[] fileContent = fileService.extractFile(fileObject);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileObject.getInitialName() + "\"")
                    .header(HttpHeaders.CONTENT_TYPE, "application/octet-stream")
                    .body(fileContent);
        } catch (AuthorizationServiceException ex) {
            ex.printStackTrace();
            return ResponseEntity.badRequest().body(new MessageResponse("Нет прав доступа к этому контенту"));
        } catch (Exception ex) {
            log.error("Download of file failed");
            ex.printStackTrace();
            return ResponseEntity.badRequest().body(new MessageResponse("Ошибка при скачивании файла"));
        }
    }
}

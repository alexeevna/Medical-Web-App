package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.controllers.requestbody.MessageResponse;
import com.app.medicalwebapp.controllers.requestbody.RecordCreationRequest;
import com.app.medicalwebapp.controllers.requestbody.RecordsPageResponse;
import com.app.medicalwebapp.security.UserDetailsImpl;
import com.app.medicalwebapp.services.RecordService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 604800)
@RestController
@RequestMapping("/api/records")
public class RecordController {

    Logger log = LoggerFactory.getLogger(RecordController.class);

    @Autowired
    RecordService recordService;

    @GetMapping("/all/root")
    public ResponseEntity<?> getAllRootRecords(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Long topicId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        try {
            log.info("title: {}, topicId: {}, page: {}, size: {}", title, topicId, page, size);
            RecordsPageResponse responseBody;
            if (topicId == null) {
                responseBody = recordService.getRecordsPage(page, size, title);
            } else {
                responseBody = recordService.getRecordsPageByTopic(page, size, topicId);
            }
            return ResponseEntity.ok().body(responseBody);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/{recordId}")
    public ResponseEntity<?> getRecord(@PathVariable Long recordId) {
        try {
            return ResponseEntity.ok().body(recordService.getRecordById(recordId));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/answers/{recordId}")
    public ResponseEntity<?> getAllRecords(@PathVariable Long recordId) {
        try {
            return ResponseEntity.ok().body(recordService.getRecordsAnswers(recordId));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> saveRecord(@Valid @RequestBody RecordCreationRequest request) {
        try {
            recordService.saveRecord(request, getAuthenticatedUserId(), request.getParentId());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.ok().build();
    }



    private Long getAuthenticatedUserId() {
        UserDetailsImpl principal = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal != null ? principal.getId() : null;
    }

}

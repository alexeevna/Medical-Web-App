package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.controllers.requestbody.PipelineCreationRequest;
import com.app.medicalwebapp.model.Pipeline;
import com.app.medicalwebapp.repositories.PipelineRepository;
import com.app.medicalwebapp.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 604800)
@RestController
@RequestMapping("/api/pipelines")
public class PipelineController {

    @Autowired
    PipelineRepository pipelineRepository;

    @GetMapping("/all")
    public ResponseEntity<?> getAllPipelines() {
        List<Pipeline> pipelines = pipelineRepository.findAll();
        return ResponseEntity.ok().body(pipelines);
    }

    @PostMapping("/save")
    public void saveNewConfiguration(@RequestBody PipelineCreationRequest request) {
        Pipeline pipeline = new Pipeline();
        pipeline.setCreator(getAuthenticatedUserId());
        pipeline.setCreationTime(LocalDateTime.now());
        pipeline.setJsonConfig(request.getJsonConfiguration());
        pipeline.setIsPublic(true);
        pipeline.setDescription(request.getDescription());
        pipelineRepository.save(pipeline);
    }

    private Long getAuthenticatedUserId() {
        UserDetailsImpl principal = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal != null ? principal.getId() : null;
    }

}

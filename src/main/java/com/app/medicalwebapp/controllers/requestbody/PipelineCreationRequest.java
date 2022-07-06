package com.app.medicalwebapp.controllers.requestbody;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class PipelineCreationRequest {

    @NotBlank
    private String jsonConfiguration;

    @NotBlank
    private String description;

}

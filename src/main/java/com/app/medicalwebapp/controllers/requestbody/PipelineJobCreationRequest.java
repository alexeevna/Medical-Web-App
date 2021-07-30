package com.app.medicalwebapp.controllers.requestbody;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class PipelineJobCreationRequest {

    @NotNull
    private Long pipelineId;

    @NotNull
    private Long fileId;
}

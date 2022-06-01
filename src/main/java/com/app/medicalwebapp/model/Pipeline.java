package com.app.medicalwebapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name="pipelines")
public class Pipeline {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "json_config", length = 15000)
    @JsonIgnore
    private String jsonConfig;

    @Column(name = "description")
    private String description;

    @Column(name = "input_format")
    private FileObjectFormat inputFormat;

    @Column(name = "output_format")
    private FileObjectFormat outputFormat;

    @Column(name = "creator")
    private Long creator;

    @Column(name = "is_public")
    private Boolean isPublic;

    @Column(name = "creation_time")
    private LocalDateTime creationTime;
}

package com.app.medicalwebapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "files")
public class FileObject {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "initial_name")
    private String initialName;

    @JsonIgnore
    @Column(name = "format")
    private FileObjectFormat format;

    @JsonIgnore
    @Column(name = "path_to_file")
    private String pathToFile;

    @Column(name = "owner")
    private Long owner;

    @Column(name = "creation_time")
    private LocalDateTime creationTime;

    @Column(name = "size")
    private Integer size;

    @Transient
    private String downloadLink;
}

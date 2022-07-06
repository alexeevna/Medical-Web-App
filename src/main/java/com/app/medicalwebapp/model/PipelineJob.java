package com.app.medicalwebapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "pipeline_jobs")
public class PipelineJob {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "mirf_session_id")
    @JsonIgnore
    private String mirfSessionid;

    @ManyToOne
    @JoinColumn(name="creator_id", nullable=false)
    @JsonIgnore
    private User creator;

    @ManyToOne
    @JoinColumn(name="pipeline_id", nullable=false)
    private Pipeline pipeline;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private PipelineJobStatus executionStatus;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "pipeline_to_file",
            joinColumns = { @JoinColumn(name = "pipelinejob_id") },
            inverseJoinColumns = { @JoinColumn(name = "file_id") }
    )
    private List<FileObject> inputFiles = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="output_file_id", nullable=true)
    private FileObject outputFile;

    @Column(name = "start_time")
    private LocalDateTime startedTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;


}

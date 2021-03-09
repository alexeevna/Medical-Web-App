package com.app.medicalwebapp.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "pipeline_jobs")
public class PipelineJob {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="creator_id", nullable=false)
    private User creator;

    @ManyToOne
    @JoinColumn(name="pipeline_id", nullable=false)
    private Pipeline pipeline;

    @ManyToOne
    @JoinColumn(name="input_file_id", nullable=false)
    private FileObject inputFile;

    @ManyToOne
    @JoinColumn(name="output_file_id", nullable=true)
    private FileObject outputFile;

    @Column(name = "start_time")
    private LocalDateTime startedTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;


}

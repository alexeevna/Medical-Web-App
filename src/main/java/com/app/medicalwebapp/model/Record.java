package com.app.medicalwebapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
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
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="records")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

    @Column(name="parent")
    private Long parent;

    @Column(name="content")
    private String content;

    @ManyToOne
    @JoinColumn(name="creator", nullable=false)
    private User creator;

    @Column(name="likes")
    private Integer likes;

    @Column(name="creation_time")
    private LocalDateTime creationTime;

    @Column(name="edited")
    private Boolean edited;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "record_to_topic",
            joinColumns = { @JoinColumn(name = "record_id") },
            inverseJoinColumns = { @JoinColumn(name = "topic_id") }
    )
    Set<Topic> topics = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "record_to_file",
            joinColumns = { @JoinColumn(name = "record_id") },
            inverseJoinColumns = { @JoinColumn(name = "file_id") }
    )
    Set<FileObject> attachments = new HashSet<>();
}

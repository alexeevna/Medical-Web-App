package com.app.medicalwebapp.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="topics")
@Data
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "creator_id")
    private Long creator;

    @Column(name = "creation_time")
    private LocalDateTime creationTime;

//    @ManyToMany(mappedBy = "topics", fetch = FetchType.EAGER)
//    private Set<Record> records = new HashSet<>();
}

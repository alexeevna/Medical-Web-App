package com.app.medicalwebapp.model.messenger_models;

import com.app.medicalwebapp.model.FileObjectFormat;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "chatfiles")
public class ChatFile {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "fileName")
    private String fileName;

    @Column(name = "fileContent")
    private byte[] fileContent;

    @Column(name = "format")
    @Enumerated(EnumType.STRING)
    private FileObjectFormat format;
}

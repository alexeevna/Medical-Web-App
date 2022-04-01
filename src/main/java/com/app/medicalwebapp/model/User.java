package com.app.medicalwebapp.model;

//import com.app.medicalwebapp.model.mesages.Contact;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@DynamicUpdate
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "patronymic")
    private String patronymic;

    @Column(name = "initials")
    private String initials;

    @JsonIgnore
    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private String role;

    @Column(name = "registered_date")
    private LocalDateTime registeredDate;

    @Column(name = "status")
    private Integer status;

    @Column(name = "rate")
    private Integer rate;

    @Column(name = "active")
    private Active active;

//    @ManyToMany
//    @JoinTable(
//            name = "contacts_users",
//            joinColumns = @JoinColumn(name = "contact_id"),
//            inverseJoinColumns = @JoinColumn(name = "user_id")
//    )
//    private List<User> contactsList;

//    @ManyToOne(targetEntity = Contact.class, cascade = CascadeType.ALL)
//    @JoinColumn(name = "cont")
//    private Contact contacts;


//
//    @OneToMany
//    @JoinTable(
//            name = "inner_table",
//            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")}
//    )
//    @Column(name = "contacts")
//    private List<User> contacts;
}


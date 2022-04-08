package com.app.medicalwebapp.model.mesages;

import com.app.medicalwebapp.model.User;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "contacts")
@Data
@DynamicUpdate
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "contactsOwner")
    private String contactsOwner;

//    @CollectionTable(
//            name = "CONTACTS_TABLE",
//            joinColumns = @JoinColumn(name = "user_id")
//    )
//    @Column(name = "contactsList")
//    @OneToMany(mappedBy = "contacts")
//    private List<User> contactsList;

    @ManyToMany
    @JoinTable(
            name = "contacts_users",
            joinColumns = @JoinColumn(name = "contact_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> contactsList;

}

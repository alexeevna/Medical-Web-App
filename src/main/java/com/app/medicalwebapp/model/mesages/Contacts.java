package com.app.medicalwebapp.model.mesages;

import com.app.medicalwebapp.model.User;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "contacts")
@Data
@DynamicUpdate
public class Contacts {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "contacts_id")
    private Long id;

    @Column(name = "contactsOwner")
    private String contactsOwner;

    //    @CollectionTable(
//            name="CONTACTS_TABLE",
//            joinColumns=@JoinColumn(name="id")
//    )
    @Column(name = "contactsList")
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "contacts")
    private List<User> contactsList;

}

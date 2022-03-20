package com.app.medicalwebapp.model.mesages;

import com.app.medicalwebapp.model.User;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Map;

@Entity
@Table(name = "contacts")
@Data
@DynamicUpdate
public class Contacts {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    public Map<String, User> strings;
}

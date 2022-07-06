package com.app.medicalwebapp.security;

import com.app.medicalwebapp.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String username;
    @JsonIgnore
    private String password;
    private Collection<? extends GrantedAuthority> authorities;
    private String initials;
//    private String mobilePhone;
    private int rate;
    private int status;
    private LocalDateTime registeredDate;


    public UserDetailsImpl(Long id, String username, String password, Collection<? extends GrantedAuthority> authorities,
                           int rate, int status, LocalDateTime registeredDate, String initials) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.authorities = authorities;
        this.initials = initials;
//        this.mobilePhone = mobilePhone;
        this.rate = rate;
        this.status = status;
        this.registeredDate = registeredDate;
    }

    public static UserDetailsImpl build(User user) {

        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getRole()));

        return new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                authorities,
//                user.getRealName(),
//                user.getMobilePhone(),
                user.getRate(),
                user.getStatus(),
                user.getRegisteredDate(),
                user.getInitials()
        );
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public long getId(){
        return this.id;
    }

}

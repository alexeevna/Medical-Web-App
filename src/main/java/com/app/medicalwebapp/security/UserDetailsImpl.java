package com.app.medicalwebapp.security;

import com.app.medicalwebapp.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

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
    private String realName;
    private String mobilePhone;
    private int rate;
    private int status;


    public UserDetailsImpl(Long id, String username, String password, Collection<? extends GrantedAuthority> authorities,
                           int rate, int status) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.authorities = authorities;
//        this.realName = realName;
//        this.mobilePhone = mobilePhone;
        this.rate = rate;
        this.status = status;
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
                user.getStatus());
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

package com.app.medicalwebapp.controllers;


import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.repositories.UserRepository;
import com.app.medicalwebapp.security.data.UserDetailsImpl;
import com.app.medicalwebapp.security.data.request.SignInRequest;
import com.app.medicalwebapp.security.data.request.SignUpRequest;
import com.app.medicalwebapp.security.data.response.JwtResponse;
import com.app.medicalwebapp.security.data.response.MessageResponse;
import com.app.medicalwebapp.security.jwt.JwtHelper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtHelper jwtHelper;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody SignInRequest signInRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtHelper.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                roles,
                userDetails.getRealName(),
                userDetails.getMobilePhone(),
                userDetails.getRate(),
                userDetails.getStatus()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("This username is already taken."));
        }

        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setRole(signUpRequest.getChosenRole());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        user.setRealName(signUpRequest.getRealName());
        user.setMobilePhone(signUpRequest.getMobilePhone());
        user.setStatus(0);
        user.setRate(0);

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User has been successfully registered"));
    }
}


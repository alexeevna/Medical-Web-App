package com.app.medicalwebapp.security;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("#username == authentication.principal.username")
public @interface AuthorizedWithUsername {}
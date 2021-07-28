package com.app.medicalwebapp.exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ObjectNotExistsException extends Exception {

    public ObjectNotExistsException(String message)
    {
        super(message);
    }
}

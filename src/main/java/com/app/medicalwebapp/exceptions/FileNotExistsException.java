package com.app.medicalwebapp.exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class FileNotExistsException extends Exception {

    public FileNotExistsException(String message)
    {
        super(message);
    }
}

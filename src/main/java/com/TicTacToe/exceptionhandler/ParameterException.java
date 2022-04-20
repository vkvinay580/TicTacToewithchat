package com.TicTacToe.exceptionhandler;

public class ParameterException extends Exception {

    private String message;

    public ParameterException(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}

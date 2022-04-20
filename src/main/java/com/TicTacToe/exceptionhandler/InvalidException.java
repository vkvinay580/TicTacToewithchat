package com.TicTacToe.exceptionhandler;

public class InvalidException extends Exception {
    private String message;

    public InvalidException(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}

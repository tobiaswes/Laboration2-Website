package it.ha.ax.laboration2website;

import lombok.Getter;

@Getter
public class ResponseMessage {
    private String message;

    public ResponseMessage(String message) {
        this.message = message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

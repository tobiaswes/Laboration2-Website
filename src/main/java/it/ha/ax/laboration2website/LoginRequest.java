package it.ha.ax.laboration2website;

import lombok.Getter;

@Getter
public class LoginRequest {
    // Getters and setters
    private String username;
    private String password;

    public void setUsername(String username) { this.username = username; }

    public void setPassword(String password) { this.password = password; }
}

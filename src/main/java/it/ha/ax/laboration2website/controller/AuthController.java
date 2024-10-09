package it.ha.ax.laboration2website.controller;

import it.ha.ax.laboration2website.LoginRequest;
import it.ha.ax.laboration2website.service.UserService;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;


    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Login request received for username: " + loginRequest.getUsername());

        boolean valid = userService.validateCredentials(loginRequest.getUsername(), loginRequest.getPassword());

        if (valid) {
            System.out.println("Login successful for username: " + loginRequest.getUsername());
            return ResponseEntity.ok("{\"message\": \"Login successful\"}");
        } else {
            System.out.println("Login failed for username: " + loginRequest.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Invalid credentials\"}");
        }
    }
}


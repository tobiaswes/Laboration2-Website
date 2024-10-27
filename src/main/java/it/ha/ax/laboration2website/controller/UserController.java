package it.ha.ax.laboration2website.controller;

import it.ha.ax.laboration2website.ResponseMessage;
import it.ha.ax.laboration2website.entity.User;
import it.ha.ax.laboration2website.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin // To allow requests from different origins (from your Angular app)
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    // Sign-up endpoint to register a new user
    @PostMapping("/signup")
    public ResponseEntity<?> signUpUser(@RequestBody User user) {
        try {
            // Attempt to register the user
            userService.registerUser(user);
            // Return success message if registration is successful
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("{\"message\": \"Sign-up successful\"}");
        } catch (Exception e) {
            // Return an error message if there is a duplicate username
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"message\": \"" + e.getMessage() + "\"}");
        }
    }
}

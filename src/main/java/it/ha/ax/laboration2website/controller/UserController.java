package it.ha.ax.laboration2website.controller;

import it.ha.ax.laboration2website.entity.User;
import it.ha.ax.laboration2website.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin // To allow requests from different origins (from your Angular app)
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    // Sign-up endpoint
    @PostMapping("/signup")
    public User signUpUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    // Get User by username
    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.findByUsername(username);
    }
}

package it.ha.ax.laboration2website.service;

import it.ha.ax.laboration2website.entity.User;
import it.ha.ax.laboration2website.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    //Registers a new user
    public User registerUser(User user) throws Exception {
        // Check if the username already exists
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            throw new Exception("Username already taken");
        }

        // If the username is available, encode the password and save the user
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }
    //Finds a user by their username
    public Optional<User> findByUsername(String username) {
        System.out.println("Searching for user with username: " + username);
        return userRepository.findByUsername(username);
    }
    // Validates the provided credentials by checking the username and password.
    public boolean validateCredentials(String username, String rawPassword) {
        Optional<User> user = findByUsername(username);
        if (user.isPresent()) {
            System.out.println("User found: " + user.get().getUsername() + ". Checking password...");
            boolean matches = passwordEncoder.matches(rawPassword, user.get().getPassword());
            System.out.println("Password match result: " + matches);
            return matches;
        }
        // If the user does not exist, return false
        System.out.println("User not found: " + username);
        return false;
    }
}

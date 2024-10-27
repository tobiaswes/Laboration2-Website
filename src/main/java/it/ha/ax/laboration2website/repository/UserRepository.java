package it.ha.ax.laboration2website.repository;

import it.ha.ax.laboration2website.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find a user by their username, returning an Optional to handle cases where the user may not exist
    Optional<User> findByUsername(String username);
}

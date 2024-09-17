package it.ha.ax.laboration2website;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class Laboration2WebsiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(Laboration2WebsiteApplication.class, args);
    }

}

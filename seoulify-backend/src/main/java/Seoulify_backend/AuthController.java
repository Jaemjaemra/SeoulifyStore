
package Seoulify_backend;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody Map<String, String> request) {
        
        String name = request.get("name");
        String email = request.get("email");
        String password = request.get("password");

        if (name == null || name.isBlank()
        || email == null || email.isBlank()
        || password == null || password.length() < 8) {
    return ResponseEntity.badRequest()
            .body(Map.of("message",
                    "Name and email are required. Password must have at least 8 characters."));
}

        email = email.trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message",
                            "This email is already registered."));
        }

        User user = new User();
        user.setName(name.trim());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));

        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Account created successfully."));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message",
                            "Email and password are required."));
        }

        User user = userRepository
                .findByEmail(email.trim().toLowerCase())
                .orElse(null);

        if (user == null
                || !passwordEncoder.matches(
                        password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message",
                            "Invalid email or password."));
        }

        return ResponseEntity.ok(Map.of(
                "message", "Login successful.",
                "userId", user.getId(),
                "email", user.getEmail(),
                "points", user.getPoints()
        ));
    }
}

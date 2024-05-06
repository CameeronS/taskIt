package taskIt.example.taskIt.controller;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import taskIt.example.taskIt.dto.LoginDto;
import taskIt.example.taskIt.dto.RegisterDto;
import taskIt.example.taskIt.service.AuthService;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {



    private final AuthService authService;

    @PostMapping(path = "/register")
    public ResponseEntity<?> register( @RequestBody RegisterDto authDTO) {
        return ResponseEntity
                .status(CREATED)
                .body(authService.register(authDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginEmployee(
            @Valid @RequestBody LoginDto authDTO
    ) {
        return new ResponseEntity<>(authService.login(authDTO), OK);
    }



    @GetMapping("/protected")
    public ResponseEntity<?> protectedRoute() {

        return ResponseEntity.ok("Protected route");
    }



}

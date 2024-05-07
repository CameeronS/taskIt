package com.cameerons.taskIt.controller;
import com.cameerons.taskIt.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cameerons.taskIt.requests.LoginRequest;
import com.cameerons.taskIt.requests.RegisterRequest;
import com.cameerons.taskIt.response.LoginResponse;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest, HttpServletResponse response) {
        return ResponseEntity
                .status(CREATED)
                .body(authService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginEmployee(
            @Valid @RequestBody LoginRequest loginRequest
            ) {
        return  ResponseEntity.ok(authService.login(loginRequest));
    }

    @GetMapping("/protected")
    public ResponseEntity<?> protectedRoute() {

        return ResponseEntity.ok("Protected route");
    }



}

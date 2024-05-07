package com.cameerons.taskIt.service;
import com.cameerons.taskIt.modals.Token;
import com.cameerons.taskIt.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.cameerons.taskIt.modals.Role;
import com.cameerons.taskIt.modals.User;
import com.cameerons.taskIt.repository.RoleRepository;
import com.cameerons.taskIt.repository.UserRepository;
import com.cameerons.taskIt.requests.LoginRequest;
import com.cameerons.taskIt.requests.RegisterRequest;
import com.cameerons.taskIt.response.LoginResponse;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {


    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    public String register(RegisterRequest registerRequest) {

        Optional<User> userOptional = userRepository.findByEmail(registerRequest.getEmail());
        if (userOptional.isPresent()) {
            return "User already exists";
        }

        Role role = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

        var user = User.builder()
                .email(registerRequest.getEmail())
                .firstName(registerRequest.getFirstName())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .createdAt(LocalDateTime.now())
                .roles(List.of(role))
                .build();

        userRepository.save(user);
        //sendEmail(user);
        return "Verification email sent to: " + user.getEmail();
    }

    public LoginResponse login  (LoginRequest loginRequest) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );
        var claims = new HashMap<String, Object>();
        var user = ((User)authentication.getPrincipal());
        claims.put("fullName", user.getFirstName());

        var jwt = jwtService.generateToken(user, claims);
        return LoginResponse.builder()
                .token(jwt)
                .build();
    }


    private String generateToken (User user) {
        String generatedToken = generateCode(6);
        var token = Token.builder()
                         .token(generatedToken)
                         .createdAt(LocalDateTime.now())
                         .expiresAt(LocalDateTime.now().plusMinutes(15))
                         .user(user)
                         .build();
        tokenRepository.save(token);
        return generatedToken;
    }

    private String generateCode(int length) {
        String codeChars = "0123456789";
        StringBuilder code = new StringBuilder();
        SecureRandom random = new SecureRandom();
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(codeChars.length());
            code.append(codeChars.charAt(randomIndex));
        }
        return code.toString();
    }


}

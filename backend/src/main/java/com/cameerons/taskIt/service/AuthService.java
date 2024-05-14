package com.cameerons.taskIt.service;
import com.cameerons.taskIt.dto.UserDto;
import com.cameerons.taskIt.modals.Token;
import com.cameerons.taskIt.repository.TokenRepository;
import com.cameerons.taskIt.response.RegisterResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
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

import java.net.HttpCookie;
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
    private final RefreshTokenService refreshTokenService;


    public RegisterResponse register(RegisterRequest registerRequest) {

        Optional<User> userOptional = userRepository.findByEmail(registerRequest.getEmail());
        if (userOptional.isPresent()) {
            return RegisterResponse.builder()
                    .message("Email is already taken")
                    .build();
        }

        Role role = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

        var user = User.builder()
                .email(registerRequest.getEmail())
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .createdAt(LocalDateTime.now())
                .roles(List.of(role))
                .build();

        userRepository.save(user);

        return RegisterResponse.builder()
                .message("User registered successfully")
                .build();

    }

    public LoginResponse login  (LoginRequest loginRequest, HttpServletResponse response) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );
        var claims = new HashMap<String, Object>();
        var user = ((User)authentication.getPrincipal());
        claims.put("fullName", user.getFirstName());
        var jwt = jwtService.generateToken(user, claims);
        var refreshToken = refreshTokenService.createRefreshToken(user.getEmail());

        Cookie cookie = new Cookie("refresh_token", refreshToken.getToken());
        cookie.setMaxAge(60 * 60 * 24 * 7);
        cookie.setPath("/");
        response.addCookie(cookie);

        Cookie jwtCookie = new Cookie("auth_token", jwt);
        jwtCookie.setMaxAge(60 * 60 * 24 * 7);
        jwtCookie.setPath("/");
        response.addCookie(jwtCookie);


        return LoginResponse.builder()
                .token(jwt)
                .refreshToken(refreshToken.getToken())
                .build();
    }

    public UserDto getAuthUser() {
        return null;
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

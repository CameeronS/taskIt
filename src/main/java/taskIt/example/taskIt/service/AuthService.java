package taskIt.example.taskIt.service;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;
import taskIt.example.taskIt.dto.LoginDto;
import taskIt.example.taskIt.dto.RegisterDto;
import taskIt.example.taskIt.enumeration.RoleEnum;
import taskIt.example.taskIt.modals.Role;
import taskIt.example.taskIt.modals.SecurityUser;
import taskIt.example.taskIt.modals.User;
import taskIt.example.taskIt.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {


    private final AuthenticationManager authManager;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public String register(RegisterDto dto) {
        String username = dto.username();

        Optional<User> exists = userRepository.findByUsername(username);

        if (exists.isPresent()) {
            throw new IllegalStateException(username + " exists");
        }

        if (!dto.password().equals(dto.confirmPassword())) {
            throw new IllegalStateException("Passwords do not match");
        }

        var user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(dto.password()));
        user.setEmail(dto.email());
        user.addRole(new Role(RoleEnum.USER));
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        var securityUser = new SecurityUser(user);
        var jwtToken = jwtService.generateToken(securityUser, user.getUsername(), user.getId(), user);


        userRepository.save(user);


        return jwtToken;
    }

    public String login(LoginDto dto) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.email(), dto.password())
        );
        var user = userRepository.findByEmail(dto.email()).orElseThrow(
                () -> new IllegalStateException("User not found")
        );

        return jwtService.generateToken((SecurityUser) authentication.getPrincipal(), user.getUsername(), user.getId(), user);



    }



}

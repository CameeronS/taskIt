package com.cameerons.taskIt.config;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;


@Configuration
@EnableWebSecurity
@AllArgsConstructor
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {

    private final AuthFilter authFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable)
                   .cors(cors -> cors.configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues()))
                   .authorizeHttpRequests(authorizeRequests ->
                           authorizeRequests
                                   .requestMatchers("api/auth/register", "api/auth/login", "api/auth/refresh-token")
                                            .permitAll()
                                            .anyRequest()
                                            .authenticated()
                   )
                   .securityMatchers( (matchers) -> matchers
                           .requestMatchers("api/auth/register", "api/auth/login", "api/auth/refresh-token"))

                   .sessionManagement(sessionManagement ->
                           sessionManagement.sessionCreationPolicy(STATELESS)

                                            )
                   .authenticationProvider(authenticationProvider)
                     .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
                   .build();
    }








}

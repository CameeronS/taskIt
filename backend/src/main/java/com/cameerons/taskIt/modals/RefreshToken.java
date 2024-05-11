package com.cameerons.taskIt.modals;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Table(name = "refresh_token")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class RefreshToken {

        @Id
        @GeneratedValue
        private Integer id;
        private String token;
        private Instant expiresAt;

        @OneToOne
        @JoinColumn(
                name = "user_id",
                nullable = false
        )
        private User user;



}

package taskIt.example.taskIt.modals;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static jakarta.persistence.CascadeType.*;
import static jakarta.persistence.FetchType.EAGER;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;
    private String username;
    @Column(unique = true)
    private String email;
    @JsonIgnore
    private String password;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @JsonIgnore
    @OneToMany(cascade = {PERSIST, MERGE, REMOVE}, fetch = EAGER, mappedBy = "user", orphanRemoval = true)
    private Set<Role> roles = new HashSet<>();

    @JsonIgnore
    @OneToMany(cascade = {PERSIST, MERGE, REMOVE}, fetch = EAGER, mappedBy = "user", orphanRemoval = true)
    private Set<Workspace> workspaces = new HashSet<>();



    public void addRole(Role role) {
        this.roles.add(role);
        role.setUser(this);
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this
                .roles
                .stream() //
                .map(role -> new SimpleGrantedAuthority(role.getRoleEnum().toString()))
                .collect(Collectors.toSet());
    }


}

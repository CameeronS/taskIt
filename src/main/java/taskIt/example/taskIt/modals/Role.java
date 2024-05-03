package taskIt.example.taskIt.modals;

import jakarta.persistence.*;
import lombok.*;
import taskIt.example.taskIt.enumeration.RoleEnum;

@Entity
@Table(name = "user_roles")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Role {


    @Id
    @GeneratedValue
    @Column(name = "role_id", updatable = false, nullable = false)
    private Long roleID;

    @Column(name = "role")
    @Enumerated(value = EnumType.STRING)
    private RoleEnum roleEnum;

    @ManyToOne
    @JoinColumn(
            name = "user_id",
            nullable = false,
            referencedColumnName = "user_id",
            foreignKey = @ForeignKey(name = "role_user_fk")
    )
    private User user;

    public Role(RoleEnum roleEnum) {
        this.roleEnum = roleEnum;
    }
}

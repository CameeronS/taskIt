package com.cameerons.taskIt.modals;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "workspace")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Workspace {

    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false, referencedColumnName = "user_id", foreignKey = @ForeignKey(name = "workspace_user_fk"))
    private User user;

    // A workspace has many tasks
    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL)
    private List<Tasks> tasks;

    // A workspace has many users
    @ManyToMany
    @JoinTable(
            name = "workspace_users",
            joinColumns = @JoinColumn(name = "workspace_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> workspaceUsers;













}

package taskIt.example.taskIt.modals;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Tasks {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // A task belongs to a workspace and a workspace has many tasks
    @ManyToOne
    @JoinColumn(name = "workspace_id", nullable = false, referencedColumnName = "id", foreignKey = @ForeignKey(name = "task_workspace_fk"))
    private Workspace workspace;

    // A task belongs to a user and a user has many tasks
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "user_id", foreignKey = @ForeignKey(name = "task_user_fk"))
    private User user;









}

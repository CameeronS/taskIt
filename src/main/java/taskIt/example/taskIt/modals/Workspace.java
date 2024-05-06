package taskIt.example.taskIt.modals;
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
    private Long id;
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











}

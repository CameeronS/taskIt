package taskIt.example.taskIt.repository;
import org.springframework.data.repository.CrudRepository;
import taskIt.example.taskIt.modals.Workspace;

public interface WorkSpaceRepository extends CrudRepository<Workspace, Long> {
}

package com.cameerons.taskIt.repository;
import org.springframework.data.repository.CrudRepository;
import com.cameerons.taskIt.modals.Workspace;

import java.util.List;

public interface WorkSpaceRepository extends CrudRepository<Workspace, Integer> {
    List<Workspace> findAllByUserId(Integer userId);
}

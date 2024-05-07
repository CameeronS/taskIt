package com.cameerons.taskIt.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.cameerons.taskIt.modals.Tasks;


public interface TaskRepository extends JpaRepository<Tasks, Integer> {
}

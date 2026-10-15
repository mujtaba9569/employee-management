package com.assessment.backend.Repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.assessment.backend.Entity.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

}

package com.assessment.backend.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.assessment.backend.entity.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

}

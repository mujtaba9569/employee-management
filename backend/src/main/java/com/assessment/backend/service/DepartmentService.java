package com.assessment.backend.service;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.assessment.backend.entity.Department;
import com.assessment.backend.repository.DepartmentRepository;
import java.util.List;

@Service
public class DepartmentService {
    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "departments")
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

}

package com.assessment.backend.service;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.assessment.backend.entity.Department;
import com.assessment.backend.repository.DepartmentRepository;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class DepartmentService {
    private final DepartmentRepository departmentRepository;
    private static final Logger log = LoggerFactory.getLogger(DepartmentService.class);

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "departments")
    public List<Department> getAllDepartments() {
        log.info("Loading departments from PostgreSQL");
        return departmentRepository.findAll();
    }

}

package com.assessment.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.assessment.backend.repository.EmployeeRepository;
import com.assessment.backend.dto.EmployeeResponse;
import com.assessment.backend.entity.Employee;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private static final Logger log = LoggerFactory.getLogger(EmployeeService.class);

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Transactional(readOnly = true)
    public List<EmployeeResponse> getEmployeesByDepartment(Long departmentId) {
        log.info("Fetching employees for department ID: {}", departmentId);
        List<Employee> employees = employeeRepository.findByDepartmentId(departmentId);

        return employees.stream()
                .map(employee -> new EmployeeResponse(
                        employee.getId(),
                        employee.getName(),
                        employee.getDepartment().getName()))
                .toList();
    }
}
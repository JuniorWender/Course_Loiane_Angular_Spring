package com.junior.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.junior.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    
}

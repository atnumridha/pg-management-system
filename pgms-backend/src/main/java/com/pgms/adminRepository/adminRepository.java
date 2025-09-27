package com.pgms.adminRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pgms.adminModel.adminModel;

@Repository
public interface adminRepository extends JpaRepository<adminModel, Long> {

}

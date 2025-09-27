package com.pgms.repository;

import com.pgms.model.Allocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AllocationRepository extends JpaRepository<Allocation, Long> {
    List<Allocation> findByTenantId(Long tenantId);
    List<Allocation> findByRoomId(Long roomId);
    List<Allocation> findByStatus(String status);
    List<Allocation> findByStartDateBeforeAndEndDateAfter(LocalDate today1, LocalDate today2);
}

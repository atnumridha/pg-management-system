package com.pgms.service;

import com.pgms.model.Allocation;
import com.pgms.repository.AllocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AllocationService {

    @Autowired
    private AllocationRepository allocationRepository;

    public List<Allocation> getAll() {
        return allocationRepository.findAll();
    }

    public Optional<Allocation> getById(Long id) {
        return allocationRepository.findById(id);
    }

    public List<Allocation> getByTenant(Long tenantId) {
        return allocationRepository.findByTenantId(tenantId);
    }

    public List<Allocation> getByRoom(Long roomId) {
        return allocationRepository.findByRoomId(roomId);
    }

    public List<Allocation> getByStatus(String status) {
        return allocationRepository.findByStatus(status);
    }

    public Allocation create(Allocation allocation) {
        allocation.setStatus("ACTIVE");
        return allocationRepository.save(allocation);
    }

    public Allocation update(Long id, Allocation allocation) {
        allocation.setId(id);
        return allocationRepository.save(allocation);
    }

    public void endAllocation(Long id) {
        allocationRepository.findById(id).ifPresent(a -> {
            a.setStatus("ENDED");
            a.setEndDate(java.time.LocalDate.now());
            allocationRepository.save(a);
        });
    }
}

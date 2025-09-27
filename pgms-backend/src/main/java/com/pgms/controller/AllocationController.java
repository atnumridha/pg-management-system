package com.pgms.controller;

import com.pgms.model.Allocation;
import com.pgms.service.AllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/allocations")
@CrossOrigin(origins = "http://localhost:4200")
public class AllocationController {

    @Autowired
    private AllocationService allocationService;

    @GetMapping
    public List<Allocation> getAll() {
        return allocationService.getAll();
    }

    @GetMapping("/{id}")
    public Allocation getById(@PathVariable Long id) {
        return allocationService.getById(id).orElseThrow();
    }

    @GetMapping("/tenant/{tenantId}")
    public List<Allocation> getByTenant(@PathVariable Long tenantId) {
        return allocationService.getByTenant(tenantId);
    }

    @GetMapping("/room/{roomId}")
    public List<Allocation> getByRoom(@PathVariable Long roomId) {
        return allocationService.getByRoom(roomId);
    }

    @GetMapping("/status/{status}")
    public List<Allocation> getByStatus(@PathVariable String status) {
        return allocationService.getByStatus(status);
    }

    @PostMapping
    public Allocation create(@RequestBody Allocation allocation) {
        return allocationService.create(allocation);
    }

    @PutMapping("/{id}")
    public Allocation update(@PathVariable Long id, @RequestBody Allocation allocation) {
        return allocationService.update(id, allocation);
    }

    @PatchMapping("/{id}/end")
    public void endAllocation(@PathVariable Long id) {
        allocationService.endAllocation(id);
    }
}

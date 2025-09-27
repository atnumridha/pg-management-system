package com.pgms.controller;

import com.pgms.model.Allocation;
import com.pgms.model.Invoice;
import com.pgms.repository.AllocationRepository;
import com.pgms.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/invoices")
@CrossOrigin(origins = "http://localhost:4200")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;
    @Autowired
    private AllocationRepository allocationRepository;

    @PostMapping("/generate")
    public List<Invoice> generateInvoices(@RequestParam int year, @RequestParam int month) {
        List<Allocation> allocations = allocationRepository.findByStatus("ACTIVE");
        List<Invoice> invoices = new java.util.ArrayList<>();
        for (Allocation alloc : allocations) {
            invoices.add(invoiceService.generateMonthlyInvoice(alloc, year, month));
        }
        return invoices;
    }

    @GetMapping
    public List<Invoice> getAll() {
        return invoiceService.getAll();
    }

    @GetMapping("/{id}")
    public Invoice getById(@PathVariable Long id) {
        return invoiceService.getById(id);
    }

    @GetMapping("/tenant/{tenantId}")
    public List<Invoice> getByTenant(@PathVariable Long tenantId) {
        return invoiceService.getByTenant(tenantId);
    }

    @GetMapping("/status/{status}")
    public List<Invoice> getByStatus(@PathVariable String status) {
        return invoiceService.getByStatus(status);
    }

    @PatchMapping("/{id}/status")
    public void updateStatus(@PathVariable Long id, @RequestParam String status) {
        invoiceService.updateStatus(id, status);
    }
}

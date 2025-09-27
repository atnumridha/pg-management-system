package com.pgms.service;

import com.pgms.model.Allocation;
import com.pgms.model.Invoice;
import com.pgms.repository.InvoiceRepository;
import com.pgms.repository.AllocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private AllocationRepository allocationRepository;

    // Generate or get existing invoice for allocation and month/year
    public Invoice generateMonthlyInvoice(Allocation allocation, int year, int month) {
        // avoid duplicates
        Optional<Invoice> existing = invoiceRepository.findByPeriodMonthAndPeriodYear(month, year).stream()
            .filter(inv -> inv.getAllocationId().equals(allocation.getId()))
            .findFirst();
        if (existing.isPresent()) return existing.get();

        Invoice invoice = new Invoice();
        invoice.setTenantId(allocation.getTenantId());
        invoice.setAllocationId(allocation.getId());
        invoice.setPeriodYear(year);
        invoice.setPeriodMonth(month);
        invoice.setIssueDate(LocalDate.now());
        invoice.setDueDate(LocalDate.of(year, month, Math.min(28, allocation.getBillingDayOfMonth())));
        invoice.setSubtotal(allocation.getMonthlyRent());
        invoice.setUtilities(0.0); // optional logic to extend
        invoice.setTaxes(0.0);     // optional logic
        invoice.setDiscount(0.0);
        invoice.setTotalDue(invoice.getSubtotal());
        invoice.setStatus("DUE");
        invoice.setInvoiceNo(generateInvoiceNo(year, month));

        return invoiceRepository.save(invoice);
    }

    private String generateInvoiceNo(int year, int month) {
        // Simple: INV-YYYYMM-HHMMSS
        String yymm = String.format("%04d%02d", year, month);
        return "INV-" + yymm + "-" + System.currentTimeMillis() % 100000;
    }

    public List<Invoice> getAll() {
        return invoiceRepository.findAll();
    }

    public Invoice getById(Long id) {
        return invoiceRepository.findById(id).orElseThrow();
    }

    public List<Invoice> getByTenant(Long tenantId) {
        return invoiceRepository.findByTenantId(tenantId);
    }

    public List<Invoice> getByStatus(String status) {
        return invoiceRepository.findByStatus(status);
    }

    public void updateStatus(Long id, String status) {
        invoiceRepository.findById(id).ifPresent(inv -> {
            inv.setStatus(status);
            invoiceRepository.save(inv);
        });
    }
}

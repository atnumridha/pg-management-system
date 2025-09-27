package com.pgms.controller;

import com.pgms.dto.MetricsSummaryDto;
import com.pgms.repository.*;
import com.pgms.model.Invoice;
import com.pgms.model.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/metrics")
@CrossOrigin(origins = "http://localhost:4200")
public class MetricsController {

    @Autowired private PropertyRepository propertyRepository;
    @Autowired private RoomRepository roomRepository;
    @Autowired private TenantRepository tenantRepository;
    @Autowired private InvoiceRepository invoiceRepository;
    @Autowired private PaymentRepository paymentRepository;

    @GetMapping("/summary")
    public MetricsSummaryDto getSummary() {
        MetricsSummaryDto dto = new MetricsSummaryDto();
        dto.setTotalProperties(propertyRepository.count());
        dto.setTotalRooms(roomRepository.count());
        dto.setTotalTenants(tenantRepository.count());
        dto.setActiveTenants(tenantRepository.findByStatus("ACTIVE").size());
        dto.setVacantRooms(roomRepository.findByStatus("AVAILABLE").size());

        List<Invoice> allInvoices = invoiceRepository.findAll();
        dto.setTotalInvoiced(allInvoices.stream().mapToDouble(Invoice::getTotalDue).sum());
        dto.setDueInvoices(allInvoices.stream().filter(inv -> "DUE".equals(inv.getStatus())).count());
        dto.setOverdueInvoices(allInvoices.stream().filter(inv -> "OVERDUE".equals(inv.getStatus())).count());

        List<Payment> allPayments = paymentRepository.findAll();
        dto.setTotalReceived(allPayments.stream()
                .filter(p -> "SUCCESS".equals(p.getStatus()))
                .mapToDouble(Payment::getAmount)
                .sum());

        return dto;
    }
}

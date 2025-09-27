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
        java.time.LocalDate now = java.time.LocalDate.now();
        int year = now.getYear();
        int month = now.getMonthValue();

        // Invoiced this month
        allInvoices.stream()
            .forEach(i -> System.out.println("INVOICE: id=" + i.getId() + " periodYear=" + i.getPeriodYear() + " periodMonth=" + i.getPeriodMonth() + " totalDue=" + i.getTotalDue()));

        double invoicedThisMonth = allInvoices.stream()
            .filter(i -> i.getPeriodYear() == year && i.getPeriodMonth() == month)
            .mapToDouble(Invoice::getTotalDue)
            .sum();
        System.out.println("InvoicedThisMonth sum=" + invoicedThisMonth + " for year=" + year + " month=" + month);
        dto.setTotalInvoiced(invoicedThisMonth);

        // Due and overdue counts (all time)
        long dueCount = allInvoices.stream().filter(inv -> "DUE".equals(inv.getStatus())).peek(inv -> System.out.println("DUE INVOICE: id=" + inv.getId() + " status=" + inv.getStatus() + " totalDue=" + inv.getTotalDue())).count();
        System.out.println("DueInvoices count=" + dueCount);
        dto.setDueInvoices(dueCount);

        long overdueCount = allInvoices.stream().filter(inv -> "OVERDUE".equals(inv.getStatus())).peek(inv -> System.out.println("OVERDUE INVOICE: id=" + inv.getId() + " status=" + inv.getStatus() + " totalDue=" + inv.getTotalDue())).count();
        System.out.println("OverdueInvoices count=" + overdueCount);
        dto.setOverdueInvoices(overdueCount);

        List<Payment> allPayments = paymentRepository.findAll();
        // Received this month
        double receivedThisMonth = allPayments.stream()
            .filter(p -> "SUCCESS".equals(p.getStatus()))
            .filter(p -> {
                if (p.getPaidAt() == null) return false;
                java.time.LocalDate paid = p.getPaidAt().toLocalDate();
                return paid.getYear() == year && paid.getMonthValue() == month;
            })
            .mapToDouble(Payment::getAmount)
            .sum();
        dto.setTotalReceived(receivedThisMonth);

        return dto;
    }
}

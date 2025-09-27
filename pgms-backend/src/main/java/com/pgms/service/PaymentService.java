package com.pgms.service;

import com.pgms.model.Payment;
import com.pgms.model.Invoice;
import com.pgms.repository.PaymentRepository;
import com.pgms.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<Payment> getAll() {
        return paymentRepository.findAll();
    }

    public Payment update(Payment payment) {
        return paymentRepository.save(payment);
    }

    public void delete(Long id) {
        paymentRepository.deleteById(id);
    }

    public Payment getById(Long id) {
        return paymentRepository.findById(id).orElseThrow();
    }

    public List<Payment> getByInvoice(Long invoiceId) {
        return paymentRepository.findByInvoiceId(invoiceId);
    }

    public Payment create(Payment payment) {
        payment.setStatus("SUCCESS");
        Payment saved = paymentRepository.save(payment);

        // On payment, update invoice status if paid in full
        invoiceRepository.findById(payment.getInvoiceId()).ifPresent(inv -> {
            double totalPaid = paymentRepository.findByInvoiceId(inv.getId()).stream()
                    .filter(p -> "SUCCESS".equals(p.getStatus()))
                    .mapToDouble(Payment::getAmount)
                    .sum();
            if (totalPaid >= inv.getTotalDue()) {
                inv.setStatus("PAID");
            } else if (totalPaid > 0) {
                inv.setStatus("PARTIALLY_PAID");
            } else {
                inv.setStatus("DUE");
            }
            invoiceRepository.save(inv);
        });

        return saved;
    }
}

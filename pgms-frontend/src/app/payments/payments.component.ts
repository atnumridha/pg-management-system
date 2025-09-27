import { Component, OnInit } from '@angular/core';
import { PaymentService, Payment } from '../payment.service';

@Component({
  selector: 'app-payments',
  template: `
  <div class="container my-4">
    <h2>Payments</h2>
    <hr>
    <div *ngIf="loading" class="my-4 text-center"><div class="spinner-border"></div> Loading...</div>
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <table class="table table-bordered" *ngIf="payments.length > 0">
      <thead class="table-dark">
        <tr>
          <th>Invoice</th>
          <th>Amount</th>
          <th>Method</th>
          <th>Reference</th>
          <th>Paid At</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let payment of payments">
          <td>{{ payment.invoiceId }}</td>
          <td>₹{{ payment.amount }}</td>
          <td>{{ payment.method }}</td>
          <td>{{ payment.reference }}</td>
          <td>{{ payment.paidAt }}</td>
          <td>
            <span [class]="payment.status === 'SUCCESS' ? 'badge bg-success' : payment.status === 'FAILED' ? 'badge bg-danger' : 'badge bg-warning'">
              {{ payment.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div *ngIf="payments.length === 0 && !loading && !error">
      <div class="alert alert-info mt-3">No payments found.</div>
    </div>
  </div>
  `,
  styleUrls: []
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  loading = true;
  error = '';

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.paymentService.getAll().subscribe({
      next: (pay) => {
        this.payments = pay;
        this.loading = false;
      },
      error: err => {
        this.error = 'Could not load payments';
        this.loading = false;
      }
    });
  }
}

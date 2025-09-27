import { Component, OnInit } from '@angular/core';
import { PaymentService, Payment } from '../payment.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { faPlus, faEdit, faTrash, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-payments',
  template: `
  <div class="container my-4">
    <div class="d-flex justify-content-between align-items-center">
      <h2>Payments</h2>
      <button class="btn btn-primary" (click)="openAddPayment()" aria-label="Add Payment">
        <fa-icon [icon]="faPlus"></fa-icon>
      </button>
    </div>
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
          <th>
            <fa-icon [icon]="faBars" aria-label="Actions"></fa-icon>
          </th>
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
          <td>
            <button class="btn btn-sm btn-secondary me-2" (click)="openEditPayment(payment)" aria-label="Edit Payment">
              <fa-icon [icon]="faEdit"></fa-icon>
            </button>
            <button class="btn btn-sm btn-danger" (click)="deletePayment(payment)" aria-label="Delete Payment">
              <fa-icon [icon]="faTrash"></fa-icon>
            </button>
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
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faBars = faBars;
  payments: Payment[] = [];
  loading = true;
  error = '';

  constructor(private paymentService: PaymentService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadPayments();
  }

  loadPayments() {
    this.loading = true;
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

  openAddPayment() {
    const dialogRef = this.dialog.open(AddPaymentComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'added' || result === 'updated') {
        this.loadPayments();
      }
    });
  }

  openEditPayment(payment: Payment) {
    const dialogRef = this.dialog.open(AddPaymentComponent, {
      width: '500px',
      data: { payment, edit: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.loadPayments();
      }
    });
  }

  deletePayment(payment: Payment) {
    if (!payment.id) return;
    if (confirm('Are you sure you want to delete this payment?')) {
      this.paymentService.delete(payment.id).subscribe({
        next: () => this.loadPayments(),
        error: err => this.error = 'Failed to delete payment'
      });
    }
  }
}

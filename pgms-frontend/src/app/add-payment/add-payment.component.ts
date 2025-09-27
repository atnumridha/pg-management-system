import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService, Payment } from '../payment.service';
import { InvoiceService, Invoice } from '../invoice.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  public payment: Payment = {
    invoiceId: 0,
    amount: 0,
    method: '',
    paidAt: '',
    status: 'COMPLETED',
    reference: '',
    notes: ''
  };

  editMode: boolean = false;

  invoices: Invoice[] = [];
  methods: string[] = ['CASH', 'UPI', 'BANK TRANSFER', 'CARD', 'CHEQUE'];

  constructor(
    public dialogRef: MatDialogRef<AddPaymentComponent>,
    private paymentService: PaymentService,
    private invoiceService: InvoiceService,
    @Inject(MAT_DIALOG_DATA) public data?: { payment?: Payment, edit?: boolean }
  ) {
    if (data && data.payment) {
      this.payment = { ...data.payment };
      // Patch paidAt for input[type=date] ("YYYY-MM-DD")
      if (this.payment.paidAt && this.payment.paidAt.length > 10) {
        this.payment.paidAt = this.payment.paidAt.substring(0, 10);
      }
    }
    this.editMode = !!(data && data.edit);
  }

  ngOnInit() {
    this.invoiceService.getAll().subscribe({
      next: invs => this.invoices = invs,
      error: () => this.invoices = []
    });
  }

  addPayment() {
    // Always patch paidAt for both add and edit
    if (this.payment.paidAt && this.payment.paidAt.length === 10) {
      this.payment.paidAt = this.payment.paidAt + 'T00:00:00';
    }

    if (this.editMode && this.payment.id) {
      this.paymentService.update(this.payment.id, this.payment).subscribe({
        next: () => {
          this.dialogRef.close('updated');
        },
        error: (err: any) => {
          alert('Failed to update payment');
        }
      });
    } else {
      this.paymentService.create(this.payment).subscribe({
        next: () => {
          this.dialogRef.close('added');
        },
        error: (err: any) => {
          alert('Failed to add payment');
        }
      });
    }
  }

  cancelPayment() {
    this.dialogRef.close();
  }
}

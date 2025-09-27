import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvoiceService, Invoice } from '../invoice.service';
import { TenantService } from '../tenant.service';
import { Tenant } from '../tenant';
import { AllocationService, Allocation } from '../allocation.service';
import { RoomService, Room } from '../room.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {
  public invoice: Invoice = {
    invoiceNo: '',
    tenantId: 0,
    allocationId: 0,
    periodYear: new Date().getFullYear(),
    periodMonth: new Date().getMonth() + 1,
    issueDate: '',
    dueDate: '',
    subtotal: 0,
    utilities: 0,
    taxes: 0,
    discount: 0,
    totalDue: 0,
    status: 'PENDING'
  };

  editMode: boolean = false;

  tenants: Tenant[] = [];
  rooms: Room[] = [];
  allocations: Allocation[] = [];

  allocationOptions: {
    id: number;
    display: string;
  }[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddInvoiceComponent>,
    private invoiceService: InvoiceService,
    private tenantService: TenantService,
    private allocationService: AllocationService,
    private roomService: RoomService,
    @Inject(MAT_DIALOG_DATA) public data?: { invoice?: Invoice, edit?: boolean }
  ) {
    if (data && data.invoice) {
      this.invoice = { ...data.invoice };
    }
    this.editMode = !!(data && data.edit);
  }

  ngOnInit() {
    // Load everything we need for the dropdowns
    Promise.all([
      this.tenantService.getAll().toPromise(),
      this.roomService.getAll().toPromise(),
      this.allocationService.getAll().toPromise()
    ]).then(([tenants, rooms, allocations]) => {
      this.tenants = tenants || [];
      this.rooms = rooms || [];
      this.allocations = allocations || [];
      // Build allocation dropdown: {id, display}
      this.allocationOptions = this.allocations.map(alloc => {
        const tenant = this.tenants.find(t => t.id === alloc.tenantId);
        const room = this.rooms.find(r => r.id === alloc.roomId);
        const name = tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown Tenant';
        const roomNum = room ? room.number : 'Unknown Room';
        return {
          id: alloc.id!,
          display: `${alloc.id} - ${roomNum} - ${name}`
        };
      });
    }).catch(() => {
      this.tenants = [];
      this.rooms = [];
      this.allocations = [];
      this.allocationOptions = [];
    });

    // Auto-generate invoice number for current year/month at creation
    if (!this.editMode) {
      this.invoiceService.getNextInvoiceNumber(this.invoice.periodYear, this.invoice.periodMonth).subscribe({
        next: (no: string) => this.invoice.invoiceNo = no,
        error: () => this.invoice.invoiceNo = 'AUTO-ERR'
      });
    }
  }

  addInvoice() {
    // In add mode, always compute totalDue; in edit, trust user to set totalDue directly.
    if (!this.editMode) {
      this.invoice.totalDue =
        (Number(this.invoice.subtotal) || 0) +
        (Number(this.invoice.utilities) || 0) +
        (Number(this.invoice.taxes) || 0) -
        (Number(this.invoice.discount) || 0);
    }

    if (this.editMode && this.invoice.id) {
      this.invoiceService.updateInvoice(this.invoice.id, this.invoice).subscribe({
        next: () => {
          this.dialogRef.close('updated');
        },
        error: (err: any) => {
          alert('Failed to update invoice');
        }
      });
    } else {
      this.invoiceService.createInvoice(this.invoice).subscribe({
        next: () => {
          this.dialogRef.close('added');
        },
        error: (err: any) => {
          alert('Failed to add invoice');
        }
      });
    }
  }

  cancelInvoice() {
    this.dialogRef.close();
  }
}

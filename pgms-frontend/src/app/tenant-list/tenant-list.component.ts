import { Component, OnInit } from '@angular/core';
import { TenantService } from '../tenant.service';
import { Tenant } from '../tenant';
import { MatDialog } from '@angular/material/dialog';
import { AddTenantComponent } from '../add-tenant/add-tenant.component';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.css']
})
export class TenantListComponent implements OnInit {

  // For property add form UX, model, and filtering
  public propertySearchTerm: string = '';
  public showAddPropertyForm: boolean = false;

  public addPropertyModel = {
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    ownerName: '',
    contactNo: '',
    gstin: '',
    active: true
  };

  public addProperty(): void {
    // TODO: Implement property add logic (API integration etc.)
    console.log('Adding property:', this.addPropertyModel);
    // Reset form after successful add
    this.addPropertyModel = {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      ownerName: '',
      contactNo: '',
      gstin: '',
      active: true
    };
    this.showAddPropertyForm = false;
  }
  tenants: Tenant[] = [];
  loading = true;
  error = '';
  showAddForm = false;
  addModel: Tenant = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    kycType: '',
    kycId: '',
    address: '',
    emergencyContact: '',
    joinedAt: '',
    status: 'ACTIVE'
  };

  editId?: number;
  editModel: Tenant = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    kycType: '',
    kycId: '',
    address: '',
    emergencyContact: '',
    joinedAt: '',
    status: 'ACTIVE'
  };

  searchTerm: string = '';

  constructor(private tenantService: TenantService, private dialog: MatDialog) {}
  openAddTenantDialog(): void {
    this.dialog.open(AddTenantComponent, {
      width: '600px',
      disableClose: false,
      autoFocus: true
    }).afterClosed().subscribe(result => {
      if (result === 'added') {
        this.load();
      }
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.tenantService.getAll().subscribe({
      next: (items) => {
        this.tenants = items;
        this.loading = false;
      },
      error: err => {
        this.error = 'Could not load tenants';
        this.loading = false;
      }
    });
  }

  addTenant() {
    this.tenantService.add(this.addModel).subscribe({
      next: () => {
        this.showAddForm = false;
        this.addModel = {
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          kycType: '',
          kycId: '',
          address: '',
          emergencyContact: '',
          joinedAt: '',
          status: 'ACTIVE'
        };
        this.load();
      },
      error: err => this.error = 'Failed to add tenant'
    });
  }

  beginEdit(ten: Tenant) {
    this.editId = ten.id;
    this.editModel = { ...ten };
  }

  saveEdit() {
    if (!this.editId) return;
    this.tenantService.update(this.editId, this.editModel).subscribe({
      next: () => {
        this.editId = undefined;
        this.load();
      },
      error: err => this.error = 'Failed to update tenant'
    });
  }

  cancelEdit() {
    this.editId = undefined;
  }

  deleteTenant(id?: number) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this tenant?')) {
      this.tenantService.delete(id).subscribe({
        next: () => this.load(),
        error: err => this.error = 'Failed to delete tenant'
      });
    }
  }

  filteredTenants(): Tenant[] {
    if (!this.searchTerm.trim()) return this.tenants;
    const term = this.searchTerm.trim().toLowerCase();
    return this.tenants.filter(
      t =>
        (t.firstName && t.firstName.toLowerCase().includes(term)) ||
        (t.lastName && t.lastName.toLowerCase().includes(term)) ||
        (t.phone && t.phone.includes(term)) ||
        (t.email && t.email.toLowerCase().includes(term)) ||
        (t.kycType && t.kycType.toLowerCase().includes(term)) ||
        (t.kycId && t.kycId.toLowerCase().includes(term)) ||
        (t.address && t.address.toLowerCase().includes(term)) ||
        (t.emergencyContact && t.emergencyContact.toLowerCase().includes(term))
    );
  }
}

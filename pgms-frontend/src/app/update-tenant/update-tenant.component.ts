import { Component, OnInit } from '@angular/core';
import { TenantService } from '../tenant.service';
import { Tenant } from '../tenant';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-tenant',
  templateUrl: './update-tenant.component.html',
  styleUrls: ['./update-tenant.component.css']
})
export class UpdateTenantComponent implements OnInit {
  id: number = 0;
  tenant: Tenant = {
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

  constructor(private tenantService: TenantService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.tenantService.getAll().subscribe({
      next: (items) => {
        const found = items.find(t => t.id === this.id);
        if (found) {
          this.tenant = { ...found };
        }
      },
      error: err => {
        // handle error as you like
      }
    });
  }

  onSubmit() {
    this.tenantService.update(this.id, this.tenant).subscribe({
      next: () => this.goToTenantList(),
      error: error => console.log(error)
    });
  }

  goToTenantList() {
    this.router.navigate(['/show-all-tenants']);
  }
}

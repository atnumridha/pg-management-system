import { Component, OnInit } from '@angular/core';
import { TenantService } from '../tenant.service';
import { ActivatedRoute } from '@angular/router';
import { Tenant } from '../tenant';

@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.component.html',
  styleUrls: ['./tenant-details.component.css']
})
export class TenantDetailsComponent implements OnInit {
  id: number = 0;
  tenant?: Tenant;

  constructor(private route: ActivatedRoute, private tenantService: TenantService) {
    this.id = 0;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.tenantService.getAll().subscribe({
      next: (items) => {
        this.tenant = items.find(t => t.id === this.id);
      },
      error: err => {
        // handle error
      }
    });
  }
}

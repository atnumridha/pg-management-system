import { Component, OnInit } from '@angular/core';
import { MetricsService, MetricsSummary } from '../metrics.service';
import { RoomService, Room } from '../room.service';
import { TenantService, Tenant } from '../tenant.service';
import { PaymentService, Payment } from '../payment.service';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, NgxChartsModule, RouterModule]
})
export class HomeComponent implements OnInit {
  metrics?: MetricsSummary;
  loading = true;
  error = '';

  roomsByStatus: { name: string; value: number }[] = [];
  tenantsByStatus: { name: string; value: number }[] = [];
  rentTrend: { name: string; value: number }[] = [];
  rentTrendSeries: { name: string; series: { name: string, value: number }[] }[] = [];

  colorScheme = {
    domain: ['#3f51b5', '#00bcd4', '#ff9800', '#e91e63', '#4caf50', '#ff5722']
  };

  constructor(
    private metricsService: MetricsService,
    private roomService: RoomService,
    private tenantService: TenantService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.metricsService.getSummary().subscribe({
      next: result => {
        this.metrics = result;
        this.loading = false;
      },
      error: err => {
        this.error = 'Could not fetch dashboard metrics';
        this.loading = false;
      }
    });

    // Rooms by Status
    this.roomService.getAll().subscribe({
      next: (rooms: Room[]) => {
        const map: Record<string, number> = {};
        for (const r of rooms) {
          map[r.status] = (map[r.status] || 0) + 1;
        }
        this.roomsByStatus = Object.keys(map).map(status => ({ name: status, value: map[status] }));
      }
    });

    // Tenants by Status
    this.tenantService.getAll().subscribe({
      next: (tenants: Tenant[]) => {
        const map: Record<string, number> = {};
        for (const t of tenants) {
          map[t.status] = (map[t.status] || 0) + 1;
        }
        this.tenantsByStatus = Object.keys(map).map(status => ({ name: status, value: map[status] }));
      }
    });

    // Rent Trend (sum per month, past 12 months)
    this.paymentService.getAll().subscribe({
      next: (payments: Payment[]) => {
        const map: Record<string, number> = {}; // "YYYY-MM" -> sum
        for (const p of payments) {
          if ((p.status !== 'SUCCESS' && p.status !== 'COMPLETED') || !p.paidAt) continue;
          const dt = p.paidAt.substring(0, 7); // "YYYY-MM"
          map[dt] = (map[dt] || 0) + (Number(p.amount) || 0);
        }
        // Build array, all months up to now (descending to ascending)
        const months: string[] = [];
        const today = new Date();
        for (let i = 11; i >= 0; i--) {
          const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
          const mm = d.getMonth() + 1;
          const key = d.getFullYear() + '-' + (mm < 10 ? '0' + mm : mm);
          months.push(key);
        }
        this.rentTrend = months.map(m => ({
          name: m,
          value: map[m] || 0,
        }));
        this.rentTrendSeries = [
          {
            name: 'Rent Collected',
            series: this.rentTrend
          }
        ];
      }
    });
  }
}

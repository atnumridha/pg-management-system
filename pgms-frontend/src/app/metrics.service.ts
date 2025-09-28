import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MetricsSummary {
  totalProperties: number;
  totalRooms: number;
  totalTenants: number;
  activeTenants: number;
  vacantRooms: number;
  totalInvoiced: number;
  totalReceived: number;
  dueInvoices: number;
  overdueInvoices: number;
}

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  private baseUrl = `${environment.apiBase}/v1/metrics`;

  constructor(private http: HttpClient) {}

  getSummary(): Observable<MetricsSummary> {
    return this.http.get<MetricsSummary>(`${this.baseUrl}/summary`);
  }
}

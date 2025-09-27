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

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  private baseUrl = 'http://localhost:8080/api/v1/metrics';

  constructor(private http: HttpClient) {}

  getSummary(): Observable<MetricsSummary> {
    return this.http.get<MetricsSummary>(`${this.baseUrl}/summary`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Invoice {
  id?: number;
  invoiceNo: string;
  tenantId: number;
  allocationId: number;
  periodMonth: number;
  periodYear: number;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  utilities: number;
  taxes: number;
  discount: number;
  totalDue: number;
  status: string;
  pdfUrl?: string;
}

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseUrl = `${environment.apiBase}/v1/invoices`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.baseUrl);
  }

  getByTenant(tenantId: number): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseUrl}/tenant/${tenantId}`);
  }

  getByStatus(status: string): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseUrl}/status/${status}`);
  }

  getById(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.baseUrl}/${id}`);
  }

  generateInvoices(year: number, month: number): Observable<Invoice[]> {
    return this.http.post<Invoice[]>(`${this.baseUrl}/generate?year=${year}&month=${month}`, {});
  }

  updateStatus(id: number, status: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/status?status=${status}`, {});
  }

  createInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.baseUrl, invoice);
  }

  updateInvoice(id: number, invoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(`${this.baseUrl}/${id}`, invoice);
  }

  deleteInvoice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getNextInvoiceNumber(year: number, month: number): Observable<string> {
    return this.http.get(`${this.baseUrl}/generate-number?year=${year}&month=${month}`, { responseType: 'text' });
  }
}

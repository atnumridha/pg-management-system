import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { AddTenantComponent } from './add-tenant/add-tenant.component';
import { UpdateTenantComponent } from './update-tenant/update-tenant.component';
import { TenantDetailsComponent } from './tenant-details/tenant-details.component';
import { FormsModule } from '@angular/forms';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RoomsComponent } from './rooms/rooms.component';
import { PropertiesComponent } from './properties/properties.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { PaymentsComponent } from './payments/payments.component';
import { AllocationsComponent } from './allocations/allocations.component';

import { AddPropertyComponent } from './add-property/add-property.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AddAllocationComponent } from './add-allocation/add-allocation.component';

@NgModule({
  declarations: [
    AppComponent,
    TenantListComponent,
    AddTenantComponent,
    UpdateTenantComponent,
    TenantDetailsComponent,
    AdminLoginComponent,
    RoomsComponent,
    PropertiesComponent,
    InvoicesComponent,
    PaymentsComponent,
    AllocationsComponent,
    AddPropertyComponent,
    AddInvoiceComponent,
    AddPaymentComponent,
    AddAllocationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

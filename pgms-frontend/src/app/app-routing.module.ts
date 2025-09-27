import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { AddTenantComponent } from './add-tenant/add-tenant.component';
import { UpdateTenantComponent } from './update-tenant/update-tenant.component';
import { TenantDetailsComponent } from './tenant-details/tenant-details.component';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './auth.guard';
import { RoomsComponent } from './rooms/rooms.component';
import { PropertiesComponent } from './properties/properties.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { PaymentsComponent } from './payments/payments.component';
import { AllocationsComponent } from './allocations/allocations.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AdminLoginComponent },
  { path: 'show-all-tenants', component: TenantListComponent, canActivate: [AuthGuard] },
  { path: 'add-tenant', component: AddTenantComponent, canActivate: [AuthGuard] },
  { path: 'updating-tenant-by-id/:id', component: UpdateTenantComponent, canActivate: [AuthGuard] },
  { path: 'details-of-tenant/:id', component: TenantDetailsComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'rooms', component: RoomsComponent, canActivate: [AuthGuard] },
  { path: 'properties', component: PropertiesComponent, canActivate: [AuthGuard] },
  { path: 'invoices', component: InvoicesComponent, canActivate: [AuthGuard] },
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard] },
  { path: 'allocations', component: AllocationsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

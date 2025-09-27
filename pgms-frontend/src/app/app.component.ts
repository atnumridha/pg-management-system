import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faGauge, faUsers, faBed, faBuilding, faFileInvoiceDollar, faMoneyBillWave, faCubes, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { PropertyService } from './property.service';
import { RoomService } from './room.service';
import { TenantService } from './tenant.service';
import { InvoiceService } from './invoice.service';
import { PaymentService } from './payment.service';
import { AllocationService } from './allocation.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Paying Guest Management System';
  isLoggedInFlag: boolean = false;
  hamburgerMenuOpen: boolean = false;

  // GLOBAL SEARCH DATA
  globalSearchTerm: string = '';
  showGlobalDropdown: boolean = false;
  globalFilteredResults: Array<{entityType:string, summary:string, id:number, route:string}> = [];

  private globalSearchDebounce: any;

  filterGlobalSearch(): void {
    const term = this.globalSearchTerm?.toLowerCase().trim();
    if (!term) {
      this.globalFilteredResults = [];
      this.showGlobalDropdown = false;
      return;
    }
    clearTimeout(this.globalSearchDebounce);
    this.globalSearchDebounce = setTimeout(() => {
      // Launch all service searches in parallel, each mapping every field to a string and filtering for match
      forkJoin({
        properties: this.propertyService.getAll(),
        rooms: this.roomService.getAll(),
        tenants: this.tenantService.getAll(),
        invoices: this.invoiceService.getAll(),
        payments: this.paymentService.getAll(),
        allocations: this.allocationService.getAll()
      }).subscribe(({properties, rooms, tenants, invoices, payments, allocations}) => {
        const filterRowFields = (obj: any) => Object.values(obj).map(x => x !== null && x !== undefined ? String(x) : '').join(' ').toLowerCase();
        const highlight = (text: string) =>
          String(text ?? '').replace(new RegExp(term, "gi"), match => `<mark>${match}</mark>`);

        function bonusScoreForKeyField(obj: any, searchTerm: string): number {
          let bonus = 0;
          for (const key in obj) {
            if ((/date|year/i).test(key) && String(obj[key]).toLowerCase().includes(searchTerm)) bonus += 3;
            if ((/id|name|label|number/i).test(key) && String(obj[key]).toLowerCase().includes(searchTerm)) bonus += 2;
          }
          return bonus;
        }
        const scored = [
          ...properties
            .filter((p: any) => filterRowFields(p).includes(term))
            .map((p: any) => {
              const all = Object.values(p).join(' | ').toLowerCase();
              let score = (all.match(new RegExp(term, 'gi')) || []).length;
              score += bonusScoreForKeyField(p, term);
              return {
                entityType: 'Property',
                summary: `<b>${highlight('ID:' + p.id || '')}</b> | <b>${highlight(p.name || '')}</b> | ${highlight((p.address || '') + (p.city ? ', '+p.city : ''))} | ${highlight(Object.values(p).join(' | '))}`,
                id: p.id,
                route: '/properties',
                score,
              };
            }),
          ...rooms
            .filter((r: any) => filterRowFields(r).includes(term))
            .map((r: any) => {
              const all = Object.values(r).join(' | ').toLowerCase();
              let score = (all.match(new RegExp(term, 'gi')) || []).length;
              score += bonusScoreForKeyField(r, term);
              return {
                entityType: 'Room',
                summary: `<b>${highlight('ID:' + r.id || '')}</b> | <b>${highlight('Room '+(r.number || ''))}</b> | ${highlight((r.type || ''))} | ${highlight(Object.values(r).join(' | '))}`,
                id: r.id,
                route: '/rooms',
                score,
              };
            }),
          ...tenants
            .filter((t: any) => filterRowFields(t).includes(term))
            .map((t: any) => {
              const all = Object.values(t).join(' | ').toLowerCase();
              let score = (all.match(new RegExp(term, 'gi')) || []).length;
              score += bonusScoreForKeyField(t, term);
              return {
                entityType: 'Tenant',
                summary: `<b>${highlight('ID:' + t.id || '')}</b> | <b>${highlight((t.firstName && t.lastName) ? `${t.firstName} ${t.lastName}` : t.firstName || t.lastName || '')}</b> | ${highlight((t.phone || '') + (t.email ? ', ' + t.email : ''))} | ${highlight(Object.values(t).join(' | '))}`,
                id: t.id,
                route: '/show-all-tenants',
                score,
              };
            }),
          ...invoices
            .filter((inv: any) => filterRowFields(inv).includes(term))
            .map((inv: any) => {
              const all = Object.values(inv).join(' | ').toLowerCase();
              let score = (all.match(new RegExp(term, 'gi')) || []).length;
              score += bonusScoreForKeyField(inv, term);
              return {
                entityType: 'Invoice',
                summary: `<b>${highlight('ID:' + inv.id || '')}</b> | <b>${highlight(inv.invoiceNo || '')}</b> | ₹${highlight(inv.totalDue||'')} | ${highlight(Object.values(inv).join(' | '))}`,
                id: inv.id,
                route: '/invoices',
                score,
              };
            }),
          ...payments
            .filter((pay: any) => filterRowFields(pay).includes(term))
            .map((pay: any) => {
              const all = Object.values(pay).join(' | ').toLowerCase();
              let score = (all.match(new RegExp(term, 'gi')) || []).length;
              score += bonusScoreForKeyField(pay, term);
              return {
                entityType: 'Payment',
                summary: `<b>${highlight('ID:' + pay.id || '')}</b> | <b>${highlight(pay.reference ? `Tx-${pay.reference}` : '')}</b> | ₹${highlight(pay.amount || '')} | ${highlight(Object.values(pay).join(' | '))}`,
                id: pay.id,
                route: '/payments',
                score,
              };
            }),
          ...allocations
            .filter((a: any) => filterRowFields(a).includes(term))
            .map((a: any) => {
              const all = Object.values(a).join(' | ').toLowerCase();
              let score = (all.match(new RegExp(term, 'gi')) || []).length;
              score += bonusScoreForKeyField(a, term);
              return {
                entityType: 'Allocation',
                summary: `<b>${highlight('ID:' + a.id || '')}</b> | <b>Tenant:${highlight(a.tenantId||'')}</b> | <b>Room:${highlight(a.roomId||'')}</b> | ${highlight(Object.values(a).join(' | '))}`,
                id: a.id,
                route: '/allocations',
                score,
              };
            }),
        ];

        const allScored = scored.sort((a, b) => b.score - a.score);
        console.log('DEBUG: All scored search results:', allScored.map(r => ({
          type: r.entityType,
          id: r.id,
          score: r.score,
          summary: r.summary
        })));
        const top5 = allScored.slice(0, 5);
        const matches2025 = allScored.filter(r => r.summary.toLowerCase().includes('2025'));
        if (matches2025.length === 0) {
          console.warn('[SearchDebug] No result with 2025 in summary at all!');
        } else {
          matches2025.forEach(match => {
            const rank = allScored.indexOf(match) + 1;
            console.log(`[SearchDebug] "2025" match: type=${match.entityType}, id=${match.id}, score=${match.score}, rank=${rank}`, match.summary);
            if (!top5.includes(match)) {
              console.warn(`[SearchDebug] "2025" result not in top 5!`);
            }
          });
        }
        this.globalFilteredResults = top5;
        this.showGlobalDropdown = this.globalFilteredResults.length > 0;
      });
    }, 100);
  }

  onGlobalSelect(result: {entityType:string,summary:string,id:number,route:string}) {
    this.showGlobalDropdown = false;
    this.globalSearchTerm = '';
    this.globalFilteredResults = [];
    // Navigate to page; highlight/scroll logic can be extended
    this.router.navigate([result.route]);
  }

  onGlobalBlur() {
    setTimeout(() => this.showGlobalDropdown = false, 120); // slight delay to allow click
  }

  onGlobalSearchSubmit(event: Event) {
    event.preventDefault();
    if (this.globalFilteredResults.length > 0) {
      this.onGlobalSelect(this.globalFilteredResults[0]);
    }
  }

  // Material-style ripple on search result click
  animateSearchRipple(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    if (!button) return;
    let ripple = button.querySelector('.mat-search-ripple') as HTMLElement;
    if (!ripple) return;
    const rect = button.getBoundingClientRect();
    const diameter = Math.max(rect.width, rect.height) * 1.1;
    ripple.style.display = 'block';
    ripple.style.left = (event.clientX - rect.left - diameter / 2) + 'px';
    ripple.style.top = (event.clientY - rect.top - diameter / 2) + 'px';
    ripple.style.width = ripple.style.height = diameter + 'px';
    ripple.classList.remove('run');
    void ripple.offsetWidth; // force reflow
    ripple.classList.add('run');
    setTimeout(() => {
      ripple.classList.remove('run');
      ripple.style.display = 'none';
    }, 350);
  }

  constructor(
    private router: Router,
    private faLibrary: FaIconLibrary,
    private propertyService: PropertyService,
    private roomService: RoomService,
    private tenantService: TenantService,
    private invoiceService: InvoiceService,
    private paymentService: PaymentService,
    private allocationService: AllocationService
  ) {
    faLibrary.addIcons(
      faBars,
      faGauge,
      faUsers,
      faBed,
      faBuilding,
      faFileInvoiceDollar,
      faMoneyBillWave,
      faCubes,
      faSignInAlt,
      faSignOutAlt
    );
  }

  ngOnInit(): void {
    this.checkLoginStatus();
    window.addEventListener('storage', () => this.checkLoginStatus());

  }

  toggleHamburgerMenu() {
    this.hamburgerMenuOpen = !this.hamburgerMenuOpen;
  }

  closeHamburgerMenu() {
    this.hamburgerMenuOpen = false;
  }

  checkLoginStatus() {
    this.isLoggedInFlag = localStorage.getItem('isAdmin') === 'true';
  }

  logout() {
    localStorage.removeItem('isAdmin');
    this.checkLoginStatus();
    this.router.navigate(['/login']).then(() => window.location.reload());
  }
}

# Active Context

## Current Work Focus
- Implementing final dashboard polish: clickable summary cards, chart clarity, and maximum UX accessibility for mobile and desktop.
- Ensuring all recent fixes—including CRUD and dashboard feature enhancements—are fully documented.

## Recent Changes
- KPI cards ("Rooms", "Tenants", "Vacant Rooms", "Properties", "Invoiced", "Received", "Due", "Overdue") now use <a> routerLink with href and tabIndex for mobile-friendly and accessible navigation.
- Charts: switched Tenants by Status between horizontal bar and doughnut, finalized on doughnut for recognition and distinction.
- Bar chart is now used for Rent Collection Trend for always-visible data.
- Resolved issues with Angular module imports, standalone vs. classic modules, and router navigation in Angular v16.x.

## Next Steps
- Track new feature requests or UX bugs and update documentation after every major workflow or architectural update.

## Active Decisions & Considerations
- Only SUCCES/COMPLETED payments are included in rent trend.
- All summary/KPI cards use routerLink, href, and tabIndex for maximum accessibility and navigation support regardless of device.

## Patterns & Preferences
- Use <a [routerLink] href="#" tabIndex="0"> for navigation cards for click + mobile + keyboard support.
- For charts: use explicit and visually distinctive color schemes, always use supported and visible chart attributes, default to bar/doughnut first for clarity.

## Learnings & Project Insights
- Ngx-charts color schemes, accessibility, and routerLink integration require careful coordination between Angular module setup, component template, and CSS.
- Angular 16.x standalone component patterns for dashboard and full-app routing are now well established across the project for maintainability.

---

## 10 Most Recent Events (sliding window)
- 27/09/2025: Final dashboard navigation polish—clickable cards fully accessible and working.
- 27/09/2025: Chart visibility, color, and shape improved for Rent Trend, Tenants by Status, etc.
- 27/09/2025: Payment CRUD, paidAt patching and status handling now robust.
- 27/09/2025: Rent trend aggregation accepts SUCCESS and COMPLETED.
- 27/09/2025: Dependencies reinstalled, module errors resolved for FormsModule/CommonModule/RouterModule and NgxCharts.
- 27/09/2025: All dashboard KPIs, status, and chart data in sync with backend logic and tokens.
- 27/09/2025: Full CRUD for invoices and payments; dashboard, edit, delete for all entity screens.
- 27/09/2025: Standalone and classic module integration, router navigation assured via routerLink.
- 27/09/2025: Workspace migrations, version pinning, and package sync locked at Angular 16.x plus ngx-charts 20.x.
- 27/09/2025: Memory bank update behind all major feature and bugfix changes.

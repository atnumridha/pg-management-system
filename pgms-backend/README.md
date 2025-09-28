# PG Management System

A web-based platform for managing paying guest (PG) properties, tenants, rooms, allocations, invoicing, and payments.

## Features

- Manage properties, tenants, room assignments, invoices, and payments with a unified admin dashboard.
- Consistent, responsive UI across all sections (Properties, Allocations, Invoices, Payments).
- Secure admin login, with all backend APIs served under `/api/v1/`.
- Easy to run and maintain in both development and production environments.

## Architecture

- **Frontend:** Angular (see `pgms-frontend/`)
- **Backend:** Spring Boot (see `src/`)

## Development Setup

### 1. Backend

```sh
./mvnw spring-boot:run
```
Spring Boot backend will run on http://localhost:8080

### 2. Frontend

```sh
cd ../pgms-frontend
npm install
ng serve --proxy-config proxy.conf.json
```
Angular admin frontend will run on http://localhost:4200 with all API calls to `/api/*` automatically proxied to backend.  
**Note:** The `proxy.conf.json` is now set up **without any `pathRewrite`**, so paths like `/api/v1/admin/login` map directly to backend endpoints.

## Recent Improvements

- **Unified Headers:** All admin entity screens now use a `.section-header` div (with icon and add button), styled with a smaller font-size for less dominance, and a consistent look across the application.
- **Proxy Configuration Fixed:** All frontend API calls during development are seamlessly routed to backend (no more 405 errors or mismatched API paths).
- **Memory Bank:** Project now persists context and decisions in `memory-bank/`—see those markdown files for up-to-date architecture, product rationale, and change history.

## Documentation

Key architectural and functional context is documented in the [memory-bank/](./memory-bank/) directory:
- `projectBrief.md`: Overall goals and scope.
- `systemPatterns.md`: UI patterns, API integration, and more.
- `progress.md`, `changelog.md`: Recent changes and decisions.

## Contribution

1. Fork and clone this repo.
2. Use `ng serve --proxy-config proxy.conf.json` for frontend, and `./mvnw spring-boot:run` for backend.
3. All substantial changes should be captured in the memory-bank for continuity.

---

**Maintained by:** @atnumridha

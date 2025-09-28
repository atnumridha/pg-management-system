# Paying Guest Management System

A modern, material-inspired management system for PG (Paying Guest) accommodations—streamlining property, room, tenant, allocation, invoice, and payment workflows. Full stack: Angular (frontend), Spring Boot (backend).

## Features

- **Global Dashboard Search:** Async, live, top-5 best match across all columns and tables, material ripple effect, bold entity type, instantly navigable.
- **Material Dashboard KPI Cards:** Responsive, color-coded, elevate, only clickable when count > 0; accessible and mobile-friendly.
- **Smart Chart Legends:** Legends always fit, overflow scroll/wrap, accessible color palette, material dashboard design.
- **Full CRUD:** Responsive data management for tenants, rooms, properties, invoices, payments, allocations.
- **Role-based Access:** Admin and employee dashboards; secure login.
- **Documentation:** Continuous context and architectural memory using files in `memory-bank/`.
- **Tech Stack:**
  - Frontend: Angular 16+, ngx-charts, FontAwesome, SCSS/CSS
  - Backend: Java 17+, Spring Boot, Spring Data JPA, H2 database (dev mode)

---

## Quick Start

### Backend (Spring Boot)

```sh
cd pgms-backend
./mvnw spring-boot:run
```

- API: default runs on `http://localhost:8080`
- Edit `application.properties` for DB/settings.

### Frontend (Angular)

```sh
cd pgms-frontend
npm install
npm start
```

- App opens on `http://localhost:4200`
- **Note:** Use Node 16+ and npm 8+ for best results.

---

mvn clean package -- package angular with spring boot

java -jar <\*.jar> to run then together

run ng serve --proxy-config proxy.conf.json

## MIT License

```text
MIT License

Copyright (c) 2025 Paying Guest Management System Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

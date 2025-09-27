# System Patterns

## System Architecture
- Modular, service-oriented architecture supporting the PG Management System.
- Backend: Java (Spring Boot) RESTful API for all business logic and data persistence.
- Frontend: Angular SPA for admin/operator UI.

## Key Technical Decisions
- Java + Spring Boot chosen for stability, robustness, and scalability on backend.
- Angular selected for rapid development of interactive dashboards with strong component model.
- Data stored in relational database (e.g., H2 for local, production-ready migration possible).

## Design Patterns in Use
- MVC (Model-View-Controller) separation in backend for maintainability.
- Service and Repository layers to encapsulate logic and data access.
- Angular uses component-based UI hierarchy.

## Component Relationships
- Entities: Tenant, Property, Room, Allocation, Payment, Invoice.
- Key relations: Properties contain Rooms; Tenants can be allocated to Rooms; Payments and Invoices attached to Tenants.

## Critical Implementation Paths
- REST endpoints connect frontend SPA to backend for all entity operations.
- Security and authentication integrate via backend middleware and Angular route guards.

---
*Created: 27/09/2025*

# Tech Context

## Technologies Used
- **Backend:** Java 17+, Spring Boot framework, REST APIs.
- **Frontend:** Angular, TypeScript, HTML, CSS.
- **Database:** H2 (development), with path for migration to production RDBMS.
- **Build/Tooling:** Maven for backend, npm for frontend.

## Development Setup
- Backend: Java SDK installed, Maven for dependency management.
- Frontend: Node.js and npm for Angular build/run.
- IDE: VSCode (recommended), IntelliJ IDEA (optional for backend).
- Local H2 database with application.properties configuration.

## Technical Constraints
- Must support multi-tenant data separation.
- Secure authentication and authorization (Spring Security/Angular route guards).
- REST-over-HTTP communication between frontend and backend.
- Code must follow Java/Angular community conventions.

## Dependencies
- Spring Boot, Spring Data JPA, Spring Web, Spring Security (backend)
- Angular core, Angular Material (frontend)
- H2, future PostgreSQL/MySQL support

## Tool Usage Patterns
- Frequent usage of Maven (`mvnw`/`mvnw.cmd`) for backend lifecycle.
- Angular CLI (`ng serve`, `ng build`) for frontend dev/test.
- Integration via REST endpoints and service proxies.

---
*Created: 27/09/2025*

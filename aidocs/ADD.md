# Architecture Description Document (ADD)

## Version History
| Version | Date       | Author         | Changes                  |
|---------|------------|----------------|--------------------------|
| 1.0     | 2024-06-04 | AI Architect   | Initial architecture ADD |

## 1. Introduction
### 1.1 Purpose
This document describes the "As-Is" architecture of the WebJET CMS system. It aims to provide a comprehensive view of the system's structure, identify architectural bottlenecks, coupling, and refactoring hotspots, and support modernization and maintainability analysis.

### 1.2 Scope
The ADD covers:
- Module decomposition
- Layered architecture
- Deployment topology
- Data flows
- Cross-cutting concerns (security, performance, maintainability)
- Traceability to SORD requirements

### 1.3 Viewpoints
- Logical (module/component)
- Layered (presentation/business/data)
- Deployment (physical nodes, containers)
- Data (entity and flow)

### 1.4 Stakeholders and Concerns
| Stakeholder         | Concern                                      |
|---------------------|----------------------------------------------|
| Product Owner       | Feature completeness, maintainability         |
| Developers          | Code structure, extensibility, testability    |
| DevOps              | Deployment, configuration, monitoring         |
| Security Officer    | Authentication, authorization, vulnerabilities|
| End Users           | Usability, reliability, performance           |

## 2. Architectural Views
### 2.1 Module View
WebJET CMS is decomposed into the following major modules (Java packages):
- `sk.iway.iwcm`: Core CMS logic, utilities, and integration
- `sk.iway.iwcm.admin`: Administration backend
- `sk.iway.iwcm.components`: Pluggable CMS components
- `sk.iway.iwcm.users`: User management and authentication
- `sk.iway.iwcm.dmail`: Email and notification services
- `sk.iway.iwcm.filebrowser`: File management
- `sk.iway.iwcm.doc`: Document management
- `sk.iway.iwcm.search`: Search and indexing
- `sk.iway.iwcm.setup`: System setup and configuration
- `sk.iway.iwcm.stat`: Statistics and analytics
- `sk.iway.iwcm.system`: System-level utilities

Each module is implemented as a Java package, with clear separation of concerns. Dependencies are managed via Gradle and Spring dependency injection.

**Module Diagram (UML, simplified):**
~~~mermaid
graph TD
  Core[Core (sk.iway.iwcm)] --> Admin[Admin]
  Core --> Components[Components]
  Core --> Users[Users]
  Core --> DMail[DMail]
  Core --> FileBrowser[FileBrowser]
  Core --> Doc[Doc]
  Core --> Search[Search]
  Core --> Setup[Setup]
  Core --> Stat[Stat]
  Core --> System[System]
~~~

### 2.2 Layered View
WebJET CMS follows a classic three-layered architecture:
- **Presentation Layer**: JSPs, Servlets, and REST controllers (Spring WebMVC)
- **Business Logic Layer**: Services, managers, and business rules (Spring Beans)
- **Data Access Layer**: Repositories, DAOs, and ORM (Spring Data JPA, Hibernate, JDBC)

**Layered Diagram:**
~~~mermaid
flowchart TB
  UI[Presentation Layer]
  BL[Business Logic Layer]
  DAL[Data Access Layer]
  DB[(Database)]
  UI --> BL --> DAL --> DB
~~~

### 2.3 Deployment View
WebJET CMS is deployed as a Java WAR application on Tomcat 9 (or compatible servlet containers). It relies on a relational database (MariaDB, PostgreSQL, Oracle, etc.).

**Deployment Diagram:**
~~~mermaid
flowchart LR
  User[Web Browser]
  LB[Load Balancer]
  AppSrv[Tomcat 9 (WebJET CMS)]
  DB[(RDBMS)]
  User --> LB --> AppSrv --> DB
~~~

- Application server runs Java 17
- Deployed as a WAR file
- Supports HTTPS and HTTP
- Configuration via environment variables and property files

### 2.4 Data View
- Data entities are modeled as JavaBeans and JPA entities
- Data flows from UI forms to controllers, through services, to repositories, and is persisted in the RDBMS
- Uses Spring Data JPA for ORM
- Supports file uploads and document storage

**Data Flow Example:**
~~~mermaid
sequenceDiagram
  participant U as User
  participant UI as JSP/REST Controller
  participant S as Service
  participant R as Repository
  participant DB as Database
  U->>UI: Submit form
  UI->>S: Validate/process
  S->>R: Save entity
  R->>DB: Persist
  DB-->>R: Ack
  R-->>S: Ack
  S-->>UI: Result
  UI-->>U: Response
~~~

## 3. Architecture Decisions
### 3.1 Design Rationale
- Java chosen for portability and enterprise maturity
- Spring Framework for modularity and dependency injection
- Layered architecture for separation of concerns
- WAR deployment for compatibility with standard Java EE servers
- Gradle for build automation and dependency management

### 3.2 Patterns Used
| Pattern      | Description                               | Rationale                                      |
|-------------|-------------------------------------------|------------------------------------------------|
| MVC         | Model-View-Controller (Spring WebMVC)     | Clean separation of UI, logic, and data         |
| DAO/Repo    | Data Access Object/Repository              | Abstracts persistence, enables ORM              |
| Dependency Injection | Spring-managed beans              | Decouples components, testability               |
| Singleton   | Utility classes, configuration             | Shared state, performance                       |
| Observer    | Event listeners (e.g., CacheListener)      | Decoupled event handling                        |

### 3.3 Interfaces
| Interface                 | Type        | Details                                                |
|---------------------------|-------------|--------------------------------------------------------|
| REST API Endpoints        | HTTP/JSON   | Exposed via Spring controllers, documented with Swagger |
| JSP/Servlet Endpoints     | HTTP/HTML   | Classic web UI, admin console                          |
| Database Schema           | SQL         | JPA entities, Hibernate mappings                       |
| File Upload/Download      | HTTP        | Multipart requests, filebrowser module                 |
| Email Notification        | SMTP        | DMail module, JavaMail                                 |

## 4. Cross-Cutting Concerns
### 4.1 Security
- Uses Spring Security for authentication and authorization
- Supports role-based access control (RBAC)
- Input validation and sanitization (OWASP Java HTML Sanitizer)
- HTTPS support, secure cookies
- Regular dependency checks (OWASP Dependency Check plugin)

### 4.2 Performance
- Connection pooling (HikariCP)
- Caching mechanisms (Cache, CacheListener)
- Profiling and monitoring tools
- Optimized SQL queries and indexing
- Asynchronous processing for background tasks

### 4.3 Maintainability
- Modular package structure
- Use of Lombok to reduce boilerplate
- Automated tests (JUnit, Mockito)
- Code coverage (Jacoco)
- Static analysis and license compliance tools
- Gradle build scripts for reproducibility

## 5. Appendices
### A. Diagrams Index
- Module Diagram (Section 2.1)
- Layered Diagram (Section 2.2)
- Deployment Diagram (Section 2.3)
- Data Flow Diagram (Section 2.4)

### B. Traceability to SORD
| SORD Requirement Section | Architecture Element(s)                  |
|-------------------------|------------------------------------------|
| Content Management      | sk.iway.iwcm, sk.iway.iwcm.components    |
| User Management         | sk.iway.iwcm.users, Spring Security      |
| File Handling           | sk.iway.iwcm.filebrowser                 |
| Analytics/Stats         | sk.iway.iwcm.stat                        |
| Email/Notifications     | sk.iway.iwcm.dmail                       |
| Security                | Spring Security, OWASP plugins           |
| Deployment              | Tomcat, Gradle, WAR packaging            |

**Standards Alignment**: ISO/IEC 42010:2011 (Architecture description), UML 2.5.1.

**Traceability**: See SORD and CIAR documents for further mapping.

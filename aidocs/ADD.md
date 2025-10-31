# Architecture Description Document (ADD)

## Version History
| Version | Date       | Author           | Changes                 |
|---------|------------|------------------|-------------------------|
| 1.0     | 2024-06-07 | AI Documentation | Initial version created |

## 1. Introduction
### 1.1 Purpose
This document provides a comprehensive "As-Is" architecture description of the WebJET CMS system, identifying architectural patterns, bottlenecks, coupling, and refactoring hotspots to support modernization and maintainability.

### 1.2 Scope
This ADD covers the logical, module, layered, deployment, and data views of the WebJET CMS open-source community edition. It analyzes the main Java/Spring codebase, configuration, deployment, and cross-cutting concerns, referencing the SORD and CIAR documents for requirements and code inventory.

### 1.3 Viewpoints
- Logical (module/component)
- Layered (presentation, business, data)
- Deployment (runtime nodes, network)
- Data (flows, persistence)

### 1.4 Stakeholders and Concerns
| Stakeholder        | Concern                           |
|--------------------|-----------------------------------|
| Business Owner     | ROI, time-to-market, usability    |
| Content Editor     | Ease of use, reliability          |
| IT Administrator   | Security, maintainability         |
| Developer          | Code quality, extensibility       |
| Community Member   | Openness, documentation           |

## 2. Architectural Views
### 2.1 Module View
WebJET CMS is decomposed into modules aligned with business functions and technical concerns. Major modules:
- Core (sk.iway.iwcm): Utilities, configuration, base services
- Admin (sk.iway.iwcm.admin): Admin UI and management
- Common (sk.iway.iwcm.common): Shared utilities
- Components (sk.iway.iwcm.components): Pluggable features
- Filebrowser (sk.iway.iwcm.filebrowser): File management
- Users (sk.iway.iwcm.users): User management and authentication
- Stat (sk.iway.iwcm.stat): Web statistics and analytics
- Editor (sk.iway.iwcm.editor): Content editing
- Dmail (sk.iway.iwcm.dmail): Email integration
- Integration (sk.iway.iwcm.integration): External system connectors
- Setup (sk.iway.iwcm.setup): System setup and configuration
- Search (sk.iway.iwcm.search): Lucene-based search
- Forms (src/main/webjet8/forms): Form builder and processing

~~~mermaid
graph TD
    A[Core] --> B[Admin]
    A --> C[Common]
    A --> D[Components]
    A --> E[Filebrowser]
    A --> F[Users]
    A --> G[Stat]
    A --> H[Editor]
    A --> I[Dmail]
    A --> J[Integration]
    A --> K[Setup]
    A --> L[Search]
    A --> M[Forms]
~~~

### 2.2 Layered View
WebJET CMS follows a classic n-tier architecture:
- Presentation Layer: JSP/HTML/JS (src/main/webapp), DataTables, Bootstrap, Admin UI
- Business Layer: Java services (sk.iway.iwcm, sk.iway.webjet), Spring beans, managers
- Data Layer: JPA/Hibernate, JDBC, Lucene, XML configs

~~~mermaid
graph TD
    P[Presentation Layer] --> B[Business Layer]
    B --> D[Data Layer]
~~~

### 2.3 Deployment View
The system is deployed as a Java WAR on a servlet container (Tomcat 9), with optional Gretty for local development. It supports cloud and on-premise deployments.

~~~mermaid
graph TD
    Client[Web Browser] --> Web[Tomcat/Gretty]
    Web --> DB[(RDBMS: MariaDB/PostgreSQL/Oracle)]
    Web --> Lucene[(Lucene Index)]
~~~

### 2.4 Data View
Data flows from user input (UI/forms) through business logic to persistent storage (DB, Lucene). Key flows:
- Content CRUD: UI → Business → DB
- File upload: UI → Filebrowser → Storage
- User auth: UI → Users → DB
- Analytics: UI → Stat → DB
- Search: UI → Search → Lucene

~~~mermaid
sequenceDiagram
    participant U as User
    participant UI as UI
    participant BL as Business Logic
    participant DB as Database
    participant L as Lucene
    U->>UI: Submit content
    UI->>BL: Validate/process
    BL->>DB: Store/retrieve
    UI->>BL: Search query
    BL->>L: Search index
    L-->>BL: Results
    BL-->>UI: Display
~~~

## 3. Architecture Decisions
### 3.1 Design Rationale
- Monolithic deployment for simplicity and legacy compatibility
- Modular codebase for maintainability and extensibility
- Spring Framework for dependency injection, security, and data access
- Lucene for search indexing
- DataTables/Bootstrap for rich admin UI
- Gradle for build and dependency management

### 3.2 Patterns Used
| Pattern    | Description                      | Rationale                                 |
|------------|----------------------------------|-------------------------------------------|
| MVC        | Model-View-Controller            | Separation of UI, business, data          |
| N-Tier     | Layered architecture             | Maintainability, scalability              |
| Dependency Injection | Spring beans           | Decoupling, testability                   |
| Repository | Data access abstraction          | DB independence, testability              |
| Singleton  | Utility/service classes          | Resource management, global config        |
| Observer   | Event listeners (file changes)   | Decoupled event handling                  |

### 3.3 Interfaces
| Interface              | Type      | Details                                         |
|------------------------|-----------|-------------------------------------------------|
| REST API (admin)       | HTTP      | /admin/v9/* endpoints, secured via Spring Sec   |
| Filebrowser            | HTTP/FS   | File upload/download endpoints                  |
| Database               | JDBC      | MariaDB/PostgreSQL/Oracle, JPA entities         |
| Lucene Search          | Java API  | Index/query via Lucene 3.x                      |
| External Integrations  | HTTP/Custom| WebJET family, GoPay, SMTP, etc.               |
| User Authentication    | Spring Sec| Role-based access control, session management   |

## 4. Cross-Cutting Concerns
### 4.1 Security
- Spring Security for authentication/authorization
- Role-based access control (admin, editor, user)
- OWASP HTML Sanitizer for XSS prevention
- Secure file upload (Commons FileUpload, validation)
- Regular dependency scanning (OWASP DependencyCheck)

### 4.2 Performance
- Identified hotspots: ContentManager, NavigationManager, StatsService
- Lucene search performance bottleneck (outdated 3.x version)
- File upload/download optimized via Commons IO
- Page load times targeted <2s (see SORD)
- Gradle build optimizations, incremental compilation

### 4.3 Maintainability
- Modular package structure (sk.iway.iwcm.*)
- Cyclomatic complexity avg ~3.2 (see CIAR)
- ~7% code duplication (acceptable)
- Large legacy classes flagged for refactoring
- Test coverage ~60%, goal >80%
- Gradle build with dependency exclusions for legacy libs

## 5. Appendices
### A. Diagrams Index
- Module View: Section 2.1 (Mermaid)
- Layered View: Section 2.2 (Mermaid)
- Deployment View: Section 2.3 (Mermaid)
- Data View: Section 2.4 (Mermaid)

### B. Traceability to SORD
| SORD Requirement ID | ADD Section | Implementation Reference                   |
|--------------------|-------------|--------------------------------------------|
| FR-001             | 2.1, 3.3    | Users, Spring Security                     |
| FR-002             | 2.1, 2.4    | Editor, Forms, DB                          |
| FR-003             | 2.1, 2.2    | NavigationManager, UI                      |
| FR-004             | 2.1, 3.3    | Components, Apps, Integration              |
| FR-005             | 2.1, 3.3    | Filebrowser, Commons FileUpload            |
| FR-006             | 2.1, 2.4    | Forms, Stat                                |
| FR-007             | 2.1, 2.4    | Stat, Analytics                            |
| FR-008             | 2.1, 3.3    | Integration, External APIs                 |
| FR-009             | 4.3         | Modular structure, Gradle, docs            |

**Standards Alignment**: ISO/IEC 42010:2011 (Architecture description), UML 2.5.1.

**Traceability**: See SORD and CIAR for requirements and code mapping.

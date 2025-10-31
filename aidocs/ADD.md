# Architecture Description Document (ADD)

## Version History
| Version | Date       | Author         | Changes                        |
|---------|------------|----------------|--------------------------------|
| 1.0     | 2025-10-31 | AI Doc System  | Initial version for WebJET CMS |

## 1. Introduction
### 1.1 Purpose
This document provides a detailed "As-Is" architecture of WebJET CMS, aiming to identify bottlenecks, coupling, and refactoring hotspots for modernization and maintainability. It supports architectural analysis, decision-making, and aligns with ISO/IEC 42010:2011 and UML 2.5.1 standards.

### 1.2 Scope
Covers all major architectural views of WebJET CMS: module, layered, deployment, and data views. Includes cross-cutting concerns (security, performance, maintainability) and traceability to requirements (SORD).

### 1.3 Viewpoints
- Logical (module/component)
- Layered (presentation, business, data)
- Deployment (physical infrastructure)
- Data (flow and persistence)

### 1.4 Stakeholders and Concerns
| Stakeholder        | Concern                                         |
|--------------------|-------------------------------------------------|
| Content Editors    | Usability, AI features, multi-language support  |
| Site Admins        | Security, reliability, multi-domain management  |
| Developers         | Codebase modernization, API, integrations       |
| Business Owners    | ROI, e-commerce, analytics                      |
| E-commerce Managers| Payment, product management, statistics         |
| IT Security        | Vulnerabilities, authentication, compliance     |
| End Users          | Performance, accessibility, content quality     |

## 2. Architectural Views
### 2.1 Module View
WebJET CMS is decomposed into modular components, each responsible for distinct functional areas. The main modules are:
- **Core**: sk.iway.iwcm (Spring-based core logic)
- **Legacy**: src/webjet8 (older JSP/Java, being phased out)
- **Applications**: E-shop, surveys, galleries, forms, statistics, AB testing
- **AI Assistant**: Integrated content tools (grammar, translation, headlines, images)
- **Frontend**: JSP/Thymeleaf templates, DataTables.net integration
- **Admin**: User management, configuration, audit
- **API**: REST endpoints, external integrations

~~~mermaid
flowchart TD
    Core[Core: sk.iway.iwcm]
    Legacy[Legacy: src/webjet8]
    Apps[Applications]
    AI[AI Assistant]
    Frontend[Frontend]
    Admin[Admin]
    API[API]
    Core --> Apps
    Core --> AI
    Core --> Frontend
    Core --> Admin
    Core --> API
    Legacy --> Core
    Apps --> Frontend
    Admin --> API
~~~

### 2.2 Layered View
WebJET CMS follows a classic n-tier architecture:
- **Presentation Layer**: JSP/Thymeleaf, DataTables, REST controllers
- **Business Layer**: Spring services, business logic modules
- **Data Layer**: Spring Data JPA, Hibernate, Lucene, POI, DB connectors

~~~mermaid
flowchart TD
    Presentation --> Business
    Business --> Data
~~~

### 2.3 Deployment View
WebJET CMS is typically deployed on Tomcat 9+ (moving to Tomcat 11+), with Java 17, PostgreSQL/MariaDB/Oracle DB. Supports cloud, on-prem, and multi-domain setups.

~~~mermaid
flowchart TD
    User[Web Browser]
    Tomcat[Tomcat Server]
    App[WebJET CMS App]
    DB[(Database: PostgreSQL/MariaDB/Oracle)]
    User --> Tomcat
    Tomcat --> App
    App --> DB
~~~

### 2.4 Data View
Data flows from user input through the presentation layer, processed by business logic, and persisted in the database. Lucene is used for search indexing; DataTables for frontend data manipulation.

~~~mermaid
flowchart TD
    Input[User Input]
    UI[UI Layer]
    Logic[Business Logic]
    DB[Database]
    Search[Lucene Index]
    Input --> UI --> Logic --> DB
    Logic --> Search
~~~

## 3. Architecture Decisions
### 3.1 Design Rationale
- Monolithic core for simplicity and maintainability
- Modular applications for extensibility
- Spring Framework for modern Java development
- Gradual migration from legacy (Struts/JSP) to Spring/Thymeleaf
- RESTful APIs for integration and headless scenarios
- DataTables.net for rich frontend tables
- Lucene for full-text search

### 3.2 Patterns Used
| Pattern      | Description                 | Rationale                                    |
|-------------|-----------------------------|-----------------------------------------------|
| MVC         | Model-View-Controller       | Separation of concerns, maintainability       |
| N-tier      | Layered architecture        | Scalability, testability, modularity          |
| Modular     | Pluggable applications      | Extensibility, custom business logic          |
| REST        | RESTful API endpoints       | Integration, automation, headless CMS         |
| Repository  | Data access abstraction     | DB flexibility, testability                   |
| Singleton   | Config/cache management     | Resource efficiency, global state             |

### 3.3 Interfaces
| Interface                  | Type         | Details                                                |
|----------------------------|--------------|--------------------------------------------------------|
| REST API                   | HTTP/JSON    | /api/* endpoints for content, admin, apps              |
| Database                   | JDBC/JPA     | PostgreSQL, MariaDB, Oracle; Spring Data JPA           |
| AI Assistant               | Internal/Ext | Integrated with DeepL, custom endpoints                |
| Admin UI                   | Web/JSP      | /admin/*, DataTables, authentication                   |
| Application Plugins        | Internal     | Modular apps (eshop, surveys, galleries, forms, etc.)  |
| Search                     | Lucene       | Full-text search indexing                              |
| File Upload                | HTTP         | Drag-and-drop, multipart upload                        |
| Frontend Templates         | JSP/Thymeleaf| Customizable site structure, themes                    |

## 4. Cross-Cutting Concerns
### 4.1 Security
- Advanced security filters (OWASP, custom)
- Authentication: password, 2-step verification
- Authorization: role-based, domain/tag separation
- Vulnerability protection: dependency checks, admin URL filtering
- Planned: OAuth2, SAML, PassKeys (see ROADMAP)

### 4.2 Performance
- Optimized HTML output for SEO
- DataTables.net for efficient frontend tables
- Lucene for fast search
- HikariCP for DB connection pooling
- Profiling via monitoring tools (see README)
- Target: <2s page load under peak load

### 4.3 Maintainability
- Modular structure (Spring, applications)
- Gradual migration from legacy code
- Code coverage (Jacoco, Allure)
- Cyclomatic complexity monitored (see CIAR)
- Automated tests, code formatting (ROADMAP)
- Documentation: English, Czech, Slovak

## 5. Appendices
### A. Diagrams Index
- Module diagram: Section 2.1
- Layered diagram: Section 2.2
- Deployment diagram: Section 2.3
- Data flow diagram: Section 2.4

### B. Traceability to SORD
| SORD Requirement ID | Architectural Element                | Section |
|--------------------|--------------------------------------|---------|
| FR-001             | Presentation Layer, Admin UI         | 2.2, 3.3|
| FR-002             | AI Assistant, API                    | 2.1, 3.3|
| FR-003             | Applications, Business Layer         | 2.1, 2.2|
| FR-004             | Frontend Templates, Data Layer       | 2.1, 2.4|
| FR-005             | Application Plugins                  | 2.1, 3.3|
| FR-006             | File Upload Interface                | 3.3     |
| FR-007             | Statistics Application, Data Layer   | 2.1, 2.4|
| FR-008             | Multi-domain, Tag Separation         | 4.1     |
| FR-009             | E-commerce Application               | 2.1, 3.3|
| FR-010             | Security Layer, Admin UI             | 4.1     |
| FR-011             | Responsive UI, Frontend              | 2.1, 2.2|
| FR-012             | Application Visibility Control       | 3.3     |
| FR-013             | Custom Fields, Data Layer            | 2.4     |
| FR-014             | DataTables Integration               | 2.1, 2.2|
| FR-015             | Audit, Change Tracking               | 4.3     |

**Standards Alignment**: ISO/IEC 42010:2011 (Architecture description), UML 2.5.1.

**Traceability**: [SORD](aidocs/SORD.md), [CIAR](aidocs/CIAR.md), [ROADMAP](docs/en/ROADMAP.md), [README](README.md)

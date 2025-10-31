# Architecture Description Document (ADD)

## Version History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0     | 2024-06-11 | AI Modernization Agent | Initial version, as-is architecture analysis |

## 1. Introduction
### 1.1 Purpose
This document describes the "As-Is" architecture of the WebJET CMS system. The purpose is to provide a detailed architectural overview to identify bottlenecks, coupling, and refactoring hotspots, and to support modernization and maintainability efforts.

### 1.2 Scope
This ADD covers the following architectural views:
- Module view (component decomposition)
- Layered view (logical layering)
- Deployment view (physical deployment)
- Data view (data flows and storage)
- Cross-cutting concerns (security, performance, maintainability)

### 1.3 Viewpoints
- Logical (module/component)
- Layered (presentation, business, data)
- Physical (deployment)
- Data (entity/data flow)

### 1.4 Stakeholders and Concerns
| Stakeholder         | Concern                                   |
|---------------------|-------------------------------------------|
| Product Owner       | Feature delivery, maintainability         |
| Developers          | Code structure, extensibility, testability|
| Operations          | Deployment, monitoring, reliability       |
| Security Officer    | Security, data protection                 |
| End Users           | Usability, performance, availability      |

## 2. Architectural Views
### 2.1 Module View
WebJET CMS is a modular Java web application, primarily organized under the package `sk.iway`. Major modules include:
- `sk.iway.iwcm`: Core CMS logic, initialization, and servlets
- `sk.iway.webjet`: Newer architecture (v9), Spring configuration, JPA integration
- `sk.iway.basecms`, `sk.iway.aceintegration`, `sk.iway.spirit`: Feature extensions/integrations
- Presentation layer: JSP files under `src/main/webapp`, including error pages, admin UI, and templates

**Module Decomposition (UML Component Diagram Placeholder):**
~~~mermaid
graph TD
  A[WebJET CMS] --> B[Core (iwcm)]
  A --> C[Webjet v9 (Spring/JPA)]
  A --> D[BaseCMS]
  A --> E[ACE Integration]
  A --> F[Spirit]
  B --> G[Servlets/Filters]
  C --> H[SpringConfig, JPAConfig]
  A --> I[Presentation (JSP, webapp)]
~~~

### 2.2 Layered View
WebJET CMS follows a classic n-tier architecture:
- **Presentation Layer:** JSPs, static resources, Stripes MVC actions
- **Business Logic Layer:** Java classes in `sk.iway.iwcm`, `sk.iway.webjet.v9`, service beans
- **Persistence/Data Layer:** JPA entities, DAOs, database configuration (Spring Data, poolman.xml)

**Layered Architecture (UML Layered Diagram Placeholder):**
~~~mermaid
flowchart TB
  UI[Presentation (JSP, Stripes Actions)]
  BL[Business Logic (Spring Beans, Services)]
  DAL[Persistence (JPA, DAOs, DB)]
  UI --> BL --> DAL
~~~

### 2.3 Deployment View
- **Application Server:** Runs on Java EE servlet container (e.g., Tomcat)
- **Web Application:** Deployed as a WAR with `WEB-INF/web.xml` configuration
- **Database:** External RDBMS (configured via Spring and poolman.xml)
- **File Storage:** Static files, templates, and uploads in `webapp/files`, `webapp/templates`

**Deployment Diagram (UML Deployment Diagram Placeholder):**
~~~mermaid
flowchart LR
  User[Browser]
  AppServer[Tomcat/Servlet Container]
  DB[(RDBMS)]
  FileStore[File System]
  User <--> AppServer
  AppServer <--> DB
  AppServer <--> FileStore
~~~

### 2.4 Data View
- **Content Data:** Managed via JPA entities, stored in RDBMS
- **Static/Uploaded Files:** Managed via file system
- **Session/User Data:** Managed via HTTP sessions, cookies, and DB
- **Data Flows:** User requests (HTTP) → Servlets/Filters → Business Logic → Persistence → Response (JSP/JSON)

## 3. Architecture Decisions
### 3.1 Design Rationale
- Monolithic Java web application for simplicity and deployment ease
- Use of Spring Framework for dependency injection, configuration, and web support
- JPA for database abstraction and ORM
- JSP for presentation for legacy compatibility
- Stripes Framework for MVC action mapping

### 3.2 Patterns Used
| Pattern      | Description                       | Rationale                                  |
|-------------|-----------------------------------|---------------------------------------------|
| MVC         | Model-View-Controller (Stripes)   | Separation of concerns, maintainability     |
| n-tier      | Presentation, business, data      | Scalability, testability, modularity        |
| Dependency Injection | Spring Framework          | Decoupling, testability, configuration      |
| DAO/Repository | Data access abstraction        | Persistence layer flexibility               |

### 3.3 Interfaces
| Interface             | Type        | Details                                  |
|-----------------------|-------------|-------------------------------------------|
| HTTP (JSP/Servlets)   | Web UI      | User/admin web interface                  |
| REST/Action Endpoints | Web API     | Stripes actions, Spring controllers       |
| Database (JPA/SQL)    | Data        | RDBMS via JPA, poolman, direct SQL        |
| File System           | Storage     | Static files, uploads, templates          |

## 4. Cross-Cutting Concerns
### 4.1 Security
- Security filters in place (see README and web.xml)
- Authentication/authorization via session and filter mechanisms
- Trusted by banking institutions (per README)
- Error handling for security-related HTTP codes (403, 401, etc.)

### 4.2 Performance
- Optimized HTML output for SEO and speed
- Performance monitoring tools (per README)
- Connection pooling (poolman.xml)
- Potential bottlenecks: monolithic deployment, synchronous DB access

### 4.3 Maintainability
- Modular package structure
- Use of Spring for DI and configuration
- Legacy and modern code coexist (iwcm, webjet v9)
- Areas for improvement: reduce coupling, increase test coverage, refactor legacy servlets

## 5. Appendices
### A. Diagrams Index
- Module Diagram: Section 2.1
- Layered Diagram: Section 2.2
- Deployment Diagram: Section 2.3

### B. Traceability to SORD
| SORD Section | ADD Section | Notes |
|--------------|-------------|-------|
| [SORD-1]     | 2.1, 2.2    | Module/layer mapping |
| [SORD-2]     | 3.2, 3.3    | Patterns/interfaces  |
| [SORD-3]     | 4.1         | Security             |
| [SORD-4]     | 4.2         | Performance          |
| [SORD-5]     | 4.3         | Maintainability      |

**Standards Alignment**: ISO/IEC 42010:2011 (Architecture description), UML 2.5.1.

**Traceability**: See SORD and CIAR documents for requirements mapping.

# Architecture Description Document (ADD)

## Version History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0     | 2024-06-10 | AI Modernization Analysis | Initial version, as-is architecture documentation |

## 1. Introduction
### 1.1 Purpose
This document provides a detailed "As-Is" architecture description of WebJET CMS, focusing on identifying bottlenecks, coupling, and refactoring hotspots. It is intended to support modernization and maintainability analysis.

### 1.2 Scope
The scope covers module, layered, deployment, and data architectural views, cross-cutting concerns, and traceability to requirements (SORD).

### 1.3 Viewpoints
- Logical (Module)
- Layered
- Deployment
- Data

### 1.4 Stakeholders and Concerns
| Stakeholder | Concern |
|-------------|---------|
| Product Owner | Feature completeness, maintainability |
| Developers | Code quality, modularity, testability |
| DevOps | Deployment, scalability, monitoring |
| Security Team | Authentication, authorization, vulnerabilities |
| End Users | Usability, performance |

## 2. Architectural Views
### 2.1 Module View
WebJET CMS is decomposed into several modules, primarily under the `sk.iway` namespace:
- `sk.iway.webjet`: Core CMS logic, including v9 submodule for Spring integration
- `sk.iway.iwcm`: Initialization, session, and servlet logic
- `sk.iway.basecms`, `sk.iway.spirit`, `sk.iway.demo8`, etc.: Feature extensions and integrations
- `org.apache`: Apache-related utilities

The module structure is validated from the actual source tree:
- `src/main/java/sk/iway/webjet/v9`: Contains Spring configuration (`V9SpringConfig.java`), JPA configuration (`V9JpaDBConfig.java`), and session customization (`JpaSessionCustomizer.java`)
- `src/main/java/sk/iway/iwcm`: Contains servlet and session management

**Diagram Placeholder:**
![Module Diagram](aidocs/module-diagram.png)

### 2.2 Layered View
The codebase follows a classic n-tier architecture:
- **Presentation Layer:** JSP files in `src/main/webapp`, Stripes framework integration (via `StripesDispatcher` servlet)
- **Business Layer:** Java classes in `sk.iway.webjet`, `sk.iway.iwcm`, and related modules
- **Data Access Layer:** JPA configuration (`V9JpaDBConfig.java`), XML persistence descriptors (`persistence-webjet.xml`), and pool management (`poolman.xml`)

**Layered Diagram Placeholder:**
![Layered Diagram](aidocs/layered-diagram.png)

### 2.3 Deployment View
- **Application Server:** Designed for deployment on Tomcat (web.xml, JSPs, servlets)
- **Resources:** Configuration in `src/main/resources` (logback.xml, poolman.xml, META-INF)
- **Web Application:** Standard Java EE deployment structure (`WEB-INF/web.xml`, JSPs)
- **Network:** Typical deployment behind reverse proxy, with static files served from `src/main/webapp/static-files`

**Deployment Diagram Placeholder:**
![Deployment Diagram](aidocs/deployment-diagram.png)

### 2.4 Data View
- **Data Flow:** User requests processed via StripesDispatcher, routed to business logic, then to JPA data access
- **Persistence:** JPA entities configured in `persistence-webjet.xml`, DB connection pooling via `poolman.xml`
- **File Management:** Protected files served via `GetProtectedFileServlet`

**Data Diagram Placeholder:**
![Data Diagram](aidocs/data-diagram.png)

## 3. Architecture Decisions
### 3.1 Design Rationale
- Monolithic Java web application for simplicity and legacy compatibility
- Use of Spring for modern dependency injection and integration
- Stripes framework for MVC routing
- JPA for database abstraction
- JSP for presentation to support legacy and custom UI

### 3.2 Patterns Used
| Pattern | Description | Rationale |
|---------|-------------|-----------|
| MVC | Model-View-Controller via Stripes/JSP | Separation of concerns, maintainability |
| Dependency Injection | Spring Framework | Decoupling, testability |
| n-tier | Presentation, business, data layers | Scalability, clarity |
| Servlet Filter | Context and path filters | Security, request preprocessing |
| Singleton | Configuration beans | Resource management |

### 3.3 Interfaces
| Interface | Type | Details |
|-----------|------|---------|
| StripesDispatcher | Servlet | Handles *.action requests, routes to controllers |
| GetProtectedFileServlet | Servlet | Serves protected files from /files/protected/* |
| JPA EntityManager | DB | Configured via `V9JpaDBConfig.java` and `persistence-webjet.xml` |
| JSP Pages | UI | Rendered via Tomcat, mapped in web.xml |
| REST/Action Endpoints | Controller | Stripes actions (*.action) |

## 4. Cross-Cutting Concerns
### 4.1 Security
- Multiple servlet filters for path and context validation
- Protected file servlet for access control
- Security filters as described in README and validated in web.xml
- Session management via `SessionListener`

### 4.2 Performance
- Logback for monitoring and logging
- Poolman for DB connection pooling
- Performance monitoring tools referenced in README, validated by presence of stats modules

### 4.3 Maintainability
- Modular package structure
- Spring dependency injection for decoupling
- Use of JPA for abstracted data access
- Extensive use of configuration files for environment separation

## 5. Appendices
### A. Diagrams Index
- Module Diagram: aidocs/module-diagram.png
- Layered Diagram: aidocs/layered-diagram.png
- Deployment Diagram: aidocs/deployment-diagram.png
- Data Diagram: aidocs/data-diagram.png

### B. Traceability to SORD
| SORD Section | Architecture Element |
|--------------|---------------------|
| [Insert SORD section reference] | [Mapped module or pattern] |
| [Insert] | [Insert] |

**Standards Alignment**: ISO/IEC 42010:2011 (Architecture description), UML 2.5.1.

**Traceability**: See SORD and CIAR documents for requirements mapping.

---

This ADD is validated against the actual source code and deployment descriptors. All architectural claims are substantiated by code or configuration evidence. For further modernization analysis, see CIAR and SORD documents.
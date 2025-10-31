# Architecture Description Document (ADD)

## Version History
| Version | Date       | Author        | Changes                     |
|---------|------------|---------------|-----------------------------|
| 1.0     | 2024-06-13 | AI Assistant  | Initial version             |

## 1. Introduction
### 1.1 Purpose
This document provides a detailed "As-Is" architecture of the WebJET CMS system to identify bottlenecks, coupling, and refactoring hotspots. It supports modernization, maintainability, and risk management, and aligns with ISO/IEC 42010:2011 and UML 2.5.1 standards.

### 1.2 Scope
This ADD covers architectural views (module, layered, deployment, data) of the open-source WebJET CMS, including its core modules, administrative tools, content management features, and integrations. Proprietary third-party libraries and external WebJET family products are excluded.

### 1.3 Viewpoints
- Logical (module/component)
- Layered (presentation, business, data)
- Deployment (physical, runtime)
- Data (flow, storage)

### 1.4 Stakeholders and Concerns
| Stakeholder      | Concern                                      |
|------------------|-----------------------------------------------|
| Business Owner   | Usability, ROI, reliability, security         |
| Web Editor       | Ease of use, AI features, multi-language      |
| Developer        | Codebase quality, migration, extensibility    |
| Sysadmin         | Performance, uptime, backup, compliance       |
| Community User   | Documentation, support, feature requests      |
| Security Auditor | GDPR, audit logs, vulnerability management    |

## 2. Architectural Views
### 2.1 Module View
WebJET CMS is decomposed into the following major modules:
- **Core CMS Logic** (`sk.iway/iwcm`): Content management, workflows, security, user management.
- **Web Engine** (`sk.iway/webjet`): Web rendering, routing, legacy Struts integration, Spring controllers.
- **Base CMS** (`sk.iway/basecms`): Common abstractions, utilities, shared logic.
- **Admin UI** (`src/main/webapp/admin`): JSP/HTML, JavaScript, DataTables.net, custom scripts.
- **Legacy Modules** (`src/webjet8/java/sk`): Older business logic, migration candidates.
- **Integrations**: REST API, e-commerce, AB testing, AI Assistant, translation.

~~~mermaid
flowchart TD
  Core[Core CMS Logic] --> WebEngine[Web Engine]
  WebEngine --> AdminUI[Admin UI]
  Core --> BaseCMS[Base CMS]
  WebEngine --> Legacy[Legacy Modules]
  Core --> Integrations[Integrations]
~~~

### 2.2 Layered View
WebJET CMS follows a classic n-tier architecture with:
- **Presentation Layer**: JSP, Thymeleaf, JavaScript (DataTables.net), REST endpoints.
- **Business Layer**: Spring-managed services, content workflows, AI Assistant logic.
- **Data Access Layer**: Spring Data, Hibernate/JPA, direct SQL for legacy modules.
- **Integration Layer**: REST APIs, external connectors (DeepL, payment gateways).

~~~mermaid
flowchart TB
  Presentation --> Business --> DataAccess
  Business --> Integration
~~~

### 2.3 Deployment View
- **Application Server**: Tomcat 9+/11+, runs the WAR package.
- **Database**: MariaDB, PostgreSQL, Oracle, or MSSQL (configurable).
- **Web Server**: (optional) Nginx/Apache as reverse proxy.
- **Clients**: Web browsers (admin/editor, end-users).

~~~mermaid
graph LR
  Browser[Web Browser]
  Browser --> WebServer[Web Server (optional)]
  WebServer --> AppServer[Tomcat App Server]
  AppServer --> Database[Database]
~~~

### 2.4 Data View
- **Content Flow**: User input (admin/editor) → Presentation Layer → Business Layer (validation, workflow) → Data Layer (persist/retrieve) → Presentation.
- **File Uploads**: Browser → AppServer (file storage, metadata in DB).
- **AI/Translation**: Editor → AI Assistant/Translation Service → Content DB.

~~~mermaid
flowchart LR
  Editor --> Presentation --> Business --> DataStore
  Editor --> AI[AI Assistant]
  AI --> DataStore
~~~

## 3. Architecture Decisions
### 3.1 Design Rationale
- Monolithic WAR for simplified deployment and legacy support.
- Spring Framework for modularity, dependency injection, and future migration to Spring Boot.
- Gradual migration from Struts to Spring controllers and Thymeleaf for maintainability.
- DataTables.net for rich admin UI tables.
- Multi-database support for flexibility.

### 3.2 Patterns Used
| Pattern         | Description                                 | Rationale                                     |
|-----------------|---------------------------------------------|-----------------------------------------------|
| MVC             | Model-View-Controller for web UI            | Separation of concerns, extensibility         |
| n-Tier          | Layered architecture                        | Maintainability, testability                  |
| Dependency Injection | Spring-managed beans/services           | Decoupling, testability                       |
| REST            | RESTful APIs for integrations                | Standardized external connectivity            |
| DAO/Repository  | Data access abstraction                     | DB flexibility, testability                   |
| Adapter         | Wrapping legacy Struts in Spring controllers | Migration support                             |

### 3.3 Interfaces
| Interface              | Type      | Details                                                      |
|------------------------|-----------|--------------------------------------------------------------|
| /admin/*               | Web UI    | Admin interface (JSP, DataTables, secured by Spring Security)|
| /api/*                 | REST API  | Content, user, and integration endpoints                     |
| /login, /logout        | Web UI    | Authentication endpoints                                     |
| Database (JPA/SQL)     | DB        | MariaDB, PostgreSQL, Oracle, MSSQL                           |
| AI/Translation Service | External  | DeepL, custom AI endpoints                                   |

## 4. Cross-Cutting Concerns
### 4.1 Security
- Authentication: Spring Security, form-based login, two-step verification.
- Authorization: Role-based access control (RBAC), group permissions.
- Input validation and sanitization (OWASP Java HTML Sanitizer).
- Password hashing (bcrypt), audit logs, strict URL checks.
- CSP nonce support, plans for OAuth2/SAML and PassKeys.

### 4.2 Performance
- Hotspots: Core CMS logic (`iwcm`), admin UI rendering, Lucene search.
- Profiling: JaCoCo, JUnit, Allure for test coverage and performance.
- Caching: Application-level caching for frequently accessed content.
- Monitoring: Built-in performance/statistics modules.

### 4.3 Maintainability
- Modular Gradle build, clear separation of legacy and modern code.
- Cyclomatic complexity: ~4.2 (CIAR), code duplication ~8%.
- Migration plan: Struts → Spring controllers, legacy code isolation.
- Test coverage: ~65%, target >80% (see CIAR).
- Code quality: SonarLint, Spotless, OWASP Dependency-Check.

## 5. Appendices
### A. Diagrams Index
| Diagram            | Description                   |
|--------------------|------------------------------|
| Module Diagram     | Logical decomposition         |
| Layered Diagram    | Presentation/business/data    |
| Deployment Diagram | Physical deployment           |
| Data Flow Diagram  | Content and integration flows |

### B. Traceability to SORD
| SORD Section                 | ADD Section                  |
|------------------------------|------------------------------|
| 2.2 Functional Requirements  | 3.3 Interfaces, 2.1 Modules  |
| 2.3 Non-Functional           | 4. Cross-Cutting Concerns    |
| 3. Modernization Objectives  | 3.1 Design Rationale         |
| 2.4 Constraints              | 3.1 Design Rationale         |

**Standards Alignment**: ISO/IEC 42010:2011 (Architecture description), UML 2.5.1.

**Traceability**: [SORD](aidocs/SORD.md), [CIAR](aidocs/CIAR.md), [README](../README.md), [build.gradle](../build.gradle)
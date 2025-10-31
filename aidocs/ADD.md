# Architecture Description Document (ADD)

## Version History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0     | 2024-06-01 | AI Modernization Analysis | Initial version |

## 1. Introduction
### 1.1 Purpose
This document provides a detailed "As-Is" architecture of the WebJET CMS system to identify bottlenecks, coupling, and refactoring hotspots. It supports modernization analysis and guides future architectural decisions.

### 1.2 Scope
Covers module, layered, deployment, and data views for the WebJET CMS repository. Includes cross-cutting concerns and traceability to requirements (SORD).

### 1.3 Viewpoints
- Logical (Module)
- Layered
- Deployment (Physical)
- Data

### 1.4 Stakeholders and Concerns
| Stakeholder        | Concern                                 |
|--------------------|-----------------------------------------|
| Product Owner      | Feature completeness, maintainability   |
| Developers         | Code structure, extensibility           |
| Security Officer   | Security, compliance                    |
| Operations         | Deployment, monitoring, performance     |
| End Users          | Usability, reliability                  |

## 2. Architectural Views
### 2.1 Module View
WebJET CMS is decomposed into multiple Java packages, each representing a functional module:
- `sk.iway.iwcm.admin`: Admin panel and management features
- `sk.iway.iwcm.components`: Pluggable content components (surveys, galleries, etc.)
- `sk.iway.iwcm.dmail`: Email and notification services
- `sk.iway.iwcm.doc`: Document management
- `sk.iway.iwcm.editor`: Content editing tools
- `sk.iway.iwcm.filebrowser`: File management
- `sk.iway.iwcm.findexer`: File indexing/search
- `sk.iway.iwcm.i18n`: Internationalization
- `sk.iway.iwcm.search`: Search functionality
- `sk.iway.iwcm.setup`: Initial setup and configuration
- `sk.iway.iwcm.stat`: Statistics and analytics
- `sk.iway.iwcm.system`: System-level utilities
- `sk.iway.iwcm.tags`: Custom JSP tags
- `sk.iway.iwcm.update`: Update management
- `sk.iway.iwcm.users`: User management/authentication
- `sk.iway.iwcm.xls`: Excel export/import

~~~mermaid
flowchart TD
    Admin[Admin] --> Components
    Components --> Editor
    Editor --> Filebrowser
    Filebrowser --> Doc
    Doc --> Users
    Users --> System
    System --> Stat
    Stat --> Search
    Search --> Setup
    Setup --> Update
    Update --> Tags
    Tags --> I18n
    I18n --> Findexer
    Findexer --> Xls
~~~

### 2.2 Layered View
WebJET CMS follows a classic n-tier architecture, primarily:
- **Presentation Layer**: JSP/Thymeleaf, custom tags, webapp resources
- **Business Logic Layer**: Java services (Spring Framework, custom logic)
- **Data Access Layer**: Spring Data, Hibernate/JPA, direct SQL utilities
- **Integration Layer**: REST APIs, external connectors (e.g., email, payment)

~~~mermaid
flowchart LR
    Presentation --> Business
    Business --> DataAccess
    Business --> Integration
    DataAccess --> Database[(DB)]
    Integration --> ExternalServices[(External)]
~~~

### 2.3 Deployment View
WebJET CMS is deployed as a Java WAR file on Tomcat 9 (via Gretty plugin). It supports deployment on-premises or in cloud VMs. The system relies on:
- Tomcat 9 servlet container
- MariaDB/PostgreSQL/Oracle DB
- JVM (Java 17)
- Optional integrations (SMTP, external APIs)

~~~mermaid
flowchart TD
    User --> Browser
    Browser --> Tomcat
    Tomcat --> JVM
    Tomcat --> DB[(MariaDB/PostgreSQL/Oracle)]
    Tomcat --> SMTP[(Mail)]
    Tomcat --> ExternalAPI[(External APIs)]
~~~

### 2.4 Data View
Data flows from user input (browser) through the presentation layer, processed by business logic, and persisted via Spring Data JPA. Key entities include users, documents, statistics, and configuration.

- Relational DB tables for users, documents, content, statistics
- JSON for API payloads (see `JsonTools.java`)
- File uploads managed via filebrowser module

## 3. Architecture Decisions
### 3.1 Design Rationale
- Java/Spring chosen for reliability, ecosystem, and scalability
- Modular structure for maintainability and extensibility
- N-tier separation to reduce coupling
- Use of Gretty/Tomcat for flexible local/cloud deployment
- Security filters and Spring Security for robust access control

### 3.2 Patterns Used
| Pattern         | Description                       | Rationale                           |
|-----------------|-----------------------------------|-------------------------------------|
| MVC             | Model-View-Controller (JSP/Java)  | Separation of concerns              |
| N-Tier          | Layered architecture              | Maintainability, scalability        |
| Dependency Injection | Spring Framework DI           | Testability, loose coupling         |
| Plugin/Component| Pluggable modules/components      | Extensibility, customization        |
| Singleton       | Utility/service classes           | Resource sharing, global config     |

### 3.3 Interfaces
| Interface           | Type      | Details                                  |
|---------------------|-----------|------------------------------------------|
| REST API            | HTTP      | CRUD endpoints for content, users        |
| JSP Custom Tags     | JSP       | UI widgets, reusable server-side logic   |
| Database            | SQL/JPA   | MariaDB/PostgreSQL/Oracle schemas        |
| File Upload         | HTTP      | Multipart/form-data via filebrowser      |
| SMTP Integration    | Email     | Notification, password reset, etc.       |
| External API        | HTTP      | Payment, analytics, etc.                 |

## 4. Cross-Cutting Concerns
### 4.1 Security
- Spring Security for authentication/authorization
- Custom security filters (see README)
- OWASP dependency check integration
- Input validation and HTML sanitization
- Role-based access for admin/user features

### 4.2 Performance
- Performance monitoring tools (see README)
- Use of connection pooling (HikariCP)
- Caching for frequently accessed data
- Profiling via Jacoco and Gradle test-logger

### 4.3 Maintainability
- Modular package structure
- Use of Lombok for reduced boilerplate
- Automated license and dependency reporting
- Code coverage via Jacoco
- Cyclomatic complexity managed via test coverage and static analysis

## 5. Appendices
### A. Diagrams Index
- Module View: Mermaid diagram (Section 2.1)
- Layered View: Mermaid diagram (Section 2.2)
- Deployment View: Mermaid diagram (Section 2.3)

### B. Traceability to SORD
| SORD Section            | Architecture Mapping         |
|-------------------------|-----------------------------|
| Content Management      | sk.iway.iwcm.editor, doc    |
| User Management         | sk.iway.iwcm.users          |
| Security Requirements   | Security filters, SpringSec |
| Performance Requirements| HikariCP, monitoring tools  |
| Extensibility           | Component/plugin pattern     |

**Standards Alignment**: ISO/IEC 42010:2011 (Architecture description), UML 2.5.1.

**Traceability**: SORD, CIAR, source code, README, build.gradle

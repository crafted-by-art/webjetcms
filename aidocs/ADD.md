# Architecture Description Document (ADD)

## 1. Introduction

### 1.1 Purpose
This Architecture Description Document (ADD) provides a comprehensive architectural analysis of the WebJET CMS system, following ISO/IEC 42010:2011 and UML 2.5.1 standards. It is intended for stakeholders, developers, and modernization teams to understand the system’s structure, design rationale, and cross-cutting concerns.

### 1.2 Scope
WebJET CMS is an open-source content management system for business websites, e-shops, and portals. It is designed for scalability, security, and ease of integration, supporting both technical and non-technical users.

### 1.3 References
- [System Overview and Requirements Document (SORD)](aidocs/SORD.md)
- [Code Inventory and Analysis Report (CIAR)](aidocs/CIAR.md)
- [WebJET CMS Repository](https://github.com/crafted-by-art/webjetcms)
- [WebJET CMS Documentation](https://docs.webjetcms.sk/)
- [ISO/IEC 42010:2011](https://www.iso.org/standard/50508.html)

---

## 2. Architectural Views

### 2.1 Module View

#### 2.1.1 Structure
The WebJET CMS codebase is organized into modular Java packages, each encapsulating a distinct functional area. Major modules include:
- **iwcm**: Core CMS logic and configuration
- **admin**: Administration UI and backend
- **common**: Shared utilities and helpers
- **components**: Pluggable CMS components (forms, discussions, surveys, etc.)
- **filebrowser**: File upload and management
- **users**: User management and authentication
- **stat**: Web traffic analytics
- **editor**: Content editing tools
- **search**: Search and indexing
- **setup**: System setup and configuration
- **update**: System updates and migration
- **i18n**: Localization and internationalization

#### 2.1.2 Module Dependencies
Modules interact via well-defined interfaces, with dependency injection managed by the Spring Framework. Common dependencies include:
- Spring Core, Spring Data JPA, Spring Security
- AspectJ (AOP)
- Lombok (code reduction)
- DataTables.net (frontend)
- Jackson, Gson (JSON serialization)
- Hibernate Validator
- MariaDB/PostgreSQL JDBC drivers

~~~mermaid
graph TD
    iwcm --> admin
    iwcm --> common
    iwcm --> components
    iwcm --> filebrowser
    iwcm --> users
    iwcm --> stat
    iwcm --> editor
    iwcm --> search
    iwcm --> setup
    iwcm --> update
    iwcm --> i18n
    admin --> users
    admin --> components
    filebrowser --> admin
    users --> iwcm
~~~

#### 2.1.3 Design Rationale
- **Modularity** enables maintainability and extensibility.
- **Spring DI** ensures loose coupling and testability.
- **Separation of Concerns**: Each package addresses a specific domain.

### 2.2 Layered View

WebJET CMS follows a classic layered architecture:
- **Presentation Layer**: JSP/HTML/JS (DataTables.net), admin UI
- **Application Layer**: Controllers, business logic (Spring MVC)
- **Domain Layer**: Entities, services, CMS logic
- **Persistence Layer**: Spring Data JPA, Hibernate, JDBC
- **Integration Layer**: External APIs, WebJET family products

~~~mermaid
graph TD
    Presentation --> Application
    Application --> Domain
    Domain --> Persistence
    Application --> Integration
~~~

#### Layering Rationale
- **Layer isolation** improves maintainability
- **Spring MVC** provides clear separation between web and business logic
- **JPA/Hibernate** abstracts data access

### 2.3 Deployment View

#### 2.3.1 Deployment Topology
WebJET CMS is deployed as a Java web application (WAR) on Tomcat 9 (via Gretty plugin). Typical deployment includes:
- **Application Server**: Tomcat 9
- **Database**: MariaDB or PostgreSQL
- **Frontend**: Served via webapp resources, accessible via browser
- **CI/CD**: Gradle, GitHub Actions, OWASP Dependency Check

~~~mermaid
graph LR
    User --> Browser
    Browser --> Tomcat[Tomcat 9]
    Tomcat --> WebJET[WebJET CMS]
    WebJET --> DB[(MariaDB/PostgreSQL)]
~~~

#### 2.3.2 Configuration Files
- `build.gradle`, `settings.gradle`: Build and dependency management
- `dependency-check-suppressions.xml`: Security vulnerability suppression
- `gradle.properties`: Build properties
- `tomcat/`: Server configuration

### 2.4 Data View

#### 2.4.1 Data Model
- **Entities**: Page, User, File, Survey, Event, Discussion, Directory
- **Relationships**: Pages reference users, files, and embedded components
- **Persistence**: JPA entities mapped to relational tables

#### 2.4.2 Data Flow
- User requests processed via Spring MVC controllers
- Data validated and transformed in service layer
- Persisted via JPA repositories
- Analytics and monitoring data stored and retrieved for reporting

---

## 3. Architectural Patterns and Design Decisions

### 3.1 Patterns
- **Layered Architecture**: Separation of presentation, business, and data layers
- **Modular Monolith**: Modular packages within a single deployable unit
- **Dependency Injection**: Spring Framework
- **Aspect-Oriented Programming**: AspectJ for cross-cutting concerns
- **Repository Pattern**: Spring Data JPA
- **MVC**: Spring Web MVC for controllers and views

### 3.2 Key Decisions
- **Spring Framework**: Chosen for scalability, security, and community support
- **Tomcat**: Standard Java web server for deployment
- **Gradle**: Modern build tool for Java projects
- **Open Source Libraries**: Preference for well-supported, secure dependencies

---

## 4. Cross-Cutting Concerns

### 4.1 Security
- **Spring Security**: Role-based access control, authentication, authorization
- **OWASP Dependency Check**: Automated vulnerability scanning
- **HTML Sanitization**: OWASP Java HTML Sanitizer
- **GDPR Compliance**: Data protection and privacy features

### 4.2 Performance
- **Monitoring Tools**: Built-in performance analytics
- **Optimized HTML**: SEO and fast rendering
- **Database Connection Pooling**: HikariCP
- **Gradle Build Optimization**: Incremental builds, test coverage (Jacoco)

### 4.3 Maintainability
- **Modular Codebase**: Clear package boundaries
- **Lombok**: Reduces boilerplate
- **Test Coverage**: Jacoco, JUnit, Mockito
- **Documentation**: Comprehensive docs and code comments

### 4.4 Extensibility
- **Component Architecture**: Pluggable modules for forms, surveys, etc.
- **API Integration**: Support for external APIs and WebJET family products

---

## 5. Requirements Traceability

This section maps architectural elements to requirements from the SORD:

| SORD Req ID | Architectural Element | Description |
|-------------|----------------------|-------------|
| FR-1, FR-2, FR-3, FR-4, FR-5 | Presentation, Application, Domain Layers; Components | Content creation, editing, WYSIWYG, file upload, embedding |
| FR-6, FR-7 | Users Module, Spring Security | Authentication, user management |
| FR-8, FR-9 | Stat Module, Monitoring Tools | Analytics, performance monitoring |
| FR-10, FR-11 | Integration Layer, API Endpoints | Product integration, custom APIs |
| FR-12 | i18n Module | Localization |
| NFR-1, NFR-2, NFR-3 | Performance, Scalability | Concurrent access, load times, horizontal scaling |
| NFR-4, NFR-5, NFR-6 | Security | Filters, authentication, GDPR |
| NFR-7, NFR-8 | Reliability | Uptime, backups |
| NFR-9, NFR-10 | Usability | UI, documentation |
| NFR-11 | Maintainability | Modular code, documentation |
| MO-1 to MO-6 | Modernization | Spring migration, security, scalability, refactoring, API, UX |

---

## 6. UML Diagrams

### 6.1 High-Level Package Diagram
~~~mermaid
classDiagram
    class IWCM {
      +Admin
      +Common
      +Components
      +FileBrowser
      +Users
      +Stat
      +Editor
      +Search
      +Setup
      +Update
      +I18n
    }
    IWCM <|-- Admin
    IWCM <|-- Common
    IWCM <|-- Components
    IWCM <|-- FileBrowser
    IWCM <|-- Users
    IWCM <|-- Stat
    IWCM <|-- Editor
    IWCM <|-- Search
    IWCM <|-- Setup
    IWCM <|-- Update
    IWCM <|-- I18n
~~~

### 6.2 Deployment Diagram
~~~mermaid
flowchart LR
    User --> Browser
    Browser --> Tomcat[Tomcat 9]
    Tomcat --> WebJET[WebJET CMS]
    WebJET --> DB[(MariaDB/PostgreSQL)]
~~~

---

## 7. Design Rationale and Alternatives

- **Spring vs. Legacy Java**: Spring chosen for modern features, security, and community support
- **Gradle vs. Maven**: Gradle selected for flexibility and performance
- **Tomcat vs. Jetty**: Tomcat preferred for compatibility and stability
- **Monolith vs. Microservices**: Modular monolith enables easier migration and maintenance

---

## 8. Appendix

- [SORD](aidocs/SORD.md)
- [CIAR](aidocs/CIAR.md)
- [Full Dependency List](build.gradle)
- [Documentation](docs/, README.md, aidocs/)

---

*This ADD is generated in alignment with ISO/IEC 42010:2011 and UML 2.5.1 standards. For further details, refer to the SORD, CIAR, and project documentation.*

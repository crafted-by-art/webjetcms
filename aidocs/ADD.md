# Architecture Description Document (ADD)

## 1. Introduction

### 1.1 Document Purpose
This Architecture Description Document (ADD) provides a comprehensive analysis of the architecture for the WebJET CMS repository. It follows ISO/IEC 42010:2011 and UML 2.5.1 standards, detailing architectural views, patterns, design decisions, cross-cutting concerns, and traceability to requirements.

### 1.2 System Context
WebJET CMS is an enterprise-grade, open-source content management system (CMS) built on Java and Spring technologies. It supports business websites, e-shops, and portals, with a focus on security, scalability, and user-friendly content management.

### 1.3 References
- [System Overview and Requirements Document (SORD)](aidocs/SORD.md)
- [Code Inventory and Analysis Report (CIAR)](aidocs/CIAR.md)
- [WebJET CMS GitHub Repository](https://github.com/crafted-by-art/webjetcms)
- [ISO/IEC 42010:2011](https://www.iso.org/standard/50508.html)
- [UML 2.5.1](https://www.omg.org/spec/UML/2.5.1)

---

## 2. Stakeholders and Concerns

| Stakeholder         | Concern                        |
|---------------------|--------------------------------|
| Business Owners     | Security, reliability, usability|
| Content Editors     | Ease of use, content workflow   |
| Developers          | Extensibility, maintainability  |
| Administrators      | Monitoring, audit, configuration|
| End Users           | Performance, accessibility      |

---

## 3. Architectural Patterns & Design Decisions

### 3.1 Patterns
- **Layered Architecture**: Presentation, Business Logic, Data Access
- **Modularization**: Feature modules (admin, editor, filebrowser, etc.)
- **MVC (Model-View-Controller)**: Spring MVC for web requests
- **Plugin Architecture**: Extensible via plugins and custom apps
- **Security Filters**: Spring Security, custom filters
- **RESTful Services**: API endpoints for integration
- **Legacy Integration**: Stripes and legacy modules (migration ongoing)

### 3.2 Design Decisions
- **Spring Framework**: Chosen for scalability, reliability, and ecosystem
- **Java 17**: Modern language features and performance
- **JSP/Thymeleaf/Freemarker**: Mixed templating for flexibility; migration towards Thymeleaf/Freemarker recommended
- **Database Agnostic**: JDBC abstraction for MariaDB, PostgreSQL, Oracle, SQL Server
- **OWASP Dependency Check**: Active vulnerability management
- **Gradle Build**: Modern build and dependency management

---

## 4. Architectural Views

### 4.1 Layered View

~~~mermaid
graph TD
  A[Presentation Layer]
  B[Business Logic Layer]
  C[Data Access Layer]
  D[External Integrations]
  E[Plugins]
  F[Legacy Modules]

  A --> B
  B --> C
  B --> E
  B --> D
  B --> F
  C --> DB[(Database)]
~~~

#### Description
- **Presentation Layer**: JSP, Thymeleaf, Freemarker views; DataTables.net; CKEditor
- **Business Logic Layer**: Spring MVC controllers, services, security, workflow
- **Data Access Layer**: Spring Data, JPA, JDBC
- **External Integrations**: REST APIs, payment gateways, AI assistants
- **Plugins**: Custom apps, extensions
- **Legacy Modules**: Stripes, older utility classes (migration target)

### 4.2 Module View

- **Core Modules**: `sk.iway.iwcm.*` (admin, common, components, doc, editor, filebrowser, findexer, i18n, io, search, setup, stat, system, tags, update, users, xls)
- **Admin Module**: User and role management, configuration
- **Editor Module**: Content creation, AI assistant integration
- **Filebrowser Module**: File management, uploads
- **Search Module**: Lucene-based search
- **Stat Module**: Analytics and monitoring
- **System Module**: Core system utilities, context filters
- **Legacy Module**: `src/webjet8/java` (migration target)

### 4.3 Deployment View

- **Application Server**: Tomcat 9 (default), Jetty supported
- **Build System**: Gradle
- **Deployment Artifacts**: WAR file, Dockerization possible
- **Configuration**: `web.xml` for servlet/filter mappings, error pages, listeners
- **Database**: MariaDB, PostgreSQL, Oracle, SQL Server
- **External Services**: AI APIs, payment gateways

~~~mermaid
graph LR
  WAR[WebJET CMS WAR]
  Tomcat[Tomcat 9]
  DB[(Database)]
  AI[AI Services]
  Payment[Payment Gateway]

  WAR --> Tomcat
  Tomcat --> DB
  Tomcat --> AI
  Tomcat --> Payment
~~~

### 4.4 Data View

- **Content Data**: Pages, blocks, news, files, forms
- **User Data**: Users, roles, permissions
- **Analytics Data**: Traffic, performance stats
- **Audit Data**: Change history, logs
- **E-commerce Data**: Products, orders, payments
- **Internationalization Data**: Language-specific content, domain mapping

---

## 5. Cross-Cutting Concerns

### 5.1 Security
- **Spring Security**: Authentication, authorization
- **Custom Filters**: PathFilter, ContextFilter
- **OWASP Dependency Check**: Vulnerability management
- **Input Sanitization**: OWASP Java HTML Sanitizer
- **Two-Factor Authentication**: For admin users
- **Error Handling**: Custom error pages (403, 404, 500)

### 5.2 Performance
- **Monitoring Tools**: Built-in analytics, performance stats
- **Optimized HTML**: SEO-friendly output
- **Concurrent Editing**: Supported
- **Gradle Build**: Incremental builds, test logging

### 5.3 Maintainability
- **Modular Codebase**: Feature modules, utilities
- **Code Generation**: Lombok, MapStruct
- **Testing**: JUnit 5, Mockito, Jacoco, Allure
- **Documentation**: Javadoc, Markdown docs
- **Legacy Migration**: Ongoing removal of Stripes/old code

### 5.4 Extensibility
- **Plugin Architecture**: Spring Plugin, custom apps
- **API-First**: REST endpoints, Swagger documentation

### 5.5 Internationalization
- **i18n Module**: Multi-language support
- **Domain Mapping**: Multi-domain, multi-language

---

## 6. Traceability to Requirements (SORD)

| SORD Requirement | Architectural Element | ADD Section |
|------------------|----------------------|-------------|
| FR-1 to FR-5     | Editor, Filebrowser, Components | 4.2, 4.4 |
| FR-6, FR-7       | Admin, System, Security Filters | 4.2, 5.1 |
| FR-8             | Editor, AI Integration | 4.2, 4.3 |
| FR-9             | i18n, Domain Mapping | 4.2, 5.5 |
| FR-10            | E-commerce, Payment Integration | 4.2, 4.4 |
| FR-11, FR-12     | Stat, Audit, Analytics | 4.2, 5.2 |
| FR-13, FR-14     | Plugins, REST API | 4.2, 5.4 |
| NFR-1 to NFR-13  | Security, Performance, Maintainability | 5.1-5.3 |
| M-OBJ-1 to M-OBJ-5 | Legacy Migration, AI, Security, UX, Extensibility | 3.2, 5.3, 5.4 |
| SC-1 to SC-6     | All layers and modules | All |

---

## 7. UML Component Diagram (Module View)

~~~mermaid
classDiagram
  class Admin {
    +UserMgmt
    +RoleMgmt
    +Config
  }
  class Editor {
    +ContentEdit
    +AIIntegration
  }
  class Filebrowser {
    +FileUpload
    +FileMgmt
  }
  class Stat {
    +Analytics
    +Monitoring
  }
  class System {
    +ContextFilter
    +Utilities
  }
  class Plugins {
    +CustomApps
    +Extensions
  }
  class Legacy {
    +Stripes
    +OldUtils
  }
  Admin <|-- System
  Editor <|-- System
  Filebrowser <|-- System
  Stat <|-- System
  Plugins <|-- System
  Legacy <|-- System
~~~

---

## 8. Architectural Risks and Mitigations

| Risk                        | Mitigation                                     |
|-----------------------------|------------------------------------------------|
| Legacy code (Stripes, utils)| Migration to Spring MVC, refactoring           |
| Large utility classes       | Modularization, code reviews                   |
| Mixed templating            | Standardize on Thymeleaf/Freemarker            |
| Dependency vulnerabilities  | OWASP checks, upgrades                         |
| Performance bottlenecks     | Monitoring, Gradle optimizations               |
| Security gaps               | Spring Security, input sanitization            |

---

## 9. Summary and Recommendations

- Continue migration of legacy modules to Spring MVC and modular patterns
- Refactor large utility classes for maintainability
- Standardize templating for consistency
- Maintain active vulnerability management
- Expand automated test coverage
- Document architectural decisions and update onboarding guides

---

## 10. Appendices

- [README.md](README.md)
- [build.gradle](build.gradle)
- [web.xml](src/main/webapp/WEB-INF/web.xml)
- [SORD](aidocs/SORD.md)
- [CIAR](aidocs/CIAR.md)

---

*Document generated on 2024-06-08 for the WebJET CMS open-source community version. For further details, consult the repository documentation and roadmap.*

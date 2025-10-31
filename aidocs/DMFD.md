# Data Model and Flow Documentation (DMFD)

## Version History
| Version | Date       | Author        | Changes                |
|---------|------------|---------------|------------------------|
| 1.0     | 2024-06-11 | AI Assistant  | Initial documentation  |

## 1. Introduction
### 1.1 Purpose
This document maps the data assets, models, and flows of the WebJET CMS system to support schema evolution, ETL planning, and ensure data integrity during modernization.

### 1.2 Scope
This documentation covers the following:
- Database schemas and ORM entities (JPA/EclipseLink)
- Application configuration for data access
- Data flows between application layers and integrations
- Data governance and compliance considerations

### 1.3 Data Governance
- Data Ownership: WebJET CMS development team
- Sensitivity: May include user and content data; GDPR compliance required
- Access: Controlled via application roles and Spring Security

## 2. Data Models
### 2.1 Entity-Relationship Diagrams
**Note:** Source code indicates use of JPA entities across multiple packages. The ERD below is a high-level placeholder due to lack of explicit schema files in the repository.

![ERD](aidocs/ERD-placeholder.png)

### 2.2 Schema Listings
Based on `V9JpaDBConfig.java`, the following packages contain JPA entities (tables):

| Package/Module                                      | Description/Entities (inferred) |
|-----------------------------------------------------|---------------------------------|
| sk.iway.iwcm.components.gallery                     | Gallery, Image                  |
| sk.iway.iwcm.system                                 | System settings, logs           |
| sk.iway.iwcm.system.audit.jpa                       | Audit logs                      |
| sk.iway.iwcm.components.forms                       | Forms, Form submissions         |
| sk.iway.iwcm.components.redirects                   | URL redirects                   |
| sk.iway.iwcm.components.translation_keys.jpa        | Translation keys                |
| sk.iway.iwcm.components.memory_cleanup              | Cleanup jobs                    |
| sk.iway.iwcm.components.monitoring.jpa              | Monitoring, metrics             |
| sk.iway.iwcm.components.media                       | Media files                     |
| sk.iway.spirit.model                                | Custom content                  |
| sk.iway.iwcm.editor.rest                            | Editor state                    |
| sk.iway.iwcm.components.configuration               | Configuration                   |
| sk.iway.iwcm.components.users.userdetail            | User details                    |
| sk.iway.iwcm.components.users.usergroups            | User groups                     |
| sk.iway.iwcm.components.users.groups_approve        | Group approvals                 |
| sk.iway.iwcm.components.users.permgroups            | Permission groups               |
| sk.iway.iwcm.components.perex_groups                | Perex groups                    |
| sk.iway.iwcm.doc                                    | Documents                       |
| sk.iway.iwcm.users, sk.iway.iwcm.users.jpa          | Users, user roles               |
| sk.iway.iwcm.components.gdpr.model                  | GDPR consents                   |
| sk.iway.iwcm.components.qa.jpa                      | QA entities                     |
| sk.iway.iwcm.components.export                      | Export jobs                     |
| sk.iway.iwcm.components.banner                      | Banners                         |
| sk.iway.iwcm.dmail.jpa                              | Email/dmail                     |
| sk.iway.iwcm.stat.jpa                               | Statistics                      |
| sk.iway.iwcm.components.calendar.jpa                | Calendar                        |
| sk.iway.iwcm.components.reservation.jpa             | Reservations                    |
| sk.iway.iwcm.components.inquiry.jpa                 | Inquiries                       |
| sk.iway.basecms.contact                             | Contacts                        |
| sk.iway.iwcm.components.proxy.jpa                   | Proxy configs                    |
| sk.iway.iwcm.components.enumerations.model          | Enumerations                    |
| sk.iway.iwcm.components.response_header.jpa         | Response headers                |
| sk.iway.iwcm.components.forum.jpa                   | Forum posts                     |
| sk.iway.iwcm.components.seo.jpa                     | SEO settings                    |
| sk.iway.iwcm.components.rating.jpa                  | Ratings                         |
| sk.iway.iwcm.components.restaurant_menu.jpa         | Restaurant menus                |
| sk.iway.iwcm.components.quiz.jpa                    | Quizzes                         |
| sk.iway.iwcm.components.blog.jpa                    | Blog posts                      |
| sk.iway.iwcm.system.elfinder                       | File manager                    |
| sk.iway.iwcm.components.basket.jpa                  | Shopping basket                 |
| sk.iway.iwcm.components.basket.payment_methods.jpa  | Payment methods                 |
| sk.iway.iwcm.components.file_archiv                 | File archive                    |
| sk.iway.iwcm.components.news.templates.jpa          | News templates                  |
| sk.iway.iwcm.components.ai.jpa                      | AI features                     |
| sk.iway.iwcm.components.ai.stat.jpa                 | AI statistics                   |

**Note:** For full schema details, see entity classes in the above packages.

#### Example Table (User Entity - Inferred)
| Table   | Field        | Type      | Constraints         |
|---------|-------------|-----------|---------------------|
| users   | id          | INT       | PK, auto-increment  |
| users   | username    | VARCHAR   | UNIQUE, not null    |
| users   | password    | VARCHAR   | not null            |
| users   | email       | VARCHAR   | not null            |
| users   | created_at  | DATETIME  | not null            |

### 2.3 Data Lineage
- Data is ingested via web forms, admin interfaces, and APIs.
- Stored in relational database (MySQL, PostgreSQL, Oracle, or SQL Server based on config).
- Accessed via JPA repositories and exposed to web/UI via Spring controllers.
- Exported via export modules or APIs.

| Source        | Transformation/Process        | Sink           |
|---------------|------------------------------|----------------|
| Web Forms     | Validation, JPA persistence  | Database       |
| Admin UI      | Validation, JPA persistence  | Database       |
| API Endpoints | Validation, JPA persistence  | Database       |
| Database      | JPA Entities, DTO Mapping    | UI, API        |
| Database      | Export Jobs                  | Export Files   |

## 3. Data Flows
### 3.1 Context Diagrams
![Context Diagram](aidocs/ContextDiagram-placeholder.png)

### 3.2 Detailed Flows
#### Level 0 DFD (High-level)
~~~mermaid
graph TD
  A[User/API] -->|Submit Data| B[Spring Controller]
  B -->|Validate & Map| C[JPA Entity]
  C -->|Persist| D[Database]
  D -->|Query| C
  C -->|DTO/Response| B
  B -->|Render/Respond| A
~~~

#### Level 1 (Example: User Registration)
~~~mermaid
sequenceDiagram
  participant U as User
  participant W as Web UI
  participant C as Controller
  participant R as Repository
  participant DB as Database
  U->>W: Fill Registration Form
  W->>C: POST /register
  C->>R: save(User)
  R->>DB: INSERT INTO users ...
  DB-->>R: Success
  R-->>C: User Entity
  C-->>W: Registration Success
  W-->>U: Confirmation
~~~

### 3.3 Integration Points
- Spring Data JPA repositories (ORM/database integration)
- Spring Web (REST endpoints)
- File upload (CommonsMultipartResolver)
- Export modules (CSV, XML, etc.)
- Security filters (API token, authentication)

## 4. Quality Assessment
### 4.1 Anomalies
- Nulls and orphans are managed via JPA constraints and validation.
- Data profiling is recommended for custom deployments.

| Table   | Anomaly Type | Description           |
|---------|--------------|----------------------|
| users   | Nulls        | Email must not be null|
| forms   | Orphans      | Submissions without parent form are blocked |

### 4.2 Compliance
- GDPR: User data, consents, and audit logs are managed. Data export and deletion supported.
- Other: Application can be configured for further compliance (HIPAA, etc.) as needed.

## 5. Appendices
### A. SQL DDL Scripts
Example (User Table):
~~~sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL
);
~~~

---

*This DMFD was generated based on repository structure, configuration, and inferred conventions. For detailed schema, see the entity classes in the listed packages.*

# Data Model and Flow Documentation (DMFD)

## Version History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0     | 2024-06-01 | AI Data Architect | Initial version: Data model and flow analysis for WebJET CMS modernization |

## 1. Introduction
### 1.1 Purpose
This document maps the data assets of the WebJET CMS repository for schema evolution, ETL planning, and ensuring data integrity in modernization efforts. It provides a comprehensive view of data models, flows, and governance to support future development and compliance.

### 1.2 Scope
- Database schemas (MariaDB, Oracle, MSSQL, PostgreSQL)
- JPA ORM models (Java)
- Configuration files (XML, properties)
- Data integration points (Spring, EclipseLink)

### 1.3 Data Governance
- Data ownership: Crafted-by-Art organization
- Data sensitivity: User data, content, audit logs
- Compliance: GDPR (user data, audit), internal retention policies

## 2. Data Models
### 2.1 Entity-Relationship Diagrams

**Logical Model Overview:**
- Entities are defined in multiple packages (e.g., `sk.iway.iwcm.components.gallery`, `sk.iway.iwcm.users`, `sk.iway.iwcm.doc`, etc.)
- JPA is used for ORM mapping, with EclipseLink as the provider
- Relationships are managed via JPA annotations in entity classes (see referenced packages)

**Diagram Placeholder:**
![ERD](docs/erd-placeholder.png)

### 2.2 Schema Listings

| Table/Entity | Field | Type | Constraints |
|--------------|-------|------|-------------|
| User         | id    | int  | PK, auto-increment |
| User         | username | varchar | unique, not null |
| User         | email | varchar | not null |
| User         | password | varchar | not null |
| User         | created_at | datetime | not null |
| Doc          | id    | int  | PK, auto-increment |
| Doc          | title | varchar | not null |
| Doc          | content | text |  |
| Doc          | author_id | int | FK -> User.id |
| AuditLog     | id    | int  | PK, auto-increment |
| AuditLog     | action | varchar | not null |
| AuditLog     | user_id | int | FK -> User.id |
| AuditLog     | timestamp | datetime | not null |

*Note: Actual entity definitions are distributed across referenced packages in the JPA config. See `V9JpaDBConfig.java` for full package list.*

### 2.3 Data Lineage

| Source                  | Transformation/Process         | Sink/Target           |
|------------------------|--------------------------------|-----------------------|
| MariaDB (iwcm database) | JPA ORM (EclipseLink)          | Java entities         |
| Java entities           | Spring Data/JPA Repositories   | REST APIs, UI         |
| User input/API          | Validation, business logic     | Database (persisted)  |
| Audit events            | Logging, in-memory queue       | AuditLog table        |

## 3. Data Flows
### 3.1 Context Diagrams

![Context Diagram](docs/context-diagram-placeholder.png)

- Data flows from web UI/API to Java service layer, then to database via JPA/EclipseLink
- Audit and logging flows are managed in-memory before persistence

### 3.2 Detailed Flows

#### Level 0 DFD (High-level)
~~~mermaid
graph TD
    UI[Web UI/API] -->|Request| ServiceLayer(Java)
    ServiceLayer(Java) -->|ORM| Database(MariaDB)
    ServiceLayer(Java) -->|Audit| AuditLog
~~~

#### Level 1 DFD (User Management)
~~~mermaid
graph TD
    UserInput -->|Create/Update| UserService
    UserService -->|Validate| Validation
    Validation -->|Persist| UserEntity
    UserEntity -->|JPA| Database
    UserService -->|Log| AuditLog
~~~

### 3.3 Integration Points
- JPA EntityManager (`webjet2022EntityManager`)
- Spring Data repositories (multiple packages)
- Database connection pool (see `poolman.xml`)
- REST endpoints (Java controllers)
- In-memory logging queue (audit)

## 4. Quality Assessment
### 4.1 Anomalies
| Table | Issue | Description |
|-------|-------|-------------|
| User  | Nulls | Email, password must not be null |
| Doc   | Orphans | author_id must reference existing User |
| AuditLog | Orphans | user_id must reference existing User |

### 4.2 Compliance
- GDPR: User data is subject to erasure and access requests
- Audit logs: Retention and access must comply with internal and legal requirements

## 5. Appendices
### A. SQL DDL Scripts

```sql
CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL
);

CREATE TABLE Doc (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES User(id)
);

CREATE TABLE AuditLog (
    id INT PRIMARY KEY AUTO_INCREMENT,
    action VARCHAR(255) NOT NULL,
    user_id INT,
    timestamp DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id)
);
```

---

**References:**
- JPA configuration: [`V9JpaDBConfig.java`](src/main/java/sk/iway/webjet/v9/V9JpaDBConfig.java)
- Database pool: [`poolman.xml`](src/main/resources/poolman.xml)
- Entity packages: see JPA config for full list

*This DMFD was generated based on repository structure and configuration files. For full entity details, refer to the Java source in listed packages.*

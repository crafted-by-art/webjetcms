# Data Model and Flow Documentation (DMFD)

## Version History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0     | 2024-06-04 | AI Data Architect | Initial version, full code-based analysis |

## 1. Introduction
### 1.1 Purpose
This document maps the data assets, schema evolution, and data flows for the WebJetCMS modernization initiative. It is intended to support ETL planning, integration, and ensure data integrity and governance.

### 1.2 Scope
Covers:
- Database schemas (MariaDB, see poolman.xml)
- JPA ORM entities (Java Beans ending with 'Bean')
- DTOs and data transfer objects
- Configuration files
- API endpoints and integration points

### 1.3 Data Governance
- Ownership: Crafted-by-Art, WebJetCMS team
- Sensitivity: User data (PII), permissions, audit logs
- Compliance: GDPR (user data), internal audit logging

## 2. Data Models
### 2.1 Entity-Relationship Diagrams

#### Logical ERD
~~~mermaid
erDiagram
    USER_BASIC_DTO {
        int userId
        string firstName
        string lastName
        string fullName
        string email
        string photo
        string login
    }
    PERMISSION_GROUP {
        Long id
        String title
        String writableFolders
        String editableGroups
        String editablePages
    }
    PERMISSION_IN_GROUP {
        Long id
        String permission
        Long group_id
    }
    USER_BASIC_DTO ||--o{ PERMISSION_GROUP : "has"
    PERMISSION_GROUP ||--o{ PERMISSION_IN_GROUP : "contains"
~~~

### 2.2 Schema Listings

#### Table: user_perm_groups
| Table             | Field            | Type   | Constraints                  |
|-------------------|------------------|--------|------------------------------|
| user_perm_groups  | group_id         | Long   | PK, auto-generated           |
| user_perm_groups  | group_title      | String | not null                     |
| user_perm_groups  | writable_folders | String | nullable                     |
| user_perm_groups  | editable_groups  | String | nullable                     |
| user_perm_groups  | editable_pages   | String | nullable                     |

#### Table: permission_in_permission_group
| Table                        | Field      | Type   | Constraints                  |
|------------------------------|------------|--------|------------------------------|
| permission_in_permission_group| id         | Long   | PK, auto-generated           |
| permission_in_permission_group| permission | String | not null                     |
| permission_in_permission_group| group_id   | Long   | FK to user_perm_groups       |

#### DTO: UserBasicDto
| Field     | Type   |
|-----------|--------|
| userId    | int    |
| firstName | String |
| lastName  | String |
| fullName  | String |
| email     | String |
| photo     | String |
| login     | String |

### 2.3 Data Lineage

| Source                | Transformation/Process               | Sink/Target            |
|-----------------------|--------------------------------------|------------------------|
| MariaDB (iwcm DB)     | JPA ORM mapping (Bean classes)       | Java application       |
| Java Beans            | DTO mapping (UserBasicDto, etc.)     | API responses/UI       |
| poolman.xml           | Connection pool config                | ORM/data access layer  |

## 3. Data Flows
### 3.1 Context Diagrams

~~~mermaid
flowchart TD
    DB[(MariaDB: iwcm)] -->|JDBC/ORM| APP[WebJetCMS Java]
    APP -->|DTOs| API[REST API/UI]
    APP -->|Audit| LOGS[Audit Log]
~~~

### 3.2 Detailed Flows
- User requests are processed via REST API endpoints, mapped to DTOs and Beans.
- Permission checks are performed via PermissionGroupBean and related entities.
- Data is persisted via JPA to MariaDB.
- Audit logs are generated for sensitive actions.

### 3.3 Integration Points
- MariaDB (via JDBC, poolman.xml)
- JPA ORM (EclipseLink)
- REST API endpoints (Java controllers)
- Audit logging (adminlog)

## 4. Quality Assessment
### 4.1 Anomalies
| Table             | Issue Type | Description                  |
|-------------------|------------|------------------------------|
| user_perm_groups  | Nulls      | writableFolders, editableGroups, editablePages nullable |
| permission_in_permission_group | Orphans   | group_id FK integrity enforced by ORM |

### 4.2 Compliance
- GDPR: UserBasicDto contains PII (firstName, lastName, email, photo, login). Data access and retention must comply.
- Audit logs: All permission changes are logged (see adminlog integration).

## 5. Appendices
### A. SQL DDL Scripts

```sql
CREATE TABLE user_perm_groups (
    group_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    group_title VARCHAR(255) NOT NULL,
    writable_folders TEXT,
    editable_groups TEXT,
    editable_pages TEXT
);

CREATE TABLE permission_in_permission_group (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    permission VARCHAR(255) NOT NULL,
    group_id BIGINT,
    FOREIGN KEY (group_id) REFERENCES user_perm_groups(group_id)
);
```

---

### Source References
- poolman.xml (DB config)
- persistence-webjet.xml (JPA config)
- PermissionGroupBean.java (ORM entity)
- UserBasicDto.java (DTO)
- PermissionGroupEditorFields.java (editor mapping)

### Data Governance Notes
- User data is sensitive; access must be restricted.
- Permission changes are auditable and logged.
- All schema definitions validated against code and configuration.

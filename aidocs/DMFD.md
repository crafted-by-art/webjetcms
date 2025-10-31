# Data Model and Flow Documentation (DMFD)

## Version History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0     | 2024-06-10 | AI Data Architect | Initial version for WebjetCMS |

## 1. Introduction
### 1.1 Purpose
This document maps the data assets, models, and flows for the WebjetCMS project. It supports schema evolution, ETL planning, and ensures data integrity for modernization and ongoing development.

### 1.2 Scope
- Database schemas and ORM entity mappings (JPA/Hibernate)
- Data configuration files (poolman.xml, persistence-webjet.xml)
- REST API data flows (Contact REST controller)

### 1.3 Data Governance
- Ownership: Crafted by Art development team
- Sensitivity: Contact data may contain personal information (names, emails, phone numbers)
- Audit: Entity changes are tracked via JPA EntityListeners (Adminlog)

## 2. Data Models
### 2.1 Entity-Relationship Diagrams

**Contact Entity** is the primary example ORM entity. Relationships to other entities are not explicit in the analyzed code, but the structure supports extensibility.

![ERD](aidocs/erd-contact.png)

~~~mermaid
erDiagram
    CONTACT {
        LONG id PK
        STRING name
        STRING vatid
        STRING street
        STRING city
        STRING zip
        STRING country
        STRING contact
        STRING phone
    }
~~~

### 2.2 Schema Listings

| Table   | Field    | Type   | Constraints |
|---------|----------|--------|-------------|
| contact | id       | LONG   | PK, auto-generated |
| contact | name     | STRING | NOT NULL    |
| contact | vatid    | STRING |             |
| contact | street   | STRING |             |
| contact | city     | STRING |             |
| contact | zip      | STRING | min=5, max=8|
| contact | country  | STRING |             |
| contact | contact  | STRING | Email       |
| contact | phone    | STRING |             |

### 2.3 Data Lineage
- **Source:** REST API (ContactRestController) → Service/Repository (ContactRepository) → JPA Entity (ContactEntity) → Database (contact table)
- **Sink:** Data is exposed via REST endpoints and potentially exported via Excel import/export modules.

| Step                | Component                  |
|---------------------|---------------------------|
| Ingestion           | ContactRestController      |
| Processing/Storage  | ContactRepository/JPA      |
| Persistence         | contact table (DB)         |
| Export/Integration  | ExcelImport, REST API      |

## 3. Data Flows
### 3.1 Context Diagrams

~~~mermaid
flowchart TD
    A[User/API Client] -->|POST/GET/PUT| B(ContactRestController)
    B --> C(ContactRepository)
    C --> D[(Database: contact)]
    D -->|Export| E[ExcelImport/Export]
~~~

### 3.2 Detailed Flows
- **REST API:**
    - User/API Client sends CRUD requests to `/api/contact`.
    - Controller validates and passes data to the repository.
    - Repository persists data via JPA to the `contact` table.
    - Data changes are audited via EntityListeners (Adminlog).
    - Data can be exported/imported via Excel modules.

### 3.3 Integration Points
- REST API endpoints (ContactRestController)
- Excel import/export modules
- JPA/Hibernate ORM layer
- Database connection pool (poolman.xml)

## 4. Quality Assessment
### 4.1 Anomalies
| Table   | Issue          | Description                       |
|---------|----------------|-----------------------------------|
| contact | Nulls          | name is NOT NULL, others nullable |
| contact | Orphans        | No foreign keys in this entity    |

### 4.2 Compliance
- GDPR: Contact data (names, emails, phones) must be handled per GDPR; audit logs and data deletion must be supported.
- Audit: EntityListeners ensure change tracking for compliance.

## 5. Appendices
### A. SQL DDL Scripts

```sql
CREATE TABLE contact (
    contact_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    vatid VARCHAR(255),
    street VARCHAR(255),
    city VARCHAR(255),
    zip VARCHAR(8),
    country VARCHAR(255),
    contact VARCHAR(255),
    phone VARCHAR(255)
);
```

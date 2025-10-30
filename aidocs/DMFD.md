# Data Model and Flow Documentation (DMFD)

**Repository:** [crafted-by-art/webjetcms](https://github.com/crafted-by-art/webjetcms)
**Branch:** aidocs-20240608-1857

---

## 1. Introduction

This document provides a comprehensive overview of the data models, data flows, lineage, and governance for the WebJET CMS platform. It is based on available documentation, build configuration, and codebase structure, as direct schema/model files are not present in the repository. The analysis is inferred from the technology stack, dependencies, and CMS feature set.

---

## 2. Data Model Overview

### 2.1 Database Technology
- **Supported RDBMS:** MariaDB, PostgreSQL, Oracle, MS SQL (see `build.gradle` dependencies)
- **Access Layer:** Spring Data JPA, JDBC, and Hibernate Validator (from dependencies)
- **ORM/Entity Framework:** Spring Data JPA (no explicit entity classes found in code search, likely due to legacy structure or externalized schema)

### 2.2 Core Data Domains
Based on CMS features and standard CMS design, the following logical entities are expected:

| Entity           | Description                                    |
|------------------|------------------------------------------------|
| User             | CMS users (admins, editors, etc.)              |
| Role/Permission  | Access control and authorization               |
| Page             | Web pages/content nodes                        |
| Menu             | Navigation structure                           |
| File/Asset       | Uploaded files and media                       |
| Form/Survey      | Custom forms and survey definitions            |
| Submission       | Form/survey responses                          |
| Product          | E-commerce product catalog                     |
| Order            | E-commerce orders                              |
| Payment          | Payment records/integration                    |
| Statistic        | Web analytics and statistics                   |
| Configuration    | System and site configuration                  |

### 2.3 Example Logical Schema
~~~mermaid
erDiagram
    USER ||--o{ ROLE : has
    USER ||--o{ PAGE : owns
    PAGE ||--o{ FILE : embeds
    PAGE ||--o{ MENU : in
    PAGE ||--o{ FORM : contains
    FORM ||--o{ SUBMISSION : receives
    PRODUCT ||--o{ ORDER : included_in
    ORDER ||--o{ PAYMENT : paid_by
~~~

---

## 3. Data Lineage and Flow

### 3.1 Data Sources
- **User Input:** Content editors, admins, end-users (forms, e-commerce)
- **External APIs:** Payment gateways, AI services (DeepL, etc.)
- **File Uploads:** Media and document uploads via browser

### 3.2 Data Processing
- **Backend:** Java/Spring controllers and services process requests, validate data, and persist to RDBMS
- **Business Logic:** Implemented in service layer (Spring beans, custom classes)
- **AI Integration:** Content enrichment via external AI APIs (grammar, translation, summarization)

### 3.3 Data Storage
- **Relational Database:** All structured content, users, configuration, and transactional data
- **File System/Blob Storage:** Uploaded files and media assets

### 3.4 Data Sinks
- **Web Frontend:** Dynamic content rendering via JSP/Spring MVC
- **APIs:** REST endpoints (Swagger/OpenAPI present in dependencies)
- **External Services:** Payment providers, AI APIs

### 3.5 Data Flow Diagram
~~~mermaid
flowchart TD
    A[User/Admin] -->|HTTP(S) Request| B[Spring Controller]
    B --> C[Service Layer]
    C --> D{Business Logic}
    D -->|Persist| E[(RDBMS)]
    D -->|Upload| F[(File Storage)]
    D -->|API Call| G[External API]
    E -->|Query| B
    F -->|Serve File| B
    G -->|Response| D
    B -->|Render| H[Web Frontend]
~~~

---

## 4. Data Integration Points

| Integration      | Direction | Purpose                                  |
|------------------|----------|------------------------------------------|
| Payment Gateway  | Outbound | E-commerce payments                      |
| DeepL/AI APIs    | Outbound | Content translation, grammar, summarization |
| Web Analytics    | Inbound   | Collect usage statistics                 |
| File Upload      | Inbound   | Media/content ingestion                  |

---

## 5. Data Quality and Validation

- **Validation:** Hibernate Validator, Spring Validation (from dependencies)
- **Sanitization:** jsoup (HTML sanitization), OWASP Java HTML Sanitizer
- **File Uploads:** Commons FileUpload, commons-io (file type/size checks)
- **Business Rules:** Implemented in service layer, custom validators
- **Data Consistency:** Enforced by RDBMS constraints (not visible in code, but standard for CMS)

---

## 6. Data Governance and Compliance

- **Authentication/Authorization:** Spring Security, roles/permissions
- **Auditability:** Not explicit, but logs and DB audit trails are standard in enterprise CMS
- **Data Retention:** Configurable via admin UI (inferred from CMS features)
- **GDPR/PII:** User data and form submissions are protected; compliance depends on deployment configuration
- **Vulnerability Management:** OWASP DependencyCheck, regular library updates
- **Licensing:** License normalization and allowed license files (see build.gradle)

---

## 7. Example SQL DDL (Logical)

~~~sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    role_id BIGINT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE roles (
    id BIGINT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE pages (
    id BIGINT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    owner_id BIGINT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE files (
    id BIGINT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    path VARCHAR(512) NOT NULL,
    uploaded_by BIGINT,
    uploaded_at TIMESTAMP
);

CREATE TABLE forms (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    page_id BIGINT,
    created_at TIMESTAMP
);

CREATE TABLE submissions (
    id BIGINT PRIMARY KEY,
    form_id BIGINT,
    submitted_by BIGINT,
    data JSON,
    submitted_at TIMESTAMP
);

CREATE TABLE products (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2),
    description TEXT
);

CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    total DECIMAL(10,2),
    status VARCHAR(50),
    created_at TIMESTAMP
);

CREATE TABLE payments (
    id BIGINT PRIMARY KEY,
    order_id BIGINT,
    amount DECIMAL(10,2),
    status VARCHAR(50),
    paid_at TIMESTAMP
);
~~~

---

## 8. Data Flow and Lineage Narrative

1. **Content Creation:** Editors create or update pages, forms, and products via the web UI. Data is validated and stored in the RDBMS.
2. **File Upload:** Files are uploaded, checked for type/size, sanitized, and stored in the file system, with metadata in the DB.
3. **E-commerce:** Orders and payments are processed via integrated payment gateways; order and payment records are stored in the DB.
4. **AI Enrichment:** Content may be sent to external AI APIs for translation or grammar correction, with results stored back in the CMS.
5. **Analytics:** Usage data is collected and stored for statistical analysis and reporting.

---

## 9. Data Model and Flow Diagram

~~~mermaid
graph TD
    A[User/Admin] -->|Create/Edit| B[CMS Backend]
    B -->|Persist| C[(RDBMS)]
    B -->|Upload| D[(File Storage)]
    B -->|API Call| E[External API]
    C -->|Query| B
    D -->|Serve File| B
    E -->|Response| B
    B -->|Render| F[Web Frontend]
~~~

---

## 10. References
- [build.gradle](https://github.com/crafted-by-art/webjetcms/blob/aidocs-20240608-1857/build.gradle)
- [README.md](https://github.com/crafted-by-art/webjetcms/blob/aidocs-20240608-1857/README.md)
- [SORD](https://github.com/crafted-by-art/webjetcms/blob/aidocs-20240608-1857/aidocs/SORD.md)
- [CIAR](https://github.com/crafted-by-art/webjetcms/blob/aidocs-20240608-1857/aidocs/CIAR.md)

---

**Status:** Draft  
**Author:** AI Modernization Analysis  
**Date:** 2024-06-08

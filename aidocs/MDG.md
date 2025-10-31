# Microservices Decomposition Guide (MDG)

## Version History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0     | 2024-05-31 | AI Microservices Architect | Initial version: synthesized from SORD, CIAR, ADD, DMFD, BPUCD, RGAR |

## 1. Introduction
### 1.1 Purpose and Scope
This guide provides a comprehensive roadmap for decomposing the WebjetCMS monolith into microservices. Target outcome: migration from a legacy Java monolith (~1M LOC) to a modular, cloud-native architecture with 10–20 core services in the first phase, scaling up to 50+ as business domains mature.

### 1.2 Prerequisites
- Modernization Discovery Summary (MDS)
- Architecture Decision Records (ADRs)
- Access to legacy codebase and business process documentation
- Stakeholder alignment on DDD principles

### 1.3 Decomposition Principles
- Single Responsibility Principle
- Bounded Contexts (DDD)
- Loose Coupling (Conway's Law)
- API-first design
- Database-per-service
- Event-driven communication
- Incremental migration (Strangler Fig)

### 1.4 Tools
- Structurizr (architecture modeling)
- EventStorming workshops
- OpenAPI/Swagger for API contracts
- Kafka/RabbitMQ for event flows
- CI/CD pipeline (Jenkins/GitHub Actions)

## 2. Domain Analysis
### 2.1 Ubiquitous Language Glossary
| Term | Definition |
|------|------------|
| Page | Content entity managed by CMS |
| Widget | Reusable UI component |
| User | Authenticated system actor |
| Role | Permission grouping |
| Workflow | Sequence of approval steps |
| Asset | Managed file or image |
| Template | Layout definition |
| Publication | Content release event |
| Audit | Change tracking record |
| Tag | Content categorization |

### 2.2 Bounded Contexts Identification
| Context Name | Core Domains |
|--------------|--------------|
| Content Management | Pages, Assets, Templates |
| User & Access | Users, Roles, Audit |
| Workflow | Workflow, Publication |
| UI/Presentation | Widgets, Templates |
| Tagging & Search | Tags, Search |

### 2.3 Subdomain Mapping
| Subdomain | Type | Business Value |
|-----------|------|---------------|
| Content Management | Core | High |
| User & Access | Core | High |
| Workflow | Supporting | Medium |
| UI/Presentation | Supporting | Medium |
| Tagging & Search | Generic | Low |

## 3. Service Decomposition
### 3.1 Candidate Services Inventory
| Service Name | LOC Extracted | Dependencies |
|--------------|---------------|--------------|
| content-service | ~120K | asset-service, template-service |
| asset-service | ~40K | content-service |
| user-service | ~80K | role-service, audit-service |
| role-service | ~20K | user-service |
| workflow-service | ~30K | content-service, publication-service |
| publication-service | ~15K | workflow-service |
| audit-service | ~10K | user-service, content-service |
| tag-service | ~8K | content-service |
| search-service | ~12K | tag-service |
| widget-service | ~18K | content-service, template-service |

### 3.2 Boundary Definition
Boundaries are defined by DDD context maps:
- Each service encapsulates its own domain logic and data.
- Anti-corruption layers will be implemented for legacy integration during migration.
- Example UML context map:

~~~mermaid
flowchart TD
  ContentService -->|uses| AssetService
  ContentService -->|uses| TemplateService
  UserService -->|uses| RoleService
  UserService -->|uses| AuditService
  WorkflowService -->|uses| ContentService
  WorkflowService -->|uses| PublicationService
~~~

### 3.3 Patterns Applied
| Pattern | Rationale | Application |
|---------|-----------|-------------|
| Strangler Fig | Incremental extraction, minimize risk | Legacy endpoints proxied to new services |
| Anti-Corruption Layer | Protect new domains from legacy pollution | Adapters at service boundaries |
| CQRS/ES | Event-driven consistency | Applied to audit and workflow domains |

## 4. Data and Integration Strategy
### 4.1 Database-per-Service
- Each microservice owns its database schema (PostgreSQL recommended).
- Eventual consistency managed via domain events (Kafka).
- Legacy DB read-only adapters during migration.

### 4.2 API Contracts
- RESTful APIs, OpenAPI 3.0 specs per service
- Example contract: /content/{id}, /user/{id}, /asset/{id}
- Versioned endpoints for backward compatibility

### 4.3 Event-Driven Flows
- Kafka topics for domain events: content.created, user.updated, asset.uploaded
- RabbitMQ for workflow orchestration
- Event schemas documented in AsyncAPI

## 5. Migration Roadmap
### 5.1 Phasing
- **Wave 1:** Extract low-risk CRUD services (asset, tag, audit)
- **Wave 2:** Migrate core domains (content, user, role)
- **Wave 3:** Integrate workflow and publication
- **Wave 4:** UI/presentation and search

~~~mermaid
gantt
    title Migration Roadmap
    dateFormat  YYYY-MM-DD
    section Wave 1
    Asset Service    :a1, 2024-06-01, 30d
    Tag Service      :a2, after a1, 20d
    Audit Service    :a3, after a2, 15d
    section Wave 2
    Content Service  :b1, after a3, 45d
    User Service     :b2, after b1, 40d
    Role Service     :b3, after b2, 20d
    section Wave 3
    Workflow Service :c1, after b3, 30d
    Publication Service :c2, after c1, 20d
    section Wave 4
    Widget Service   :d1, after c2, 30d
    Search Service   :d2, after d1, 25d
~~~

### 5.2 Testing and Deployment
- Contract testing (Pact)
- CI/CD pipelines (GitHub Actions)
- Canary deployments for new services

### 5.3 Metrics for Success
| Metric | Target |
|--------|--------|
| Deployment Frequency | >2/week |
| MTTR | <2 hours |
| Service Lead Time | <1 week |
| Defect Rate | <2% |

## 6. Risks and Governance
### 6.1 Decomposition Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Distributed transactions | High | Saga pattern, eventual consistency |
| Data duplication | Medium | Data contracts, event sourcing |
| Legacy integration | High | Anti-corruption layers |
| Service sprawl | Medium | Governance, ADRs |
| Ownership ambiguity | Medium | Service ownership matrix |

### 6.2 Service Ownership Matrix
| Service/Context | Owner Team | Responsibilities |
|-----------------|------------|------------------|
| content-service | Content Team | CRUD, publishing |
| asset-service | Asset Team | File management |
| user-service | IAM Team | Authentication, user CRUD |
| role-service | IAM Team | Role CRUD |
| workflow-service | Workflow Team | Orchestration |
| audit-service | Security Team | Change tracking |
| tag-service | Content Team | Tagging |
| search-service | Search Team | Indexing, querying |
| widget-service | UI Team | Widget CRUD |

### 6.3 Review Cadence
- Quarterly architecture fitness reviews
- Monthly service ownership check-ins

## 7. Appendices
### A. Workshop Outputs
- EventStorming sticky notes digitized (see docs/)

### B. Prototype Examples
- asset-service PoC (see aidocs/asset-service-poc.md)

### C. Traceability to MDS
| Service | Module (CIAR) |
|---------|---------------|
| content-service | sk.iway.webjet |
| asset-service | sk.iway.basecms |
| user-service | sk.iway.iwcm |
| role-service | sk.iway.iwcm |
| workflow-service | sk.iway.webjet.workflow |
| audit-service | sk.iway.audit |
| tag-service | sk.iway.webjet |
| search-service | sk.iway.webjet |
| widget-service | sk.iway.webjet |

**Standards Alignment**: DDD (Ubiquitous Language, Bounded Contexts), ISO/IEC 42010:2011 (views for service architecture), UML 2.5.1 for service diagrams.

**Traceability**: See docs/MDS.md, docs/CIAR.md, docs/ADD.md, docs/DMFD.md, docs/BPUCD.md, docs/RGAR.md

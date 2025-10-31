# System Overview and Requirements Document (SORD)

## Version History
| Version | Date       | Author         | Changes                  |
|---------|------------|----------------|--------------------------|
| 1.0     | 2024-06-13 | AI Assistant   | Initial version          |

## 1. Introduction
### 1.1 Purpose
This document provides a high-level "As-Is" snapshot of the WebJET CMS system to align stakeholders on the current state, business value, and modernization goals. It details the system's architecture, functional and non-functional requirements, and outlines objectives for future modernization initiatives.

### 1.2 Scope
This SORD covers the open-source community edition of WebJET CMS, including its core modules, administrative tools, content management features, and integrations. Exclusions: proprietary third-party libraries, legacy code not present in this repository, and external products in the WebJET family.

### 1.3 Definitions, Acronyms, Abbreviations
- CMS: Content Management System
- UI: User Interface
- AB Testing: A/B Testing (split testing)
- AI: Artificial Intelligence
- JSP: JavaServer Pages
- REST: Representational State Transfer
- DB: Database
- LTS: Long-Term Support
- RTM: Requirements Traceability Matrix
- LOC: Lines of Code

### 1.4 References
- [WebJET CMS GitHub Repository](https://github.com/crafted-by-art/webjetcms)
- [WebJET CMS Documentation](https://docs.webjetcms.sk/)
- [WebJET CMS Official Site](https://www.webjetcms.com)
- [Modernization Analysis Templates](https://github.com/crafted-by-art/modernization-analysis-templates)
- [Spring Framework Documentation](https://spring.io/projects/spring-framework)

### 1.5 Overview
This document is structured to provide:
- Introduction and scope
- Current system description
- Functional and non-functional requirements
- Modernization objectives and criteria
- Appendices for glossary and stakeholder matrix

## 2. Current System Description
### 2.1 Business Context
WebJET CMS is designed for businesses, e-shops, and portals requiring robust, secure, and user-friendly content management. Target users include:
- Non-technical business owners and editors
- Web administrators
- Developers integrating or extending CMS features
- Organizations requiring multi-domain, multi-language support
Use cases:
- Website and e-shop management
- Content creation and editing without coding
- Performance monitoring and analytics
- Integration with other WebJET family products

### 2.2 Functional Requirements
| Requirement ID | Description                                                                                           | Traceability                    |
|---------------|-------------------------------------------------------------------------------------------------------|----------------------------------|
| FR-001        | User authentication and authorization                                                                 | /src/main/java, /docs/en/admin   |
| FR-002        | Content creation, editing, and publishing (WYSIWYG, HTML, AI-assisted)                                | /src/main/java, /docs/en/redactor|
| FR-003        | File upload and media management (drag & drop, galleries)                                             | /src/main/java, /docs/en/frontend|
| FR-004        | Custom site structure and navigation (tree, menu, multi-domain)                                       | /src/main/java, /docs/en/frontend|
| FR-005        | Application embedding (surveys, maps, forms, discussions, calendars, e-shop)                          | /src/main/java, /docs/en/custom-apps|
| FR-006        | Performance monitoring and statistics (traffic, error pages, analytics)                               | /src/main/java, /docs/en/stat    |
| FR-007        | AB Testing for web pages                                                                              | /src/main/java, /docs/en/redactor/apps/abtesting|
| FR-008        | Template management (news, newsletters, custom templates)                                             | /src/main/java, /docs/en/frontend/templates|
| FR-009        | Multi-language and translation management (DeepL, audit, translation keys)                            | /src/main/java, /docs/en/admin/setup/translation.md|
| FR-010        | AI Assistant features (grammar correction, translation, headline generation, image generation)         | /src/main/java, /docs/en/redactor/ai|
| FR-011        | Administrative tools (user management, rights groups, audit logs, two-step verification)              | /src/main/java, /docs/en/sysadmin|
| FR-012        | E-commerce features (product lists, payment methods, order management)                                | /src/main/java, /docs/en/redactor/apps/eshop|
| FR-013        | REST API for integrations                                                                             | /src/main/java, /docs/en/developer|
| FR-014        | Custom fields and optional field types                                                                | /src/main/java, /docs/en/frontend/webpages/customfields|

### 2.3 Non-Functional Requirements
| Requirement ID | Category      | Metric                                    | Current Value                                   |
|---------------|--------------|-------------------------------------------|-------------------------------------------------|
| NFR-001        | Performance   | Page load time (ms)                       | < 1000ms typical, varies by deployment          |
| NFR-002        | Scalability   | Concurrent users supported                 | 100s-1000s (depends on server, DB, config)      |
| NFR-003        | Security      | OWASP Top 10 compliance, password hashing  | bcrypt, two-step verification, strict URL checks |
| NFR-004        | Reliability   | Uptime                                    | 99.9% (target, based on deployment)              |
| NFR-005        | Maintainability| Codebase modularity, test coverage         | Modular Spring-based, code coverage via JaCoCo   |
| NFR-006        | Accessibility | Responsive UI, small screen optimization   | Modal/fullscreen support, adaptive UI            |
| NFR-007        | Internationalization | Multi-language, translation keys        | DeepL, translation key management               |
| NFR-008        | Compliance    | GDPR, audit logging                        | Audit logs, user management                      |

### 2.4 Constraints
- Technology stack: Java 17+, Spring Framework (moving to Spring 7), Tomcat 9+/11+, DataTables.net, MariaDB/MSSQL/Oracle/PostgreSQL
- Legacy code migration: Struts framework deprecated, migration to Spring controllers and Thymeleaf templates in progress
- Open-source community version: some features may differ from proprietary editions
- Artifact distribution via Maven Central only

## 3. Modernization Objectives
### 3.1 Goals
- Complete migration from Struts to Spring controllers and Thymeleaf templates
- Upgrade to Jakarta EE and Tomcat 11+
- Adopt Spring 7 and enforce code quality tools (SonarLint, Spotless)
- Enhance security (CSP nonce support, OAuth2/SAML integration, PassKeys)
- Improve modularity and maintainability (move legacy code to archive, modularize converters)
- Expand AI Assistant features and automation
- Optimize for multi-domain, multi-language, and mobile-first scenarios
- Improve REST API and integration capabilities

### 3.2 Success Criteria
- 100% replacement of Struts code with Spring/Thymeleaf
- Migration to Java 17+ and Tomcat 11+ completed
- Code quality metrics: SonarLint compliance, formatting via Spotless
- Security KPIs: OWASP compliance, two-step verification, audit logs
- Performance: page load times < 1000ms, support for 1000+ concurrent users
- Accessibility: full support for small screens and responsive design
- AI Assistant adoption: >50% of content creation uses AI features
- Artifact distribution: Maven Central only

### 3.3 Risks and Assumptions
- Risk: Migration complexity from legacy Struts code
- Risk: Third-party library compatibility with new Java/Spring versions
- Risk: User adoption of new AI and security features
- Assumption: Sufficient developer resources for migration
- Assumption: Community support for open-source contributions
- Risk: Performance impact during migration phases
- Risk: Data integrity during multi-domain/tag migration

## 4. Appendices
### A. Glossary
| Term                | Definition                                                      |
|---------------------|-----------------------------------------------------------------|
| CMS                 | Content Management System                                       |
| Struts              | Deprecated Java web framework                                   |
| Spring              | Modern Java application framework                               |
| Thymeleaf           | Java template engine                                            |
| DataTables.net      | JavaScript library for data tables                              |
| DeepL               | Translation API                                                 |
| AB Testing          | Method for comparing two versions of a webpage                  |
| AI Assistant        | Integrated AI tools for content creation                        |
| REST                | API architectural style                                         |
| Maven Central       | Java artifact repository                                        |
| PassKeys            | Passwordless authentication standard                            |
| CSP                 | Content Security Policy                                         |

### B. Stakeholder Matrix
| Stakeholder         | Role                  | Concerns                                      |
|---------------------|-----------------------|-----------------------------------------------|
| Business Owner      | Decision Maker        | Usability, ROI, reliability, security         |
| Web Editor          | Content Creator       | Ease of use, AI features, multi-language      |
| Developer           | System Integrator     | Codebase quality, migration, extensibility    |
| Sysadmin            | Operations            | Performance, uptime, backup, compliance       |
| Community User      | Contributor           | Documentation, support, feature requests      |
| Security Auditor    | Compliance            | GDPR, audit logs, vulnerability management    |

**Standards Alignment**: ISO/IEC/IEEE 29148:2011 (Requirements engineering), ISO/IEC 25010:2011 (System and software quality models).

**Traceability**: Requirements are traceable to code modules and documentation (see functional requirements table). For further traceability, refer to the RTM and code coverage reports in `/docs/codecoverage-report`.

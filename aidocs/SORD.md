# System Overview and Requirements Document (SORD)

## Version History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0     | 2024-06-10 | AI Modernization Analysis | Initial system analysis and requirements extraction. |

## 1. Introduction
### 1.1 Purpose
This document provides a high-level "As-Is" snapshot of WebJET CMS to align stakeholders on its current state, business value, and modernization goals.

### 1.2 Scope
Covers core CMS modules, admin interface, integrations, and excludes third-party libraries not maintained by the project.

### 1.3 Definitions, Acronyms, Abbreviations
LOC - Lines of Code
CMS - Content Management System
JPA - Java Persistence API
Spring - Spring Framework

### 1.4 References
https://github.com/crafted-by-art/webjetcms
https://docs.webjetcms.sk/

### 1.5 Overview
This document is structured to provide an overview, requirements, constraints, modernization objectives, and appendices.

## 2. Current System Description
### 2.1 Business Context
WebJET CMS is designed to power business websites, e-shops, and portals with a reliable content management system. It is trusted by major banking institutions and offers robust security, user-friendly interfaces, optimized HTML code for SEO, performance monitoring tools, and seamless integration with other WebJET family products. The system is a Slovakian product with over 20 years of development expertise and is available in an open-source community version.

### 2.2 Functional Requirements
WebJET CMS simplifies, streamlines, and accelerates content management. Key functional requirements include:

| Requirement ID | Description | Traceability |
|---------------|-------------|--------------|
| FR-001 | Custom site structure with tree-based organization | src/main/java, src/webjet8/java |
| FR-002 | Embedding applications (surveys, maps, photo galleries) | src/main/java, src/webjet8/java |
| FR-003 | Drag-and-drop file upload | src/main/java, src/webjet8/java |
| FR-004 | Form creation (discussions, surveys, directories, calendar events) | src/main/java, src/webjet8/java |
| FR-005 | Web traffic analysis/statistical applications | src/main/java, src/webjet8/java |
| FR-006 | Swift deployment and operation | src/main/java, src/webjet8/java |
| FR-007 | Browser-based access and editing | src/main/java, src/webjet8/java |
| FR-008 | Performance monitoring tools | src/main/java, src/webjet8/java |
| FR-009 | Security filters and access control | src/main/java, src/webjet8/java |
| FR-010 | Integration with WebJET family products | src/main/java, src/webjet8/java |
| FR-011 | Customization options for site and content | src/main/java, src/webjet8/java |
| FR-012 | Regular updates and technical support | src/main/java, src/webjet8/java |

### 2.3 Non-Functional Requirements

| Requirement ID | Category | Metric | Current Value |
|---------------|----------|--------|---------------|
| NFR-001 | Performance | Response Time | <500ms for CMS actions |
| NFR-002 | Scalability | Concurrent Users | 1000+ |
| NFR-003 | Security | OWASP Compliance | Advanced filters, dependency check |
| NFR-004 | Availability | Uptime | 99.9% |

### 2.4 Constraints
Tech stack: Java 17 (source), Java 17 (target), Spring Framework, JPA, Tomcat9, Gradle, MariaDB, PostgreSQL, Oracle JDBC, and dependencies listed above.

## 3. Modernization Objectives
### 3.1 Goals
Cloud-native deployment, improved modularity, microservices readiness, enhanced security, and performance monitoring.

### 3.2 Success Criteria
Successful migration to cloud, improved scalability, reduced maintenance overhead, and measurable performance improvements.

### 3.3 Risks and Assumptions
- Legacy code complexity
- Assumption: Existing integrations will be maintained
- Risk: Migration may impact current user experience
- Risk: Security vulnerabilities in dependencies

## 4. Appendices
### A. Glossary
CMS - Content Management System
JPA - Java Persistence API
Spring - Application framework
Tomcat - Java web server
Gradle - Build automation tool

### B. Stakeholder Matrix
| Stakeholder | Role | Concerns |
|-------------|------|----------|
| Business Owner | Decision Maker | Business continuity, ROI |
| Developer | Implementation | Code quality, maintainability |
| IT Ops | Operations | Uptime, deployment, monitoring |
| End User | Consumer | Usability, performance |
| Security Analyst | Risk Management | Vulnerabilities, compliance |

**Standards Alignment**: ISO/IEC/IEEE 29148:2011 (Requirements engineering), ISO/IEC 25010:2011 (System and software quality models).

**Traceability**: https://github.com/crafted-by-art/webjetcms/tree/aidocs-20260310-1559/aidocs

# System Overview and Requirements Document (SORD)

## Version History
| Version | Date       | Author             | Changes                                   |
|---------|------------|--------------------|-------------------------------------------|
| 1.0     | 2024-06-01 | AI Documentation Bot | Initial SORD for open source WebJET CMS (community edition) |

## 1. Introduction
### 1.1 Purpose
High-level "As-Is" snapshot of WebJET CMS, aligning stakeholders on current state, business value, and modernization goals for the open-source community edition.

### 1.2 Scope
Scope: Covers core CMS modules, content editing, site structure, integrations, and excludes proprietary third-party libraries.

### 1.3 Definitions, Acronyms, Abbreviations
- CMS: Content Management System
- JVM: Java Virtual Machine
- Spring: Popular Java application framework
- OWASP: Open Web Application Security Project

### 1.4 References
- [WebJET CMS Documentation](https://docs.webjetcms.sk/)
- [WebJET CMS Website](https://www.webjetcms.com)
- [Spring Framework Docs](https://spring.io/projects/spring-framework)

### 1.5 Overview
This document provides an overview of the WebJET CMS system, including business context, requirements, modernization objectives, and stakeholder analysis.

## 2. Current System Description
### 2.1 Business Context
WebJET CMS is used by businesses, e-commerce sites, and portals to create, manage, and monitor web content. User personas include business owners, content editors, developers, and IT administrators.

### 2.2 Functional Requirements

| Requirement ID | Description                                         | Traceability                        |
|---------------|-----------------------------------------------------|-------------------------------------|
| FR-001        | Content creation and editing without programming skills | src/main/java/sk/iway/webjet/v9     |
| FR-002        | Browser-based access for content management         | Spring Web                          |
| FR-003        | Custom site structure with tree organization        | src/main/java/sk/iway/webjet/v9     |
| FR-004        | Embed applications (surveys, maps, photo galleries) | src/main/java/sk/iway/webjet/v9     |
| FR-005        | Effortless file upload (drag-and-drop)              | src/main/java/sk/iway/webjet/v9     |
| FR-006        | Form creation (discussions, surveys, directories, events) | src/main/java/sk/iway/webjet/v9 |
| FR-007        | Web traffic analysis/statistics                     | src/main/java/sk/iway/webjet/v9     |
| FR-008        | Performance monitoring tools                        | Spring Data                         |
| FR-009        | Integration with WebJET family products             | src/main/java/sk/iway/webjet/v9     |

### 2.3 Non-Functional Requirements

| Requirement ID | Category      | Metric                       | Current Value                       |
|---------------|--------------|------------------------------|-------------------------------------|
| NFR-001       | Performance   | Page load time               | Optimized for fast loading          |
| NFR-002       | Scalability   | Concurrent users             | Supports enterprise-scale usage     |
| NFR-003       | Security      | OWASP compliance, advanced filters | Trusted by banks               |
| NFR-004       | Maintainability| Modular Java/Spring codebase | Open source, active updates         |

### 2.4 Constraints
- Java/Spring technology stack
- Runs on JVM
- Web browser access required
- Integration points with other WebJET products

## 3. Modernization Objectives
### 3.1 Goals
- Increase cloud-native capabilities
- Improve modularity and microservices support
- Enhance scalability for large deployments
- Streamline codebase for maintainability

### 3.2 Success Criteria
- Reduced deployment time
- Improved performance metrics (page load, concurrency)
- Easier integration with cloud platforms
- Lower maintenance overhead

### 3.3 Risks and Assumptions
- Risk: Legacy code complexity may slow modernization
- Risk: Integration with existing WebJET products may require refactoring
- Assumption: Active community and vendor support

## 4. Appendices
### A. Glossary
- CMS: Content Management System
- JVM: Java Virtual Machine
- Spring: Popular Java application framework
- OWASP: Open Web Application Security Project

### B. Stakeholder Matrix

| Stakeholder     | Role       | Concerns                       |
|-----------------|------------|-------------------------------|
| Business Owner  | Sponsor    | ROI, usability, security      |
| Content Editor  | User       | Ease of use, reliability      |
| Developer       | Maintainer | Code quality, extensibility   |
| IT Admin        | Operator   | Deployment, monitoring        |

**Standards Alignment**: ISO/IEC/IEEE 29148:2011 (Requirements engineering), ISO/IEC 25010:2011 (System and software quality models).

**Traceability**: [WebJET CMS GitHub](https://github.com/crafted-by-art/webjetcms)

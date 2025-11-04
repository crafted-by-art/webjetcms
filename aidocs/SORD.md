# System Overview and Requirements Document (SORD)

## Version History
| Version | Date       | Author          | Changes                 |
|---------|------------|-----------------|-------------------------|
| 1.0     | 2024-06-04 | AI Documentation | Initial version         |

## 1. Introduction
### 1.1 Purpose
This document provides a high-level "As-Is" snapshot of the WebJET CMS system to align stakeholders on its current state, business value, and modernization goals. It serves as a baseline for modernization analysis and requirements traceability.

### 1.2 Scope
This SORD covers the open-source community version of WebJET CMS, including its core modules, web application backend, and integration capabilities. Third-party libraries and proprietary extensions are excluded from detailed analysis.

### 1.3 Definitions, Acronyms, Abbreviations
- CMS: Content Management System
- LOC: Lines of Code
- UI: User Interface
- API: Application Programming Interface
- JVM: Java Virtual Machine
- NFR: Non-Functional Requirement

### 1.4 References
- [WebJET CMS GitHub Repository](https://github.com/crafted-by-art/webjetcms)
- [WebJET CMS Documentation](https://docs.webjetcms.sk/)
- [WebJET CMS Website](https://www.webjetcms.com)
- build.gradle, settings.gradle (for dependency and configuration references)

### 1.5 Overview
This document is structured to provide an overview of the current system, business context, functional and non-functional requirements, constraints, modernization objectives, and appendices for stakeholder alignment and traceability.

## 2. Current System Description
### 2.1 Business Context
WebJET CMS is a content management system designed for business websites, e-shops, and portals. It targets organizations seeking secure, user-friendly, and extensible web content management. Key user personas include:
- Content editors (non-technical users)
- Web administrators
- Developers integrating or extending the system
- Business stakeholders (e.g., marketing, IT managers)

Primary use cases:
- Creating, editing, and publishing web content without programming skills
- Structuring websites with customizable navigation and page trees
- Embedding applications (surveys, maps, galleries)
- Managing files and media assets
- Analyzing web traffic and performance
- Integrating with other products in the WebJET family

### 2.2 Functional Requirements
| Requirement ID | Description                                                                 | Traceability                        |
|---------------|-----------------------------------------------------------------------------|-------------------------------------|
| FR-001        | Allow content creation and editing via browser-based UI                      | src/main/java/sk/iwcm/web, README   |
| FR-002        | Provide customizable website structure (tree navigation)                     | src/main/java/sk/iwcm/web/pages     |
| FR-003        | Enable drag-and-drop file uploads                                            | src/main/java/sk/iwcm/files         |
| FR-004        | Support embedding of surveys, maps, galleries, and other applications        | src/main/java/sk/iwcm/apps          |
| FR-005        | Offer performance monitoring and analytics                                   | src/main/java/sk/iwcm/statistics    |
| FR-006        | Integrate with other WebJET family products                                  | src/main/java/sk/iwcm/integration   |
| FR-007        | Provide secure user authentication and authorization                         | src/main/java/sk/iwcm/security      |
| FR-008        | Allow form creation (forms, discussions, surveys, directories, calendars)    | src/main/java/sk/iwcm/forms         |
| FR-009        | Support multi-language and localization                                      | src/main/java/sk/iwcm/i18n          |
| FR-010        | Enable extensibility via plugins or modules                                  | build.gradle, src/main/java         |

### 2.3 Non-Functional Requirements
| Requirement ID | Category     | Metric                            | Current Value                       |
|---------------|-------------|------------------------------------|-------------------------------------|
| NFR-001        | Performance  | Page load time (average)           | <2s for standard pages              |
| NFR-002        | Scalability  | Concurrent users supported         | 1000+ (based on JVM/DB config)      |
| NFR-003        | Security     | OWASP Top 10 compliance            | Security filters, dependency checks |
| NFR-004        | Availability | Uptime                             | 99.9% (with proper deployment)      |
| NFR-005        | Maintainability | Code modularity, test coverage   | Modular Java/Spring, Jacoco reports |
| NFR-006        | Usability    | Non-technical user onboarding time | <1 hour (intuitive UI)              |

### 2.4 Constraints
- Technology stack: Java 17, Spring Framework, Spring Data, Spring Web, DataTables.net, Gradle
- Deployment: JVM-based, WAR packaging, Tomcat 9 (default via Gretty plugin)
- Database: MariaDB, PostgreSQL, Oracle (supported via JDBC drivers)
- Security: Relies on Spring Security, regular dependency checks (OWASP Dependency Check)
- Excludes proprietary modules and third-party commercial integrations

## 3. Modernization Objectives
### 3.1 Goals
- Enhance cloud-native deployment capabilities (containerization, orchestration)
- Improve modularity for microservices adoption
- Increase test automation and code coverage
- Streamline UI for accessibility and mobile responsiveness
- Strengthen security posture (automated scans, dependency management)

### 3.2 Success Criteria
- 50% reduction in manual deployment/configuration steps (via automation)
- 30% increase in automated test coverage (measured by Jacoco)
- Measurable reduction in security vulnerabilities (OWASP Dependency Check reports)
- Improved user satisfaction (usability surveys, onboarding time)
- Successful deployment in containerized/cloud environments

### 3.3 Risks and Assumptions
- Risk: Legacy code dependencies may hinder modularization
- Risk: Migration to microservices may impact existing integrations
- Risk: User retraining required for major UI/UX changes
- Assumption: Core business logic remains stable during modernization
- Assumption: Open-source community support for upgrades

## 4. Appendices
### A. Glossary
- Content Editor: User responsible for creating and updating website content
- Plugin: Extensible module that adds features to the CMS
- WAR: Web Application Archive (Java deployment package)
- Jacoco: Java code coverage tool
- Gretty: Gradle plugin for running web applications

### B. Stakeholder Matrix
| Stakeholder       | Role             | Concerns                                      |
|-------------------|------------------|-----------------------------------------------|
| Content Editors   | End User         | Ease of use, reliability, content workflow     |
| Web Admins        | Admin/Operator   | Security, uptime, integration, backups        |
| Developers        | Extender         | API stability, extensibility, documentation   |
| Business Owners   | Sponsor          | ROI, modernization progress, compliance       |
| IT Managers       | Decision Maker   | Scalability, maintainability, vendor lock-in  |

**Standards Alignment**: ISO/IEC/IEEE 29148:2011 (Requirements engineering), ISO/IEC 25010:2011 (System and software quality models).

**Traceability**: Requirements are traceable to source code modules and build configuration files. For further traceability, see the repository's docs and code comments.

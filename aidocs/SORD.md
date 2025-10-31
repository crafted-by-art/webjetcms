# System Overview and Requirements Document (SORD)

## Version History
| Version | Date       | Author           | Changes                 |
|---------|------------|------------------|-------------------------|
| 1.0     | 2024-06-07 | AI Documentation | Initial version created |

## 1. Introduction
### 1.1 Purpose
This document provides a high-level "As-Is" snapshot of the WebJET CMS system. It is intended to align stakeholders on the current state, business value, and modernization goals for the open-source community edition of WebJET CMS.

### 1.2 Scope
The scope includes the core modules and features of WebJET CMS as maintained in this repository. Third-party libraries, proprietary extensions, and external integrations are excluded from this analysis.

### 1.3 Definitions, Acronyms, Abbreviations
- CMS: Content Management System
- LOC: Lines of Code
- UI: User Interface
- API: Application Programming Interface
- OSS: Open Source Software
- KPI: Key Performance Indicator

### 1.4 References
- [WebJET CMS Documentation](https://docs.webjetcms.sk/)
- [WebJET CMS Website](https://www.webjetcms.com)
- [Spring Framework Documentation](https://spring.io/projects/spring-framework)
- [DataTables.net Documentation](https://datatables.net/)

### 1.5 Overview
This document is structured to provide:
- An overview of the business context and use cases
- Functional and non-functional requirements
- System constraints
- Modernization objectives and measurable success criteria
- Appendices for glossary and stakeholder matrix

## 2. Current System Description
### 2.1 Business Context
WebJET CMS is a content management system designed for business websites, e-shops, and portals. It targets users who require a secure, scalable, and user-friendly platform for managing web content without programming expertise. Key user personas include:
- Business owners and marketers
- Content editors and web administrators
- IT support and technical staff

Use Cases:
- Create and edit web content via browser-based UI
- Manage site structure and navigation
- Embed applications (surveys, maps, galleries)
- Upload files and assets
- Analyze web traffic and performance
- Integrate with other WebJET family products

### 2.2 Functional Requirements
| Requirement ID | Description                                                         | Traceability                |
|---------------|---------------------------------------------------------------------|-----------------------------|
| FR-001        | User authentication and role-based access control                   | src/main, Spring Security   |
| FR-002        | Content creation, editing, and publishing via browser UI            | src/main/webjet8            |
| FR-003        | Customizable site structure (tree-based navigation)                 | src/main/webjet8            |
| FR-004        | Embedding applications (surveys, maps, galleries)                   | src/main/webjet8/apps       |
| FR-005        | File upload and management (drag-and-drop)                          | src/main/webjet8/files      |
| FR-006        | Form creation (discussions, surveys, directories, calendar events)  | src/main/webjet8/forms      |
| FR-007        | Web traffic analysis and performance monitoring                     | src/main/webjet8/stats      |
| FR-008        | Integration with other WebJET family products                       | src/main/webjet8/integrations|
| FR-009        | Regular updates and technical support (community edition)           | docs/, README.md            |

### 2.3 Non-Functional Requirements
| Requirement ID | Category     | Metric                          | Current Value                  |
|---------------|-------------|----------------------------------|-------------------------------|
| NFR-001        | Performance  | Page load time                   | < 2 seconds (target)           |
| NFR-002        | Scalability  | Concurrent users supported        | 1000+ (target, see Spring)     |
| NFR-003        | Security     | OWASP Top 10 compliance           | Advanced filters, see README   |
| NFR-004        | Usability    | No programming required           | UI tested, see README          |
| NFR-005        | Availability | Uptime                            | 99.9% (target, see docs)       |
| NFR-006        | Maintainability| Modular code structure           | src/main/webjet8, Gradle       |

### 2.4 Constraints
- Technology stack: Java (Spring Framework, Spring Data, Spring Web), DataTables.net
- Open-source community edition; some features may be limited compared to enterprise/proprietary versions
- Integration points limited to WebJET family products and documented APIs
- Deployment environment: Java web server (e.g., Tomcat)

## 3. Modernization Objectives
### 3.1 Goals
- Enhance cloud-native compatibility and deployment options
- Improve modularity and microservices readiness
- Increase security and compliance with latest standards
- Optimize performance and scalability for larger user bases
- Streamline UI/UX for non-technical users

### 3.2 Success Criteria
- Reduction in LOC for legacy modules by 30%
- Achieve page load times < 1.5 seconds under typical load
- Pass automated security scans with zero critical vulnerabilities
- Increase concurrent user support to 5000+
- Achieve 99.99% uptime in cloud deployments
- User satisfaction score > 90% in usability surveys

### 3.3 Risks and Assumptions
- Risk: Legacy code refactoring may introduce regressions
- Risk: Cloud migration may require changes to integration points
- Assumption: Community support will continue for OSS edition
- Assumption: Existing user base will adopt new UI/UX features
- Risk: Third-party dependencies may require updates for compliance

## 4. Appendices
### A. Glossary
- CMS: Content Management System
- UI: User Interface
- API: Application Programming Interface
- OSS: Open Source Software
- KPI: Key Performance Indicator

### B. Stakeholder Matrix
| Stakeholder        | Role                | Concerns                           |
|--------------------|---------------------|------------------------------------|
| Business Owner     | Sponsor             | ROI, time-to-market, usability     |
| Content Editor     | End User            | Ease of use, reliability           |
| IT Administrator   | Support             | Security, maintainability          |
| Developer          | Maintainer          | Code quality, extensibility        |
| Community Member   | Contributor         | Openness, documentation            |

**Standards Alignment**: ISO/IEC/IEEE 29148:2011 (Requirements engineering), ISO/IEC 25010:2011 (System and software quality models).

**Traceability**: Functional requirements mapped to code modules; see README and src/main/webjet8 for implementation details.

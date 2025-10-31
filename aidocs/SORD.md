# System Overview and Requirements Document (SORD)

## 1. Introduction

### 1.1 Purpose
This document provides a comprehensive overview and requirements analysis for the WebJET CMS project. It is intended to guide stakeholders, developers, and modernization teams in understanding the system, its business context, functional and non-functional requirements, and modernization objectives.

### 1.2 Scope
WebJET CMS is an open-source content management system (CMS) designed for business websites, e-shops, and portals. It enables users to create, manage, and optimize web content efficiently without requiring programming skills. The system is trusted by major institutions and is designed for scalability, security, and ease of integration.

### 1.3 Definitions, Acronyms, and Abbreviations
- **CMS**: Content Management System
- **UI**: User Interface
- **API**: Application Programming Interface
- **Spring**: Java-based application framework
- **JPA**: Java Persistence API

## 2. System Overview

### 2.1 Business Context
WebJET CMS addresses the needs of organizations seeking a robust, secure, and user-friendly platform for managing digital content. It is particularly suited for businesses that require:
- Rapid deployment of websites and portals
- Non-technical content management
- Integration with other business systems
- High security and compliance standards

### 2.2 System Description
WebJET CMS is built using the Java programming language and leverages the Spring Framework (including Spring Data and Spring Web) for backend operations. The frontend utilizes DataTables.net for advanced data table functionalities. The system supports:
- Customizable site structures
- Application embedding (surveys, maps, galleries)
- File upload and management
- Form and survey creation
- Web traffic analysis
- Performance monitoring
- Integration with WebJET family products

### 2.3 Technologies and Architecture
- **Backend**: Java, Spring Framework, Spring Data, JPA
- **Frontend**: DataTables.net, HTML, JavaScript
- **Build Tool**: Gradle
- **Application Server**: Tomcat (directory present)
- **Other**: AspectJ, Lombok, integration and suppression configuration files
- **Directory Structure**:
  - `src/main/java/sk/iway/webjet/v9`: Contains core configuration and logic classes
  - `src/main/webapp`: Web application resources
  - `docs/`: Documentation and user guides

## 3. Functional Requirements

### 3.1 Content Management
- FR-1: The system shall allow users to create, edit, and delete web pages and content blocks.
- FR-2: The system shall provide a WYSIWYG editor for non-technical users.
- FR-3: The system shall support drag-and-drop file uploads.
- FR-4: The system shall allow embedding of applications (e.g., surveys, maps, galleries).
- FR-5: The system shall support creation and management of forms, discussions, surveys, directories, and calendar events.

### 3.2 User Management
- FR-6: The system shall provide user authentication and role-based access control.
- FR-7: The system shall allow administrators to manage user accounts and permissions.

### 3.3 Analytics and Monitoring
- FR-8: The system shall provide web traffic analysis and reporting tools.
- FR-9: The system shall include performance monitoring features for administrators.

### 3.4 Integration and Extensibility
- FR-10: The system shall integrate with other WebJET family products.
- FR-11: The system shall provide APIs for custom integrations.

### 3.5 Localization
- FR-12: The system shall support multiple languages for content and UI.

## 4. Non-Functional Requirements

### 4.1 Performance
- NFR-1: The system shall support concurrent access by at least 100 users without performance degradation.
- NFR-2: Page load times shall not exceed 2 seconds under normal operating conditions.

### 4.2 Scalability
- NFR-3: The system shall be horizontally scalable to support increased user loads and content volume.

### 4.3 Security
- NFR-4: The system shall implement robust security filters to prevent common web vulnerabilities (e.g., XSS, CSRF, SQL injection).
- NFR-5: The system shall provide secure authentication and authorization mechanisms.
- NFR-6: The system shall comply with GDPR and other relevant data protection regulations.

### 4.4 Reliability and Availability
- NFR-7: The system shall provide 99.9% uptime, excluding scheduled maintenance.
- NFR-8: The system shall provide regular data backups and disaster recovery procedures.

### 4.5 Usability
- NFR-9: The system shall provide an intuitive, browser-based UI accessible from major browsers.
- NFR-10: The system shall provide comprehensive documentation and user support.

### 4.6 Maintainability
- NFR-11: The system shall use modular, well-documented code to facilitate maintenance and future enhancements.

## 5. Modernization Objectives

### 5.1 Objectives
- MO-1: Migrate legacy components to modern Spring-based architecture.
- MO-2: Enhance security by updating dependencies and implementing best practices.
- MO-3: Improve scalability and performance for enterprise use cases.
- MO-4: Refactor codebase for maintainability and extensibility.
- MO-5: Expand API support for integrations.
- MO-6: Enhance UI/UX for non-technical users.

### 5.2 Success Criteria
- SC-1: All core functionalities are available in the modernized system.
- SC-2: Security vulnerabilities are remediated and compliance is ensured.
- SC-3: System performance and scalability targets are met.
- SC-4: Codebase is modular and maintainable.
- SC-5: Positive user feedback on usability and new features.

## 6. Requirements Traceability Matrix

| Requirement ID | Description | Source | Status |
| -------------- | ----------- | ------ | ------ |
| FR-1 | Content creation/editing | README, code | Implemented |
| FR-2 | WYSIWYG editor | README | Implemented |
| FR-3 | Drag-and-drop uploads | README | Implemented |
| FR-4 | Application embedding | README | Implemented |
| FR-5 | Forms, surveys, events | README | Implemented |
| FR-6 | User authentication | Code | Implemented |
| FR-7 | User management | Code | Implemented |
| FR-8 | Web analytics | README | Implemented |
| FR-9 | Performance monitoring | README | Implemented |
| FR-10 | Product integration | README | Implemented |
| FR-11 | API integrations | Code | Planned |
| FR-12 | Localization | README | Implemented |
| NFR-1 to NFR-11 | Non-functional requirements | Analysis | Ongoing |
| MO-1 to MO-6 | Modernization objectives | Analysis | In Progress |

## 7. References
- [WebJET CMS Documentation](https://docs.webjetcms.sk/)
- [WebJET CMS Website](https://www.webjetcms.com)
- Source code and README in [WebJET CMS GitHub Repository](https://github.com/crafted-by-art/webjetcms)

---

*This SORD is aligned with ISO/IEC/IEEE 29148:2011 requirements engineering standards and will be maintained as the system evolves.*

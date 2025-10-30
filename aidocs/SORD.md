# System Overview and Requirements Document (SORD)

**Repository:** [crafted-by-art/webjetcms](https://github.com/crafted-by-art/webjetcms)
**Branch:** aidocs-20240608-1857
**Template Source:** modernization-analysis-templates/sord-template.md (template unavailable, structure inferred from ISO/IEC/IEEE 29148:2011 and best practices)

---

## 1. System Overview

### 1.1 Purpose
WebJET CMS is an open-source content management system (CMS) designed to enable businesses, e-shops, and portals to efficiently create, manage, and publish web content. The system is tailored for users with minimal technical expertise and provides robust security, scalability, and integration capabilities. WebJET CMS is trusted by major banking institutions and has over 20 years of development history.

### 1.2 Scope
WebJET CMS supports:
- Content creation, editing, and publishing
- Custom site structure management
- Embedding of versatile applications (surveys, maps, galleries, etc.)
- File uploads via drag-and-drop
- Form and survey creation
- Web traffic analysis and statistics
- Integration with WebJET family products
- AI-powered content assistance (grammar correction, translation, summarization, image generation)
- Multi-domain support and domain-specific content separation
- E-commerce features (product management, payment methods)

### 1.3 System Context
WebJET CMS operates as a web application deployed on Java EE servers (Tomcat), accessible via web browsers. It interacts with relational databases (MariaDB, PostgreSQL, Oracle, MS SQL) and integrates with external services (e.g., DeepL for translation, payment gateways).

---

## 2. Business Context

### 2.1 Stakeholders
- **Business Owners**: Require reliable, secure, and scalable web presence.
- **Content Editors**: Need intuitive tools for content creation and management.
- **Web Developers**: Extend and customize CMS features, integrate with other systems.
- **System Administrators**: Maintain, monitor, and secure the CMS.
- **End Users**: Interact with published content and e-commerce features.

### 2.2 Business Objectives
- Reduce time and cost for website management
- Enable non-technical users to manage content
- Ensure high security and compliance for sensitive industries
- Support multi-domain and multi-language deployments
- Provide extensibility for custom applications and integrations

---

## 3. Functional Requirements

### 3.1 Content Management
- FR-01: Users shall be able to create, edit, and delete web pages and articles.
- FR-02: Users shall be able to manage site structure using a tree view.
- FR-03: Users shall be able to upload files via drag-and-drop.
- FR-04: Users shall be able to create forms, surveys, discussions, directories, and calendar events.
- FR-05: Users shall be able to embed applications (e.g., maps, galleries) into pages.

### 3.2 AI Assistance
- FR-06: The system shall provide AI-powered grammar correction, translation, headline design, summarization, and image generation within the editor.

### 3.3 Multi-domain & Multi-language Support
- FR-07: The system shall support content separation and customization by domain.
- FR-08: The system shall support multi-language menus and content.

### 3.4 E-commerce
- FR-09: The system shall support product listing, payment method configuration, and order management.

### 3.5 User Management & Security
- FR-10: The system shall provide user authentication and authorization.
- FR-11: The system shall support two-step verification for administrators.
- FR-12: The system shall enforce strict URL control for admin interfaces.

### 3.6 Monitoring & Statistics
- FR-13: The system shall provide web traffic analysis, error page tracking, and statistical reporting.
- FR-14: The system shall support server monitoring (database type, current values).

### 3.7 Extensibility
- FR-15: The system shall allow integration with other WebJET family products and external APIs/services.

---

## 4. Non-Functional Requirements

### 4.1 Performance
- NFR-01: The system shall support fast content rendering and page load times.
- NFR-02: The system shall optimize resource usage for small screens and mobile devices.

### 4.2 Scalability
- NFR-03: The system shall support multi-domain and multi-site deployments.
- NFR-04: The system shall handle high traffic and large datasets efficiently.

### 4.3 Security
- NFR-05: The system shall provide advanced security filters to minimize hacker risks.
- NFR-06: The system shall support regular vulnerability scanning and dependency checks (OWASP DependencyCheck).
- NFR-07: The system shall support two-step verification and strict admin URL controls.
- NFR-08: The system shall sanitize HTML inputs and support secure file uploads.

### 4.4 Reliability & Availability
- NFR-09: The system shall provide mechanisms for backup, recovery, and failover.
- NFR-10: The system shall ensure high availability for business-critical deployments.

### 4.5 Maintainability
- NFR-11: The system shall support regular updates and technical support.
- NFR-12: The system shall provide comprehensive documentation for users and developers.

### 4.6 Usability
- NFR-13: The system shall provide an intuitive, browser-based interface for non-technical users.
- NFR-14: The system shall optimize UI for small screens and accessibility.

---

## 5. Technology Stack

- **Backend:** Java 17, Spring Framework (Spring Web, Spring Data, Spring Security)
- **Frontend:** JSP, DataTables.net, CKEditor, custom JS/CSS
- **Database:** MariaDB, PostgreSQL, Oracle, MS SQL
- **Build & Dependency Management:** Gradle
- **Security:** OWASP DependencyCheck, Spring Security, custom filters
- **AI Integration:** DeepL, custom AI modules (content assistance)
- **Other:** Tomcat 9+, HikariCP, MapStruct, Lombok, Jacoco (code coverage), Swagger (API docs)

---

## 6. Modernization Objectives

### 6.1 Objectives
- Remove legacy Struts Framework and migrate to modern Spring-based architecture
- Integrate advanced AI tools for content creation and editing
- Enhance multi-domain and multi-language support
- Improve UI/UX for small screens and accessibility
- Strengthen security controls and compliance
- Optimize for cloud and container deployments

### 6.2 Success Criteria
- Successful migration from Struts to Spring with no loss of functionality
- AI assistant features are fully integrated and operational
- Security vulnerabilities are remediated and regularly scanned
- Performance benchmarks meet/exceed previous versions
- Documentation and support resources are up-to-date
- Stakeholder satisfaction (editor usability, admin controls, developer extensibility)

---

## 7. Traceability Matrix (ISO/IEC/IEEE 29148:2011 Alignment)

| Requirement ID | Source/Justification | Business Objective | Success Criteria |
|----------------|---------------------|-------------------|------------------|
| FR-01 to FR-05 | User stories, README | Content management | Editor usability, content accuracy |
| FR-06          | Roadmap, Changelog  | Innovation, productivity | AI features operational |
| FR-07, FR-08   | Multi-domain clients | Market expansion   | Multi-site deployments |
| FR-09          | E-commerce users     | Revenue generation | Orders/payment processed |
| FR-10 to FR-12 | Security policy      | Compliance, trust  | No unauthorized access |
| FR-13, FR-14   | Admins, business     | Monitoring, reliability | Accurate stats, uptime |
| FR-15          | Integration needs    | Extensibility      | API integrations |
| NFR-01 to NFR-14| Industry standards  | Quality, reliability| Benchmarks met |

---

## 8. References
- [Main README](https://github.com/crafted-by-art/webjetcms/blob/aidocs-20240608-1857/README.md)
- [English Documentation](https://github.com/crafted-by-art/webjetcms/blob/aidocs-20240608-1857/docs/en/README.md)
- [Roadmap](https://github.com/crafted-by-art/webjetcms/blob/aidocs-20240608-1857/docs/en/ROADMAP.md)
- [Changelog](https://github.com/crafted-by-art/webjetcms/tree/aidocs-20240608-1857/docs/en)
- [Build Configuration](https://github.com/crafted-by-art/webjetcms/blob/aidocs-20240608-1857/build.gradle)
- [WebJET CMS Website](https://www.webjetcms.com)
- [WebJET CMS Documentation](https://docs.webjetcms.sk/)

---

## 9. Glossary
- **CMS**: Content Management System
- **AI Assistant**: Integrated tools for automated content improvement
- **Spring Framework**: Java application framework for scalable web apps
- **JSP**: Java Server Pages
- **OWASP**: Open Web Application Security Project
- **DeepL**: AI-powered translation service

---

## 10. Document Control
- **Version:** 2024-06-08
- **Author:** AI Modernization Analysis
- **Status:** Draft (pending stakeholder review)

---

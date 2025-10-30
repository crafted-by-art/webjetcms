# System Overview and Requirements Document (SORD)

## 1. Introduction

### 1.1 Purpose
This System Overview and Requirements Document (SORD) provides a comprehensive analysis of the WebJET CMS open-source repository. It details the business context, system architecture, functional and non-functional requirements, modernization objectives, and success criteria for the continued development and modernization of WebJET CMS.

### 1.2 Scope
WebJET CMS is an enterprise-grade, open-source content management system (CMS) designed for powering business websites, e-shops, and portals. It is built on the Java/Spring technology stack and is used by organizations requiring robust security, scalability, and ease of content management without programming expertise.

### 1.3 Definitions, Acronyms, and Abbreviations
- **CMS:** Content Management System
- **AI:** Artificial Intelligence
- **UI:** User Interface
- **API:** Application Programming Interface
- **JSP:** JavaServer Pages
- **AB Testing:** A/B Testing (split testing)
- **JPA:** Java Persistence API

## 2. System Overview

### 2.1 Business Context
WebJET CMS addresses the needs of organizations seeking to manage digital content efficiently and securely. Its target users include business owners, content editors, developers, and system administrators. The system is trusted by major banking institutions and offers both community (open source) and enterprise editions.

### 2.2 System Description
WebJET CMS enables:
- Creation and editing of web content without programming skills
- Customizable site structures and templates
- Integration with applications (e.g., surveys, galleries, e-commerce)
- Advanced security and performance monitoring
- AI-assisted content creation (grammar correction, translation, summarization, image generation)
- Multi-domain and multi-language support
- Seamless integration with other WebJET family products

### 2.3 Technologies and Architecture
- **Backend:** Java 17, Spring Framework (Spring Web, Spring Data, Spring Security, Spring MVC)
- **Frontend:** JSP, DataTables.net, custom JavaScript, CSS
- **Database:** MariaDB, PostgreSQL, Oracle, Microsoft SQL Server (via JDBC)
- **Build/Deployment:** Gradle, Tomcat 9 (with support for Jetty)
- **Security:** Spring Security, OWASP dependency checks, two-factor authentication
- **AI Integration:** CKEditor plugins, AI assistants for content editing
- **Other:** MapStruct, Hibernate Validator, Jackson, Freemarker, Velocity, Lucene

## 3. Functional Requirements

### 3.1 Content Management
- FR-1: Users shall create, edit, and delete web pages, news, and content blocks.
- FR-2: Users shall manage site structure using a customizable tree.
- FR-3: Users shall upload and manage files via drag-and-drop.
- FR-4: Users shall create and manage forms, surveys, discussions, and events.
- FR-5: Users shall embed applications (e.g., maps, galleries) into pages.

### 3.2 User and Role Management
- FR-6: The system shall support user authentication and role-based access control.
- FR-7: Administrators shall manage users, roles, and permissions.

### 3.3 AI-Assisted Editing
- FR-8: Users shall access AI tools for grammar correction, translation, summarization, and image generation within the editor.

### 3.4 Multi-Domain and Multi-Language Support
- FR-9: The system shall support multiple domains and languages, with domain-specific content and templates.

### 3.5 E-Commerce
- FR-10: Users shall manage products, orders, and payment methods (in e-shop mode).

### 3.6 Analytics and Monitoring
- FR-11: The system shall provide web traffic analysis and performance monitoring tools.
- FR-12: Administrators shall access audit logs and change history.

### 3.7 Integration and Extensibility
- FR-13: The system shall integrate with other WebJET products and external APIs.
- FR-14: Developers shall extend functionality via plugins and custom applications.

## 4. Non-Functional Requirements

### 4.1 Performance
- NFR-1: The system shall support concurrent editing by multiple users without significant performance degradation.
- NFR-2: Page load times for the admin UI shall not exceed 2 seconds under normal load.

### 4.2 Scalability
- NFR-3: The system shall support scaling to multiple domains and thousands of pages.
- NFR-4: The architecture shall support horizontal scaling via load balancing.

### 4.3 Security
- NFR-5: The system shall implement robust authentication and authorization (Spring Security).
- NFR-6: All dependencies shall be checked for vulnerabilities (OWASP dependency check).
- NFR-7: The system shall support two-factor authentication for admin users.
- NFR-8: The system shall sanitize user inputs to prevent XSS and injection attacks.

### 4.4 Maintainability
- NFR-9: The codebase shall follow Java best practices and be documented for developer onboarding.
- NFR-10: Automated tests shall cover core functionality.

### 4.5 Usability
- NFR-11: The UI shall be intuitive for non-technical users.
- NFR-12: The system shall support accessibility standards (WCAG 2.1 AA where feasible).

### 4.6 Internationalization
- NFR-13: The system shall support content and UI localization.

## 5. Modernization Objectives

### 5.1 Removal of Legacy Frameworks
- M-OBJ-1: Remove obsolete frameworks (e.g., Struts) and migrate to modern Spring-based architecture.

### 5.2 AI Integration
- M-OBJ-2: Integrate AI assistants for content creation and editing.

### 5.3 Improved Security
- M-OBJ-3: Enhance security controls, including stricter URL validation and two-factor authentication.

### 5.4 Enhanced User Experience
- M-OBJ-4: Optimize UI for smaller screens and modernize the admin interface.

### 5.5 Extensibility and API-First
- M-OBJ-5: Improve plugin architecture and provide well-documented APIs for integration.

## 6. Success Criteria
- SC-1: All legacy code (e.g., Struts) is removed and replaced with Spring-based solutions.
- SC-2: AI assistant features are available and used by content editors.
- SC-3: The system passes security audits and OWASP dependency checks.
- SC-4: The admin UI is responsive and accessible.
- SC-5: Documentation and automated tests are updated and cover new features.
- SC-6: The system supports multi-domain, multi-language, and e-commerce scenarios as described.

## 7. Traceability Matrix
| Requirement ID | Description | Source/Justification |
| -------------- | ----------- | ------------------- |
| FR-1 to FR-5   | Content management | Business needs, README, docs |
| FR-6, FR-7     | User/role management | Security, business needs |
| FR-8           | AI-assisted editing | Modernization, docs/en/README.md |
| FR-9           | Multi-domain/lang   | README, docs |
| FR-10          | E-commerce          | README, docs |
| FR-11, FR-12   | Analytics/monitoring| README, docs |
| FR-13, FR-14   | Integration/extensibility | Developer docs |
| NFR-1 to NFR-13| Non-functional reqs | Industry best practices, ISO/IEC/IEEE 29148:2011 |
| M-OBJ-1 to M-OBJ-5 | Modernization objectives | Roadmap, changelogs |
| SC-1 to SC-6   | Success criteria    | Modernization goals |

## 8. References
- [WebJET CMS GitHub Repository](https://github.com/crafted-by-art/webjetcms)
- [WebJET CMS Documentation](https://docs.webjetcms.sk/)
- [ISO/IEC/IEEE 29148:2011](https://www.iso.org/standard/45171.html)
- [Spring Framework Documentation](https://spring.io/projects/spring-framework)
- [OWASP Dependency Check](https://owasp.org/www-project-dependency-check/)

---

*Document generated on 2024-06-08 for the WebJET CMS open-source community version. For further details, consult the repository documentation and roadmap.*

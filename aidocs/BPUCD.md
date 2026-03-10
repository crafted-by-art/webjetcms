# Business Process and Use Case Document (BPUCD)

## Version History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0     | 2024-03-10 | AI Modernization Analyst | Initial version, based on code and documentation analysis |

## 1. Introduction
### 1.1 Purpose
This document bridges technical analysis to business value for WebJET CMS, ensuring that modernization preserves and enhances core content management functionality. It provides traceability from business process to code, identifies actors, and assesses modernization impacts in line with BPMN 2.0.2 and ISO/IEC/IEEE 29148:2011 standards.

### 1.2 Scope
Covers core content management, user management, form processing, file management, and extensibility features as implemented in the open-source WebJET CMS repository.

### 1.3 Actors and Roles
| Actor           | Role                                              |
|-----------------|---------------------------------------------------|
| Content Editor  | Creates, edits, and publishes website content     |
| Site Admin      | Manages users, permissions, site structure        |
| End User        | Views and interacts with published content        |
| Developer       | Extends CMS with custom modules/components        |
| System          | Executes scheduled/background jobs, enforces security |

## 2. Process Models
### 2.1 High-Level BPMN Diagrams
[Diagram placeholder: ![BPMN](docs/bpmn/webjetcms-bpmn.png)]

#### Main Processes:
- Content Lifecycle (Create/Edit/Publish)
- User Management
- Form Management
- File Upload/Management
- Site Structure & Navigation

### 2.2 Detailed Use Cases

#### Use Case ID: UC-001 – Content Creation & Publishing
- **Preconditions**: User has Editor or Admin role; authenticated session
- **Steps**:
  1. Editor logs in
  2. Navigates to content editor (e.g., via /admin)
  3. Creates or edits a page/article (see `sk.iway.iwcm/doc/DocBasic.java`, `ShowDoc.java`)
  4. Saves draft or publishes
  5. System updates site structure and content database
- **Postconditions**: Content is available to end users per permissions

#### Use Case ID: UC-002 – User Management
- **Preconditions**: User has Admin role
- **Steps**:
  1. Admin logs in
  2. Navigates to user management (see `sk.iway.iwcm/users/PermissionGroupBean.java`)
  3. Creates/edits/deletes users or groups
  4. Assigns permissions
  5. Saves changes
- **Postconditions**: User accounts and permissions updated

#### Use Case ID: UC-003 – Form Creation and Data Management
- **Preconditions**: Editor/Admin authenticated
- **Steps**:
  1. Editor/Admin accesses form builder (see `sk.iway.iwcm/components/forms/FormsController.java`)
  2. Creates/edits a form
  3. Publishes form on site
  4. End user submits form
  5. Data is validated and stored (see `FormsService.java`)
  6. Admin reviews submissions via admin panel
- **Postconditions**: Form data stored and available for review/export

#### Use Case ID: UC-004 – File Upload and Management
- **Preconditions**: Editor/Admin authenticated
- **Steps**:
  1. User accesses file browser (see `sk.iway.iwcm/filebrowser/FbrowserController.java`)
  2. Uploads/selects files
  3. Files are stored and indexed
  4. Files linked to content as needed
- **Postconditions**: Files available for use in content

#### Use Case ID: UC-005 – Site Structure Management
- **Preconditions**: Admin authenticated
- **Steps**:
  1. Admin accesses site structure tools (see `sk.iway.iwcm/doc/GroupsDB.java`)
  2. Creates/edits/deletes site sections/groups
  3. Assigns templates and permissions
  4. Saves structure
- **Postconditions**: Navigation and site structure updated

## 3. Mapping to Code
### 3.1 Process-to-Module Traceability
| Process/Use Case                | Module/Path                                        | Trace ID |
|---------------------------------|----------------------------------------------------|----------|
| Content Creation & Publishing   | sk.iway.iwcm.doc (DocBasic.java, ShowDoc.java)      | UC-001   |
| User Management                 | sk.iway.iwcm.users (PermissionGroupBean.java, etc.) | UC-002   |
| Form Management                 | sk.iway.iwcm.components.forms (FormsController.java, FormsService.java) | UC-003   |
| File Upload/Management          | sk.iway.iwcm.filebrowser (FbrowserController.java)  | UC-004   |
| Site Structure Management       | sk.iway.iwcm.doc (GroupsDB.java, GroupsTreeService.java) | UC-005   |

### 3.2 Pain Points
- Some legacy modules use direct SQL and may lack abstraction
- UI customization requires code changes (limited dynamic configuration)
- Batch jobs (e.g., content export, statistics) may cause delays
- Security model is role-based but may lack fine-grained controls
- Some features (e.g., advanced workflow, real-time collaboration) are not present

## 4. Modernization Impacts
### 4.1 Gaps
- No real-time collaborative editing
- Limited REST API coverage for headless use
- UI/UX modernization needed for some admin tools
- No built-in multi-language content workflow
- Some modules tightly coupled, limiting microservices migration

### 4.2 Prioritization
| Item                        | MoSCoW | Rationale                              |
|-----------------------------|--------|----------------------------------------|
| REST API for all modules    | Must   | Enables headless and integration use   |
| Real-time editing           | Should | Improves collaboration                 |
| UI/UX redesign              | Should | Enhances usability                     |
| Microservices refactoring   | Could  | For future scalability                 |
| Fine-grained permissions    | Must   | Security best practice                 |
| Multi-language workflow     | Should | For international deployments          |

## 5. Appendices
### A. Process Narratives
- Content Editors use a WYSIWYG interface to manage pages, with changes reflected in the site structure tree. Publishing triggers updates to the live site.
- Admins manage users and groups, assigning permissions that control access to content and admin features.
- Forms are created via a builder, embedded in pages, and submissions are stored for later review/export.
- File management is handled via a browser-like interface, supporting uploads and linking to content.
- Site structure is managed via a hierarchical group/page model, supporting templates and navigation.

### B. RTM to SORD
| Requirement (from SORD)      | Satisfied in Module/Use Case | Notes |
|------------------------------|------------------------------|-------|
| Content CRUD                 | UC-001, sk.iway.iwcm.doc     |       |
| User/Permission Management   | UC-002, sk.iway.iwcm.users   |       |
| Form Processing              | UC-003, sk.iway.iwcm.components.forms | |
| File Upload/Management       | UC-004, sk.iway.iwcm.filebrowser |   |
| Site Structure               | UC-005, sk.iway.iwcm.doc     |       |

**Standards Alignment**: ISO/IEC/IEEE 29148:2011 (Requirements engineering), BPMN 2.0.2.

**Traceability**: See SORD and CIAR documents for requirements mapping and architectural rationale.

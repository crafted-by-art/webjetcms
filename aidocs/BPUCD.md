# Business Process and Use Case Document (BPUCD)

## Version History
| Version | Date       | Author           | Changes                 |
|---------|------------|------------------|-------------------------|
| 1.0     | 2024-06-07 | AI Documentation | Initial version created |

## 1. Introduction
### 1.1 Purpose
This document bridges technical analysis and business value for WebJET CMS, ensuring that modernization efforts preserve and enhance core business functionality. It provides a comprehensive mapping of business processes, user roles, and use cases to technical modules, supporting effective modernization and migration.

### 1.2 Scope
Covers the core business processes and user-facing features of WebJET CMS Community Edition, including content management, site structure, application embedding, file management, form creation, analytics, and integrations. Excludes proprietary extensions and third-party integrations not maintained in the open-source repository.

### 1.3 Actors and Roles
| Actor            | Role                                   |
|------------------|----------------------------------------|
| Content Editor   | Creates, edits, and publishes content  |
| Site Admin       | Manages users, permissions, and config |
| Business Owner   | Oversees site objectives and analytics |
| IT Support       | Maintains deployment and security      |
| End User         | Consumes published content             |

## 2. Process Models
### 2.1 High-Level BPMN Diagrams

#### Content Management End-to-End (BPMN)
~~~mermaid
flowchart TD
    A[Login] --> B[Dashboard]
    B --> C[Create/Edit Content]
    C --> D[Preview/Publish]
    D --> E[Site Structure Management]
    E --> F[Embed Applications]
    F --> G[Upload Files]
    G --> H[Analyze Web Traffic]
    H --> I[Logout]
~~~

### 2.2 Detailed Use Cases

**Use Case ID: UC-001 - Content Creation and Publishing**
- **Preconditions**: User is authenticated as Content Editor or Site Admin
- **Steps**:
  1. Navigate to dashboard
  2. Select 'Create New Page' or 'Edit Page'
  3. Enter or update content in WYSIWYG editor
  4. Optionally embed apps (survey, gallery, map)
  5. Save as draft or publish
- **Postconditions**: Content is saved and visible to authorized users

**Use Case ID: UC-002 - Site Structure Management**
- **Preconditions**: User is Site Admin
- **Steps**:
  1. Access site structure tree
  2. Add, remove, or reorder pages/nodes
  3. Assign navigation labels and permissions
  4. Save structure
- **Postconditions**: Site navigation is updated

**Use Case ID: UC-003 - Application Embedding**
- **Preconditions**: User is editing a page
- **Steps**:
  1. Select 'Embed Application' in editor
  2. Choose app type (survey, gallery, map)
  3. Configure app parameters
  4. Insert into content
- **Postconditions**: Application is embedded and functional on page

**Use Case ID: UC-004 - File Upload and Management**
- **Preconditions**: User is authenticated
- **Steps**:
  1. Navigate to file manager
  2. Drag and drop or select files to upload
  3. Organize files in folders
  4. Set access permissions
- **Postconditions**: Files are available for use in content

**Use Case ID: UC-005 - Form Creation**
- **Preconditions**: User is Site Admin or Editor
- **Steps**:
  1. Access forms module
  2. Select form type (survey, discussion, directory, calendar)
  3. Define fields and logic
  4. Save and publish form
- **Postconditions**: Form is available for end users

**Use Case ID: UC-006 - Web Analytics**
- **Preconditions**: User is Business Owner or Site Admin
- **Steps**:
  1. Access analytics dashboard
  2. Select metrics (traffic, engagement, performance)
  3. Filter by date or page
  4. Export or share reports
- **Postconditions**: Analytics data is available for business decisions

**Use Case ID: UC-007 - User and Permission Management**
- **Preconditions**: User is Site Admin
- **Steps**:
  1. Access user management
  2. Add/edit/remove users
  3. Assign roles and permissions
  4. Save changes
- **Postconditions**: User access is updated

## 3. Mapping to Code
### 3.1 Process-to-Module Traceability
| Process/Use Case                | Module/Directory                  | Trace ID           |
|---------------------------------|-----------------------------------|--------------------|
| Content Creation/Publishing     | src/main/java/sk/iway/iwcm/editor | UC-001             |
| Site Structure Management       | src/main/java/sk/iway/iwcm/admin  | UC-002             |
| Application Embedding           | src/main/webapp/apps              | UC-003             |
| File Upload/Management          | src/main/java/sk/iway/iwcm/filebrowser | UC-004       |
| Form Creation                   | src/main/java/sk/iway/iwcm/forms  | UC-005             |
| Web Analytics                   | src/main/java/sk/iway/iwcm/stat   | UC-006             |
| User/Permission Management      | src/main/java/sk/iway/iwcm/users  | UC-007             |

### 3.2 Pain Points
- Legacy monolithic structure complicates modularization
- Some UI workflows are tightly coupled to backend logic
- Outdated Lucene search library (upgrade required)
- Moderate code duplication and large classes in core modules
- Limited real-time collaboration features

## 4. Modernization Impacts
### 4.1 Gaps
- Lack of cloud-native deployment support (e.g., Docker/Kubernetes)
- No real-time content collaboration or live preview
- Outdated search and analytics modules
- Limited REST API coverage for headless CMS scenarios
- UI/UX not fully responsive or modernized

### 4.2 Prioritization (MoSCoW)
| Item                                   | MoSCoW | Rationale                                 |
|----------------------------------------|--------|--------------------------------------------|
| Modularize core content/editor modules  | Must   | Enables microservices and easier upgrades   |
| Upgrade Lucene/search stack            | Must   | Security and performance                   |
| Add REST APIs for content management   | Should | Supports headless and integrations         |
| Modernize UI/UX (responsive, SPA)      | Should | Improves usability and adoption            |
| Add real-time collaboration            | Could  | Competitive feature, not critical          |
| Cloud-native deployment (Docker/K8s)   | Could  | Future scalability                         |

## 5. Appendices
### A. Process Narratives

#### Content Management
Content Editors and Site Admins log in to the dashboard, where they can create or edit content using a WYSIWYG editor. They can embed applications, upload files, and preview content before publishing. The system enforces role-based permissions to ensure only authorized users can publish or modify content. Site structure is managed via a tree interface, allowing admins to organize navigation and assign permissions.

#### Application Embedding
Editors can embed surveys, galleries, and maps into content pages. These applications are configured via UI dialogs and inserted as widgets, enhancing interactivity and engagement.

#### File Management
Files are uploaded via drag-and-drop or selection dialogs. Users can organize files into folders and set permissions for access and usage within content.

#### Analytics
Business Owners and Admins use the analytics dashboard to monitor traffic, engagement, and site performance. Reports can be filtered and exported for business analysis.

### B. RTM to SORD
| Requirement (SORD)                  | Use Case/Process         | Trace ID |
|-------------------------------------|--------------------------|----------|
| FR-001: Role-based access control   | User/Permission Mgmt     | UC-007   |
| FR-002: Content creation/editing    | Content Mgmt             | UC-001   |
| FR-003: Custom site structure       | Site Structure Mgmt      | UC-002   |
| FR-004: App embedding               | Application Embedding    | UC-003   |
| FR-005: File upload/management      | File Mgmt                | UC-004   |
| FR-006: Form creation               | Form Creation            | UC-005   |
| FR-007: Web analytics               | Analytics                | UC-006   |
| FR-008: Integrations                | Application Embedding    | UC-003   |

**Standards Alignment**: ISO/IEC/IEEE 29148:2011 (Requirements engineering), BPMN 2.0.2.

**Traceability**: See SORD and CIAR in aidocs/.
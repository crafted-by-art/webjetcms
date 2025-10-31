# Business Process and Use Case Document (BPUCD)

## Version History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0     | 2024-06-01 | AI Modernization Analyst | Initial version based on repository analysis |

## 1. Introduction
### 1.1 Purpose
This document bridges technical analysis to business value for WebJET CMS, ensuring that modernization efforts preserve and enhance core business functionality. It provides a comprehensive mapping of business processes and use cases to the underlying codebase, supporting requirements traceability and future modernization.

### 1.2 Scope
Covers core content management processes, user-facing features, administrative workflows, and integration points within WebJET CMS open-source community edition.

### 1.3 Actors and Roles
| Actor         | Role                                                   |
|---------------|--------------------------------------------------------|
| Website Admin | Manages site structure, content, and user permissions |
| Content Editor| Creates and edits web content                          |
| End User      | Browses and interacts with published content           |
| Developer     | Customizes, extends, and integrates CMS                |
| System        | Performs automated tasks, monitoring, and security     |

## 2. Process Models
### 2.1 High-Level BPMN Diagrams
Below is a high-level BPMN diagram representing the end-to-end content management workflow in WebJET CMS:

~~~mermaid
flowchart TD
    A[Login] --> B[Dashboard]
    B --> C[Create/Edit Content]
    C --> D[Preview]
    D --> E[Publish]
    E --> F[Content Available to End Users]
    B --> G[Manage Site Structure]
    B --> H[File Upload]
    B --> I[Monitor Performance]
    B --> J[Configure Applications]
~~~

### 2.2 Detailed Use Cases
#### Use Case ID: UC-001 - Create/Edit Content
- **Preconditions**: User is authenticated as Admin or Content Editor
- **Steps**:
  1. Navigate to dashboard
  2. Select 'Create Content' or 'Edit Content'
  3. Enter or update content using WYSIWYG editor
  4. Optionally attach files/images
  5. Preview changes
  6. Submit for publishing
- **Postconditions**: Content is saved and available for publishing

#### Use Case ID: UC-002 - Publish Content
- **Preconditions**: Content is created/edited and ready for publication
- **Steps**:
  1. Select content for publishing
  2. Review publishing options (schedule, immediate, etc.)
  3. Confirm publish action
- **Postconditions**: Content is visible to end users

#### Use Case ID: UC-003 - Manage Site Structure
- **Preconditions**: User is authenticated as Admin
- **Steps**:
  1. Access site structure management
  2. Add, remove, or rearrange pages in tree structure
  3. Save changes
- **Postconditions**: Site structure updated

#### Use Case ID: UC-004 - Upload Files
- **Preconditions**: User is authenticated
- **Steps**:
  1. Select 'Upload File' option
  2. Drag and drop or select files
  3. Confirm upload
- **Postconditions**: Files are available for use in content

#### Use Case ID: UC-005 - Analyze Web Traffic
- **Preconditions**: Site is live with visitor activity
- **Steps**:
  1. Access performance monitoring tools
  2. View analytics dashboard
  3. Export or review reports
- **Postconditions**: Performance insights available

#### Use Case ID: UC-006 - Manage Contacts (API)
- **Preconditions**: User has permission 'cmp_contact'
- **Steps**:
  1. Access /admin/rest/apps/contact/ endpoint
  2. View, add, or update contact records
  3. Save changes
- **Postconditions**: Contact records updated

## 3. Mapping to Code
### 3.1 Process-to-Module Traceability
| Process/Use Case        | Module/Component                                  | Trace ID |
|------------------------|---------------------------------------------------|----------|
| Create/Edit Content    | src/main/java/sk/iway/basecms                     | UC-001   |
| Publish Content        | src/main/java/sk/iway/basecms                     | UC-002   |
| Manage Site Structure  | src/main/java/sk/iway/basecms                     | UC-003   |
| Upload Files           | src/main/java/sk/iway/basecms                     | UC-004   |
| Analyze Web Traffic    | src/main/java/sk/iway/basecms                     | UC-005   |
| Manage Contacts (API)  | src/main/java/sk/iway/basecms/contact/ContactRestController.java | UC-006   |

### 3.2 Pain Points
- Legacy batch jobs may cause delays in publishing
- Manual site structure management can be error-prone
- Limited real-time collaboration features
- Integration with external applications may require custom development

## 4. Modernization Impacts
### 4.1 Gaps
- Lack of real-time editing/collaboration
- Limited REST API coverage for all CMS features
- UI/UX modernization needed for admin dashboard
- Automated testing coverage is limited

### 4.2 Prioritization (MoSCoW)
| Item                         | MoSCoW | Rationale                         |
|------------------------------|--------|-----------------------------------|
| Real-time collaboration      | Should | Improves productivity             |
| Full REST API coverage       | Must   | Enables integration/automation    |
| Modern UI/UX for dashboard   | Should | Enhances user experience          |
| Automated testing            | Must   | Ensures reliability               |
| Batch job optimization       | Could  | Reduces delays                    |

## 5. Appendices
### A. Process Narratives
- **Content Creation/Editing**: Users log in, access the dashboard, and use the WYSIWYG editor to create or update content. Files and images can be attached. Preview and publishing are available.
- **Site Structure Management**: Admins organize the site using a tree structure, adding or removing pages as needed.
- **File Upload**: Drag-and-drop interface allows easy file management.
- **Web Traffic Analysis**: Analytics dashboard provides insight into visitor activity and site performance.
- **Contact Management API**: RESTful endpoint at /admin/rest/apps/contact/ allows CRUD operations on contact records, secured by permissions.

### B. RTM to SORD
| Requirement (SORD Ref) | Use Case | Module | Trace ID |
|------------------------|----------|--------|----------|
| SORD-001               | UC-001   | basecms| UC-001   |
| SORD-002               | UC-002   | basecms| UC-002   |
| SORD-003               | UC-003   | basecms| UC-003   |
| SORD-004               | UC-004   | basecms| UC-004   |
| SORD-005               | UC-005   | basecms| UC-005   |
| SORD-006               | UC-006   | contact/ContactRestController.java | UC-006   |

**Standards Alignment**: ISO/IEC/IEEE 29148:2011 (Requirements engineering), BPMN 2.0.2.

**Traceability**: See SORD and CIAR documents for full requirements mapping.

# Business Process and Use Case Document (BPUCD)

## Version History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0     | 2024-06-01 | AI Modernization Analyst | Initial version for WebJET CMS |

## 1. Introduction
### 1.1 Purpose
This document bridges technical analysis to business value, ensuring modernization of WebJET CMS preserves and enhances core business functionality, user experience, and operational efficiency.

### 1.2 Scope
Covers core business processes for content management, administration, user management, and integration workflows within WebJET CMS.

### 1.3 Actors and Roles
| Actor         | Role                        |
|---------------|-----------------------------|
| Administrator | Manages site structure, users, and configuration |
| Editor        | Creates and edits content    |
| Viewer        | Consumes published content   |
| Integrator    | Connects external apps/APIs |
| System        | Executes automated jobs, security, and monitoring |

## 2. Process Models
### 2.1 High-Level BPMN Diagrams

![BPMN](docs/en/redactor/webpages/pagebuilder.png)

#### BPMN Narrative
- Content creation and approval
- Site structure management
- File upload and asset management
- Form and survey creation
- Performance monitoring and reporting

### 2.2 Detailed Use Cases

**Use Case ID: UC-001: Content Creation**  
- **Preconditions**: User is authenticated as Editor or Admin  
- **Steps**:
   1. Navigate to content editor
   2. Create new page or article
   3. Add text, images, and media
   4. Save draft or publish
- **Postconditions**: Content is saved and visible to viewers if published

**Use Case ID: UC-002: Site Structure Management**  
- **Preconditions**: User is authenticated as Admin  
- **Steps**:
   1. Access site structure tree
   2. Add, remove, or reorder sections/pages
   3. Assign permissions
   4. Save changes
- **Postconditions**: Site structure updated and permissions enforced

**Use Case ID: UC-003: File Upload**  
- **Preconditions**: User is authenticated  
- **Steps**:
   1. Navigate to file upload interface
   2. Drag and drop files or select from device
   3. Confirm upload
   4. Files are processed and stored
- **Postconditions**: Files available for use in content or as downloads

**Use Case ID: UC-004: Form/Survey Creation**  
- **Preconditions**: User is authenticated as Editor/Admin  
- **Steps**:
   1. Access form builder
   2. Add fields and configure logic
   3. Save and publish form
   4. Monitor submissions
- **Postconditions**: Form is available to users; submissions are stored

**Use Case ID: UC-005: Performance Monitoring**  
- **Preconditions**: Admin access  
- **Steps**:
   1. Access monitoring dashboard
   2. Review analytics and reports
   3. Configure alerts or actions
- **Postconditions**: Performance data available for decision-making

## 3. Mapping to Code
### 3.1 Process-to-Module Traceability
| Process/Use Case         | Module/Package                        | Trace ID |
|-------------------------|---------------------------------------|----------|
| Content Creation        | sk.iway.iwcm.editor                   | UC-001   |
| Site Structure Mgmt     | sk.iway.iwcm.admin, sk.iway.iwcm.admin.jstree | UC-002   |
| File Upload             | sk.iway.iwcm.admin.upload, sk.iway.iwcm.filebrowser | UC-003   |
| Form/Survey Creation    | sk.iway.iwcm.components, sk.iway.iwcm.admin | UC-004   |
| Performance Monitoring  | sk.iway.iwcm.stat                      | UC-005   |
| User Management         | sk.iway.iwcm.users                     | UC-006   |
| Integration/API         | sk.iway.webjet.v9, sk.iway.iwcm.common | UC-007   |

### 3.2 Pain Points
- Legacy batch jobs may cause delays in reporting
- Manual permission assignment can be error-prone
- Some admin workflows lack real-time feedback
- File upload limits and error handling need improvement

## 4. Modernization Impacts
### 4.1 Gaps
- Missing real-time analytics for editors
- Limited RESTful API endpoints for external integrations
- UI/UX inconsistencies between legacy and modern modules
- Lack of granular audit logging for content changes

### 4.2 Prioritization (MoSCoW)
| Item                        | MoSCoW | Rationale                                   |
|-----------------------------|--------|---------------------------------------------|
| Real-time analytics         | Must   | Critical for editorial decision-making      |
| RESTful API expansion       | Should | Enables broader integrations                |
| UI/UX unification           | Should | Improves user experience                    |
| Audit logging               | Could  | Useful for compliance, not immediately critical |
| Automated permission sync   | Could  | Reduces admin error, but not urgent         |

## 5. Appendices
### A. Process Narratives
- **Content Creation**: Editors use a browser-based interface to create, edit, and publish content. Workflow includes draft, review, and publish states. Media assets are managed via drag-and-drop upload and selection dialogs.
- **Site Structure Management**: Admins organize the site using a tree structure, assigning permissions and configuring navigation. Changes are reflected instantly for users with appropriate access.
- **File Upload**: Users upload files via a responsive interface. Files are validated, stored, and indexed for use in content or download sections.
- **Form/Survey Creation**: Editors build forms using a visual builder, configure validation and submission logic, and monitor responses through integrated analytics.
- **Performance Monitoring**: Admins access dashboards showing site traffic, page load times, and error rates. Alerts can be configured for anomalies.

### B. RTM to SORD
| Requirement (RTM)         | SORD Reference |
|---------------------------|----------------|
| Content creation workflow | SORD-UC-001    |
| Site structure tree       | SORD-UC-002    |
| File upload               | SORD-UC-003    |
| Form builder              | SORD-UC-004    |
| Monitoring dashboard      | SORD-UC-005    |

**Standards Alignment**: ISO/IEC/IEEE 29148:2011 (Requirements engineering), BPMN 2.0.2.

**Traceability**: See SORD and CIAR documents for requirement mapping and architectural rationale.

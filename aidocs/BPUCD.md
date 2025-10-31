# Business Process and Use Case Document (BPUCD)

## Version History
| Version | Date       | Author         | Changes                |
|---------|------------|----------------|------------------------|
| 1.0     | 2024-06-10 | AI Analyst     | Initial version        |

## 1. Introduction
### 1.1 Purpose
This document bridges technical analysis to business value for WebJET CMS, ensuring that modernization efforts preserve core functionality and enhance business outcomes.

### 1.2 Scope
Covers core content management processes, user workflows, and system modules relevant to the open-source community version of WebJET CMS.

### 1.3 Actors and Roles
| Actor         | Role                                        |
|---------------|---------------------------------------------|
| Content Editor| Creates, edits, and manages website content |
| Administrator | Manages users, site structure, and settings |
| Visitor       | Browses and interacts with website content  |
| Developer     | Extends/customizes CMS functionality        |

## 2. Process Models
### 2.1 High-Level BPMN Diagrams
Below is a high-level BPMN diagram representing the end-to-end process for content management in WebJET CMS:

![BPMN](docs/bpmn/webjetcms-content-management.png)

### 2.2 Detailed Use Cases

**Use Case ID: UC-001: Create Web Page**  
- **Preconditions**: User is authenticated as Content Editor or Administrator
- **Steps**:
  1. Navigate to "Create Page" in CMS dashboard
  2. Enter page title, content, and metadata
  3. Select parent node in site structure
  4. Save page
  5. Page appears in site tree and is accessible to visitors
- **Postconditions**: New page is published and visible in site structure

**Use Case ID: UC-002: Edit Web Page**  
- **Preconditions**: Page exists; user has edit permissions
- **Steps**:
  1. Select page from site tree
  2. Click "Edit"
  3. Modify content and metadata
  4. Save changes
- **Postconditions**: Page is updated and changes are reflected to visitors

**Use Case ID: UC-003: Upload File**  
- **Preconditions**: User is authenticated
- **Steps**:
  1. Navigate to "Files" section
  2. Drag and drop or select file to upload
  3. File is stored and indexed
- **Postconditions**: File is available for use in content or downloads

**Use Case ID: UC-004: Create Form/Survey**  
- **Preconditions**: User is authenticated as Editor/Admin
- **Steps**:
  1. Navigate to "Forms & Surveys"
  2. Select "Create New"
  3. Define fields and options
  4. Save and publish form
- **Postconditions**: Form is available for visitor input

**Use Case ID: UC-005: Analyze Web Traffic**  
- **Preconditions**: Site is live; data is being collected
- **Steps**:
  1. Access "Statistics" dashboard
  2. Select desired metrics (visits, page views, etc.)
  3. View or export reports
- **Postconditions**: Performance insights are available to administrators

## 3. Mapping to Code
### 3.1 Process-to-Module Traceability
| Process/Use Case          | Module/Component      | Trace ID |
|--------------------------|----------------------|----------|
| Create/Edit Web Page      | web/pages, web/tree  | UC-001/002|
| Upload File               | web/files            | UC-003   |
| Create Form/Survey        | web/forms, web/survey| UC-004   |
| Analyze Web Traffic       | web/statistics       | UC-005   |

### 3.2 Pain Points
- Batch jobs for statistics may delay real-time insights
- Large file uploads may impact performance
- Site structure changes require manual updates to navigation
- Customization requires developer intervention for advanced features

## 4. Modernization Impacts
### 4.1 Gaps
- Lack of real-time analytics dashboard
- Limited drag-and-drop support in some modules
- No built-in workflow for content approval
- API coverage for headless CMS use is incomplete

### 4.2 Prioritization (MoSCoW)
| Item                        | MoSCoW | Rationale                                |
|-----------------------------|--------|------------------------------------------|
| Real-time analytics         | Must   | Critical for business decision-making     |
| Content approval workflow   | Should | Enhances governance and quality control  |
| Improved drag-and-drop      | Could  | Improves editor productivity             |
| Full REST API coverage      | Must   | Enables integration and modernization    |
| Automated navigation update | Should | Reduces manual effort                    |

## 5. Appendices
### A. Process Narratives
**Content Creation and Publishing**: Editors log in, create content using a WYSIWYG editor, assign it to a site section, and publish. Administrators oversee structure and permissions. Visitors browse published content.

**File Management**: Users upload files for use in content or downloads. Files are indexed and managed via the CMS interface.

**Forms and Surveys**: Editors create forms for feedback, surveys, or data collection. Results are stored and analyzed by administrators.

**Statistics and Monitoring**: Administrators review site performance using built-in analytics tools. Reports inform site improvements and content strategy.

### B. RTM to SORD
| Requirement (RTM)          | SORD Reference         |
|----------------------------|------------------------|
| Page creation/editing      | SORD-01                |
| File management            | SORD-02                |
| Form/survey functionality  | SORD-03                |
| Analytics/statistics       | SORD-04                |

**Standards Alignment**: ISO/IEC/IEEE 29148:2011 (Requirements engineering), BPMN 2.0.2.

**Traceability**: See SORD, CIAR, and architecture docs for further mapping.

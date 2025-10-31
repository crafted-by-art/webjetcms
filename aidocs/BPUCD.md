# Business Process and Use Case Document (BPUCD)

## Version History
| Version | Date       | Author         | Changes                                    |
|---------|------------|----------------|--------------------------------------------|
| 1.0     | 2025-10-31 | AI Doc System  | Initial version for WebJET CMS             |

## 1. Introduction
### 1.1 Purpose
This document bridges technical analysis and business value for WebJET CMS, ensuring that modernization preserves and enhances core business functionality. It provides a comprehensive mapping of business processes, use cases, and their traceability to the codebase, supporting requirements engineering and future modernization efforts.

### 1.2 Scope
Covers core business processes and user-facing workflows of WebJET CMS, including content management, AI-assisted editing, AB testing, application embedding, statistics, multi-domain management, e-commerce, and administration.

### 1.3 Actors and Roles
| Actor            | Role                                        |
|------------------|---------------------------------------------|
| Content Editor   | Creates, edits, and manages web content     |
| Site Admin       | Configures site structure, users, security  |
| Developer        | Extends/customizes CMS, manages integrations|
| Business Owner   | Oversees site/business objectives           |
| E-commerce Mgr   | Manages products, orders, payments          |
| End User         | Consumes site content, interacts with apps  |
| IT Security      | Audits, ensures compliance                  |

## 2. Process Models
### 2.1 High-Level BPMN Diagrams

#### Content Management End-to-End
~~~mermaid
flowchart TD
    A[Login] --> B[Dashboard]
    B --> C[Create/Edit Content]
    C --> D{AI Assistance?}
    D -- Yes --> E[AI Grammar/Translation/Headline]
    D -- No --> F[Manual Edit]
    E --> G[Save/Publish]
    F --> G
    G --> H[Review/Approval]
    H --> I[Publish/Unpublish]
    I --> J[Statistics/Monitoring]
~~~

#### E-commerce Order Flow
~~~mermaid
flowchart TD
    A[User Browses Products] --> B[Add to Cart]
    B --> C[Checkout]
    C --> D[Select Payment Method]
    D --> E[Order Placed]
    E --> F[Order Management]
    F --> G[Statistics/Reporting]
~~~

### 2.2 Detailed Use Cases

#### Use Case ID: UC-001 - Create/Edit Web Content
- **Preconditions**: User is authenticated and authorized as Content Editor or Admin.
- **Steps**:
  1. Navigate to dashboard.
  2. Select 'Create New Page' or 'Edit Existing Page'.
  3. Enter or modify content using WYSIWYG editor.
  4. (Optional) Use AI Assistant for grammar correction, translation, headline, summary, or image generation.
  5. Save draft or submit for approval.
  6. (If required) Await review and approval.
  7. Publish content.
- **Postconditions**: Content is published and visible to end users; audit log updated.

#### Use Case ID: UC-002 - AB Testing of Web Pages
- **Preconditions**: AB Testing module enabled; page variants defined.
- **Steps**:
  1. Admin defines A and B versions of a page.
  2. Set rules for user segmentation (logged-in vs. anonymous).
  3. System randomly or rule-based serves A/B versions.
  4. Collect user interaction data.
  5. Analyze results in statistics module.
- **Postconditions**: AB test results available for decision-making; winning variant can be published.

#### Use Case ID: UC-003 - Embed Application (e.g., Survey, Gallery)
- **Preconditions**: User has rights to edit page and access app store.
- **Steps**:
  1. Open page editor.
  2. Select 'Embed Application'.
  3. Choose application type (survey, gallery, etc.).
  4. Configure application settings (visibility, device targeting, etc.).
  5. Save and publish page.
- **Postconditions**: Application is embedded and functional on published page.

#### Use Case ID: UC-004 - E-commerce Order Management
- **Preconditions**: E-commerce module enabled; products and payment methods configured.
- **Steps**:
  1. User browses and adds products to cart.
  2. Proceeds to checkout.
  3. Selects payment method (GoPay, PayPal, bank transfer, etc.).
  4. Completes order.
  5. Admin/E-commerce manager reviews and manages orders.
  6. System updates order status and inventory.
- **Postconditions**: Order processed, payment recorded, user notified.

#### Use Case ID: UC-005 - Multi-Domain/Language Content Management
- **Preconditions**: Multi-domain and language features enabled; domains configured.
- **Steps**:
  1. Admin defines domains and tags.
  2. Editor creates/edits content, assigns to domain/tag.
  3. System ensures correct separation and display per domain/language.
  4. (Optional) Use AI translation for content.
- **Postconditions**: Content is available per domain/language; tags and templates managed per site.

#### Use Case ID: UC-006 - Web Traffic Statistics and Analytics
- **Preconditions**: Statistics module enabled; tracking scripts active.
- **Steps**:
  1. System collects web traffic and error page data.
  2. Admin/Editor views statistics dashboard.
  3. Filter by date, domain, user type, etc.
  4. Export or analyze data for optimization.
- **Postconditions**: Insights available for business decisions; reports generated.

#### Use Case ID: UC-007 - User Authentication and Security
- **Preconditions**: User exists; authentication configured (password, 2FA).
- **Steps**:
  1. User accesses login page.
  2. Enters credentials.
  3. (Optional) Completes two-step verification.
  4. Gains access to authorized modules.
- **Postconditions**: Secure access granted; session started; audit log updated.

## 3. Mapping to Code
### 3.1 Process-to-Module Traceability
| Process/Use Case                        | Module/Path                                  | Trace ID                      |
|-----------------------------------------|----------------------------------------------|-------------------------------|
| Create/Edit Web Content                 | redactor/webpages/pagebuilder.md             | UC-001                        |
| AI-Assisted Editing                     | redactor/ai/README.md                        | UC-001                        |
| AB Testing                              | redactor/apps/abtesting/README.md            | UC-002                        |
| Application Embedding                   | custom-apps/appstore/README.md               | UC-003                        |
| E-commerce Order Management             | redactor/apps/eshop/product-list/README.md   | UC-004                        |
| Multi-Domain/Language Content           | frontend/templates/news/README.md            | UC-005                        |
| Web Traffic Statistics                  | redactor/apps/stat/README.md                 | UC-006                        |
| User Authentication/Security            | redactor/admin/logon.md                      | UC-007                        |
| Responsive UI/Small Screens             | redactor/webpages/pagebuilder.md             | UC-001                        |

### 3.2 Pain Points
- Manual tag/domain updates required for multi-domain support.
- Legacy code and obsolete frameworks (Struts) recently removed; migration still ongoing in some modules.
- Some application settings dialogs still being migrated from JSP to Spring/Thymeleaf.
- E-commerce and AI features depend on external services (DeepL, payment gateways).
- Responsive UI for small screens is improved but may require further optimization.

## 4. Modernization Impacts
### 4.1 Gaps
- Some legacy code and JSP-based dialogs remain; not all modules fully migrated to Spring/Thymeleaf.
- Multi-domain/tag separation requires manual intervention for some IDs.
- AI assistant features depend on third-party APIs (potential for service disruption).
- E-commerce payment gateway support is expanding but may not cover all global options yet.
- Some analytics/statistics features may lack real-time capabilities.

### 4.2 Prioritization (MoSCoW)
| Item                                   | MoSCoW   | Rationale                                        |
|----------------------------------------|----------|--------------------------------------------------|
| Full migration to Spring/Thymeleaf     | Must     | Security, maintainability, modernization          |
| Automated multi-domain/tag management  | Must     | Reduce manual errors, scalability                 |
| Expand AI assistant capabilities       | Should   | Competitive advantage, user productivity          |
| Broaden payment gateway support        | Should   | E-commerce market reach                           |
| Real-time analytics/statistics         | Could    | Business insight, optimization                    |
| Further optimize responsive UI         | Could    | Accessibility, mobile-first experience            |
| Remove all legacy code/JSP             | Must     | Security, technical debt reduction                |
| Improve documentation/training         | Should   | Adoption, onboarding                             |

## 5. Appendices
### A. Process Narratives

#### Content Management
WebJET CMS enables non-technical users to create, edit, and publish web content through a browser-based WYSIWYG editor. The process is enhanced by AI-powered tools for grammar correction, translation, headline generation, and image creation. Content can be saved as drafts, submitted for approval, and published with audit tracking. The system supports multi-domain and multi-language content, allowing organizations to manage complex web presences from a unified interface.

#### AB Testing
Administrators can define A/B variants of web pages and segment users (e.g., logged-in vs. anonymous) to optimize user experience. The system collects interaction data, which is analyzed to determine the most effective variant.

#### Application Embedding
Editors can embed a variety of applications (surveys, galleries, forms, etc.) into web pages via a unified app store interface. Application settings can be customized for visibility, device targeting, and user segmentation.

#### E-commerce
The e-commerce module supports product management, order processing, and integration with multiple payment gateways. Orders are tracked, managed, and analyzed through the admin interface, supporting business growth and customer engagement.

#### Statistics and Analytics
The statistics module provides insights into web traffic, error pages, and user behavior. Data can be filtered, exported, and used for optimization.

#### Security and Authentication
WebJET CMS enforces strong authentication (including two-step verification) and advanced security filters, supporting compliance with banking-grade standards.

### B. RTM to SORD
| Use Case/Process                       | SORD Requirement ID    | Notes                                  |
|----------------------------------------|------------------------|----------------------------------------|
| Create/Edit Web Content                | FR-001, FR-006, FR-011 | Content, file upload, responsive UI    |
| AI-Assisted Editing                    | FR-002                 | AI integration                         |
| AB Testing                             | FR-003                 | A/B testing                            |
| Application Embedding                  | FR-005, FR-012         | App store, visibility control          |
| E-commerce Order Management            | FR-009                 | E-commerce features                    |
| Multi-Domain/Language Content          | FR-008                 | Multi-domain, multi-language           |
| Web Traffic Statistics                 | FR-007                 | Analytics                              |
| User Authentication/Security           | FR-010, NFR-003, NFR-004 | Security, 2FA, vulnerability protection |

**Standards Alignment**: ISO/IEC/IEEE 29148:2011 (Requirements engineering), BPMN 2.0.2.

**Traceability**: See SORD, CIAR, and module documentation for full mapping.

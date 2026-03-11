# Data Model and Flow Documentation (DMFD)

Version 1.0 | 2025-07-14 | WebJET CMS

## 1. Introduction

### 1.1 Purpose

Maps all data assets of **WebJET CMS** for schema evolution, ETL planning, and data-integrity assurance during modernisation. All findings validated against Java source code in `src/main/java/sk/iway/` as primary ground truth.

### 1.2 Scope

| Layer | Artefacts |
|---|---|
| Primary Database | MariaDB `webjetcms_web` (poolman.xml) |
| ORM | JPA/EclipseLink + Spring Data, persistence-unit `webjet7` |
| Core Tables | documents, documents_history, groups, user_perm_groups, gallery, templates, stat_*, admin_log |
| Component Tables | forms, forum, calendar, blog, news, banner, basket, gdpr, inquiry, quiz, rating, cronjob, dmail |
| File Storage | Filesystem via elFinder (not a DB table) |
| REST APIs | Spring MVC under `/admin/rest/` |

### 1.3 Data Governance

| Concern | Detail |
|---|---|
| Data Owner | Interway s.r.o.; tenants own their content |
| PII | users/user_groups tables; gdpr component manages consent |
| Audit Trail | AuditEntityListener on all @Entity classes; password/password2/password_salt masked with ***** |
| Access Control | PermissionGroupBean (RBAC); password_protected per page/folder |
| Encryption | require_ssl per document; TLS at Tomcat |
| Passwords | Hashed+salted via PasswordSecurityAlgorithm enum |

---

## 2. Data Models

### 2.1 Entity-Relationship Diagrams

#### 2.1.1 Core Domain ERD

```
groups 1---N documents (DocDetails @Entity @Table("documents"))
  group_id PK     doc_id PK
  parent_group_id group_id FK->groups
  (self-ref tree) temp_id FK->templates
                  author_id FK->users
                  header/footer/menu/right_menu_doc_id FK->documents(self)
                        |1:N
                        v
                  documents_history (DocHistory extends DocBasic)
                    history_id PK, doc_id FK

templates 1---N documents (temp_id FK)

user_perm_groups 1---N perm_in_perm_groups
  group_id PK         id PK, group_id FK, permission VARCHAR

gallery 1---N gallery_dimensions
  gallery_id PK   dimension_id PK, gallery_id FK

stat_* tables -> VisitsDTO, BrowsersDTO, TopDTO, RefererDTO, ErrorDTO DTOs
```

#### 2.1.2 Component Module Tables

```
documents.doc_id referenced by:
  forms_data, forum_posts, blog_posts, news_items, calendar_events,
  inquiry_answers, quiz_results, rating_votes, banner_items, basket_orders

groups.group_id referenced by: gallery
```

### 2.2 Schema Listings

#### 2.2.1 Table: `documents`

JPA: `DocDetails extends DocBasic (@MappedSuperclass)` | Audit: TYPE_SAVEDOC

| Column | Java Field | Type | Notes |
|---|---|---|---|
| doc_id | id | BIGINT PK | AUTO_INCREMENT, generator S_documents |
| group_id | groupId | INT | FK->groups |
| title | title | VARCHAR(255) NOT NULL | @NotBlank, XSS-sanitised |
| navbar | navbar | VARCHAR(255) NOT NULL | Menu display name |
| virtual_path | virtualPath | VARCHAR(255) | URL segment |
| editor_virtual_path | editorVirtualPath | VARCHAR(255) | Admin URL override |
| generate_url_from_title | generateUrlFromTitle | BOOLEAN | Default true |
| url_inherit_group | urlInheritGroup | BOOLEAN | Default false |
| sort_priority | sortPriority | INT | Default 0 |
| external_link | externalLink | VARCHAR(255) | Redirect URL |
| available | available | BOOLEAN | Page enabled |
| searchable | searchable | BOOLEAN | In site search |
| cacheable | cacheable | BOOLEAN | HTTP cache |
| temp_id | tempId | INT | FK->templates |
| header_doc_id | headerDocId | INT | FK->documents(self) |
| footer_doc_id | footerDocId | INT | FK->documents(self) |
| menu_doc_id | menuDocId | INT | FK->documents(self) |
| right_menu_doc_id | rightMenuDocId | INT | FK->documents(self) |
| perex_group | perexGroups | VARCHAR | Comma-sep INT array |
| date_created | dateCreated | DATETIME | Creation timestamp |
| password_protected | passwordProtected | VARCHAR(255) | Comma-sep user-group IDs |
| disable_after_end | disableAfterEnd | BOOLEAN | Auto-disable after publish_end |
| publish_after_start | publishAfterStart | BOOLEAN | Auto-publish at publish_start |
| require_ssl | requireSsl | BOOLEAN | Force HTTPS |
| field_a to field_t | fieldA to fieldT | VARCHAR(255) | 20 generic custom fields |
| temp_field_a to d_docid | tempFieldA to DDocId | INT | 4 template object refs |
| show_in_menu | showInMenu | BOOLEAN | Anon visibility |
| show_in_navbar | showInNavbar | BOOLEAN | Anon navbar |
| show_in_sitemap | showInSitemap | BOOLEAN | Anon sitemap |
| logged_show_in_menu | loggedShowInMenu | BOOLEAN | Auth visibility |
| logged_show_in_navbar | loggedShowInNavbar | BOOLEAN | Auth navbar |
| logged_show_in_sitemap | loggedShowInSitemap | BOOLEAN | Auth sitemap |
| html_head | htmlHead | LONGTEXT | Per-page head HTML |
| publish_start | publishStartDate | DATETIME | Scheduled start |
| publish_end | publishEndDate | DATETIME | Scheduled end |
| event_date | eventDateDate | DATETIME | Calendar event date |
| html_data | htmlData | LONGTEXT | Perex/excerpt HTML |
| perex_place | perexPlace | VARCHAR(255) | Location metadata |
| perex_image | perexImage | VARCHAR(255) | Thumbnail path |
| data | data | LONGTEXT | WYSIWYG HTML body |
| data_asc | dataAsc | LONGTEXT | Plain-text for search |
| author_id | authorId | INT | FK->users |
| logon_page_doc_id | logonPageDocId | INT | Login redirect |
| sync_id | syncId | INT | Sync ID |
| sync_status | syncStatus | INT | Sync state |
| forum_count | forumCount | INT | Cached (non-updatable) |
| file_name | fileName | VARCHAR(255) | File path |
| views_total | viewsTotal | INT | Cached (non-updatable) |
| root_group_l1 to l3 | rootGroupL1 to 3 | INT | Root group levels |

#### 2.2.2 Table: `documents_history`

JPA: `DocHistory extends DocBasic` | Repo: DocHistoryRepository

| Column | Type | Notes |
|---|---|---|
| history_id | BIGINT PK | AUTO_INCREMENT |
| doc_id | BIGINT | FK->documents |
| save_date | DATETIME | Save timestamp |
| approved_by | INT | FK->users |
| disapproved_by | INT | FK->users |
| approve_date | DATETIME | Approval timestamp |
| (all DocBasic columns) | - | Full document snapshot |

#### 2.2.3 Table: `groups`

Java: `GroupDetails` (NOT JPA @Entity; raw JDBC via GroupsDB DAO)

| Column | Type | Notes |
|---|---|---|
| group_id | INT PK | |
| parent_group_id | INT | Self-ref FK (tree) |
| group_name | VARCHAR(255) NOT NULL | |
| navbar_name | VARCHAR(255) | Menu name |
| url_dir_name | VARCHAR(255) | URL segment |
| domain_name | VARCHAR(255) | Multi-domain (lowercase) |
| default_doc_id | INT | FK->documents |
| internal | BOOLEAN | Restrict public |
| sort_priority | INT | Display order |
| temp_id | INT | FK->templates |
| force_the_use_of_group_template | BOOLEAN | Override child template |
| lng | VARCHAR(10) | Language code |
| new_page_doc_id_template | INT | New page template |
| html_head | TEXT | Group head injection |
| field_a to field_d | VARCHAR(255) | 4 custom fields |
| menu_type | INT | 0=hidden,1=normal,2=onlydefault,3=nosub |
| show_in_navbar | INT | Anon navbar |
| show_in_sitemap | INT | Anon sitemap |
| logged_menu_type | INT | Auth menu type |
| logged_show_in_navbar | INT | Auth navbar |
| logged_show_in_sitemap | INT | Auth sitemap |
| password_protected | VARCHAR(255) | Comma-sep user-group IDs |
| full_path | VARCHAR(1024) | Materialised path |
| sync_id | INT | Sync ID |
| sync_status | INT | Sync state |
| logon_page_doc_id | INT | Login redirect |
| install_name | VARCHAR(255) | Module identifier |
| link_group_id | INT | Alias group ref |
| hidden_in_admin | BOOLEAN | Hide from admin tree |

#### 2.2.4 Table: `user_perm_groups`

JPA: `PermissionGroupBean` | Audit: TYPE_USER_PERM_GROUP_UPDATE

| Column | Java Field | Type | Notes |
|---|---|---|---|
| group_id | id | BIGINT PK | @TableGenerator WJGen_user_perm_groups |
| group_title | title | VARCHAR(255) NOT NULL | @NotBlank |
| writable_folders | writableFolders | TEXT | Comma-sep paths |
| editable_groups | editableGroups | TEXT | Comma-sep group IDs |
| editable_pages | editablePages | TEXT | Comma-sep page IDs |

#### 2.2.5 Table: `perm_in_perm_groups`

JPA: `PermissionInPermissionGroupBean` | @OneToMany from PermissionGroupBean (LAZY, CascadeType.ALL)

| Column | Type | Notes |
|---|---|---|
| id | BIGINT PK | |
| group_id | BIGINT | FK->user_perm_groups |
| permission | VARCHAR(255) | Permission key |

#### 2.2.6 Table: `gallery`

JPA: `GalleryEntity` | Audit: TYPE_GALLERY | Repo: GalleryRepository

| Column | Type | Notes |
|---|---|---|
| gallery_id | BIGINT PK | |
| gallery_name | VARCHAR(255) | Album name |
| group_id | INT | FK->groups |
| image_path | VARCHAR(512) | Filesystem path |
| description | TEXT | Album description |
| sort_priority | INT | Display order |
| date_created | DATETIME | Creation timestamp |

#### 2.2.7 Table: `gallery_dimensions`

JPA: `GalleryDimension` | Repo: GalleryDimensionRepository

| Column | Type | Notes |
|---|---|---|
| dimension_id | BIGINT PK | |
| gallery_id | BIGINT | FK->gallery |
| width | INT | Target width px |
| height | INT | Target height px |
| crop | BOOLEAN | Crop vs scale |
| watermark | BOOLEAN | Apply watermark |

#### 2.2.8 Table: `templates`

Java: `TemplateDetails` via TemplatesDB | JPA Bean: `TemplatesGroupBean`

| Column | Type | Notes |
|---|---|---|
| temp_id | INT PK | |
| temp_name | VARCHAR(255) | Display name |
| temp_filename | VARCHAR(512) | JSP file path |
| group_id | INT | FK->groups |
| css_file | VARCHAR(512) | Associated CSS |
| sort_priority | INT | Display order |

#### 2.2.9 Statistics Tables

DTOs in `sk.iway.iwcm.stat.jpa`:

| DTO | Table | Key Fields |
|---|---|---|
| VisitsDTO | stat_visits | date, visits, unique_visitors, page_views |
| BrowsersDTO | stat_browsers | browser_name, version, count |
| CountryDTO | stat_countries | country_code, country_name, count |
| RefererDTO | stat_referers | referer_url, count |
| SearchEnginesDTO | stat_search_engines | engine_name, keyword, count |
| TopDTO | stat_top_pages | doc_id, title, views |
| ErrorDTO | stat_errors | error_code, url, count |
| LogonUserDTO | stat_logon_users | user_id, login_count, last_login |
| DocNewDTO | stat_new_docs | doc_id, date_created, author_id |
| InOutDTO | stat_in_out | in_count, out_count, date |

#### 2.2.10 Admin Audit Log

Populated by AuditEntityListener:

| Column | Type | Notes |
|---|---|---|
| log_id | BIGINT PK | |
| log_type | INT | Adminlog.TYPE_* |
| log_action | VARCHAR(20) | CREATE/UPDATE/DELETE |
| log_data | LONGTEXT | Field-level diff |
| user_id | INT | FK->users |
| date_created | DATETIME | Audit timestamp |
| uri | VARCHAR(512) | Request URI |
| domain | VARCHAR(255) | Tenant domain |
| user_agent | VARCHAR(512) | Browser UA |

### 2.3 Data Lineage

```
SOURCE                    PROCESSING                 SINK
Admin Editor UI     -->   DocDetailsRepository  -->  documents, documents_history, admin_log
Public Browser      -->   ShowDoc.java          -->  stat_visits, stat_browsers, stat_countries
File Upload         -->   FileBrowser/elFinder  -->  Filesystem, gallery
User Registration   -->   UsersDB/Spring Sec    -->  users, user_groups, admin_log
Cron Jobs           -->   DocPublishService     -->  documents (available flag), stat_*
Site Search         -->   Findexer/Lucene       -->  findexer index, stat_search_engines
E-shop/Basket       -->   EshopService          -->  basket_orders, basket_items, payment GW
GDPR Widget         -->   GdprComponent         -->  gdpr_consents, admin_log
Content Sync        -->   MirroringComponent    -->  documents, groups (remote)
```

---

## 3. Data Flows

### 3.1 Context Diagram (Level 0)

```
[Web Visitors]   --> WebJET CMS Platform --> [Web Pages HTML]
[CMS Editors]    --> (Tomcat+Spring       --> [Admin UI JSON]
[System Admins]  -->  +MariaDB+FS)        --> [Audit Logs]
[Cron Scheduler] -->                      --> [Statistics]
[External APIs]  -->                      --> [Sitemaps/RSS]
```

### 3.2 Detailed Data Flows

#### 3.2.1 Page Request (DFD Level 1)

```
Browser HTTP GET
  -> Tomcat -> ShowDoc.java
     -> GroupsDB (cache -> MariaDB groups)
     -> DocDB (cache -> MariaDB documents)
     -> TemplatesDB (MariaDB templates)
     -> Access check (password_protected, require_ssl)
     -> Component rendering (gallery, news, forms...)
     -> Stat recording (INSERT stat_visits/browsers/countries)
     -> HTTP Response HTML
```

#### 3.2.2 Document Save (DFD Level 1)

```
Admin POST /admin/rest/webpages/editor
  -> DocDetailsRestController
     -> Bean validation (@NotBlank, @Size)
     -> AllowHtmlAttributeConverter (XSS)
     -> DocDetailsRepository.save()
        -> JPA INSERT/UPDATE documents
        -> AuditEntityListener -> INSERT admin_log
     -> DocPublishService (schedule available toggle)
     -> HistoryDB.saveHistory() -> INSERT documents_history
     -> Cache invalidation (DocDB, GroupsDB)
```

#### 3.2.3 File Upload (DFD Level 1)

```
Admin POST multipart/form-data
  -> ElFinderRestController
     -> IwcmFile path validation (writable_folders)
     -> Write to filesystem
     -> GalleryService.processImage() -> GalleryDimension resize
     -> Response JSON with file URL
```

#### 3.2.4 Statistics Collection (DFD Level 1)

```
ShowDoc.java (every request)
  -> StatService.recordVisit()
     -> Parse UA -> BrowsersDTO
     -> GeoIP -> CountryDTO
     -> Parse Referer -> RefererDTO
     -> INSERT stat_visits/browsers/countries/referers
  -> StatRestController (admin)
     -> SELECT aggregations -> JSON charts
```

### 3.3 Integration Points

| Integration | Direction | Protocol | Notes |
|---|---|---|---|
| MariaDB | Bidirectional | JDBC (max 60 conn) | All CMS data |
| Filesystem | Bidirectional | Java NIO | Images, docs, templates |
| elFinder | Inbound | HTTP REST/JSON | Admin file browser |
| DataTables.net | Bidirectional | HTTP REST/JSON | All admin CRUD |
| Lucene/Findexer | Bidirectional | Java API | Site search |
| SMTP (dmail) | Outbound | SMTP | Newsletters |
| Facebook API | Outbound | HTTPS/oEmbed | Comments, Like |
| Disqus | Outbound | HTTPS/JS | Comment threads |
| Smartsupp | Outbound | HTTPS/JS | Live chat |
| Weather API | Inbound | HTTPS/JSON | appweather |
| Payment Gateway | Outbound | HTTPS/REST | basket/e-shop |
| Spring Security | Internal | Java API | Session auth |
| EclipseLink JPA | Internal | Java API | ORM persistence |
| AspectJ AOP | Internal | Bytecode | Audit, security |

---

## 4. Quality Assessment

### 4.1 Data Anomalies and Risks

| # | Risk | Location | Severity | Recommendation |
|---|---|---|---|---|
| 1 | 20 generic field_a-field_t columns | DocBasic.java | Medium | Migrate to typed document_attributes table |
| 2 | Comma-separated arrays (perex_group, password_protected, etc.) | Multiple | Medium | Normalise to junction tables (1NF violation) |
| 3 | Self-ref FKs without DB constraints (header/footer/menu_doc_id) | documents | Low-Med | Add ON DELETE SET NULL |
| 4 | groups not a JPA @Entity (raw JDBC) | GroupDetails.java | Medium | Migrate to JPA for audit trail |
| 5 | views_total/forum_count updatable=false | DocBasic.java | Low | Maintain via triggers or service |
| 6 | data_asc denormalised plain-text copy | DocBasic.java | Low | Ensure sync on every save |
| 7 | Password hashing algorithm unknown | users package | High | Verify BCrypt/PBKDF2; no MD5/SHA1 |
| 8 | sync_id/sync_status inline in documents+groups | Both | Low | Add dedicated sync_log table |
| 9 | html_head LOB arbitrary HTML | Both | Low | Verify AllowHtmlAttributeConverter applied |
| 10 | stat_* tables no retention policy | stat_* | Medium | Implement time-based partitioning/purge |
| 11 | full_path materialised column | GroupDetails.java | Low | Recalculate on rename/move |
| 12 | @Transient backward-compat fields in DocDetails | DocDetails.java | Low | Document population paths; risk of data loss |

### 4.2 Compliance Assessment

| Regulation | Data | Controls | Gaps |
|---|---|---|---|
| GDPR Art.17 (Erasure) | users PII, stat tables | gdpr component, audit trail | Verify erasure covers stat table entries |
| GDPR Data Minimisation | stat_* IP-derived data | Country-level aggregation in DTOs | Confirm no raw IP stored |
| GDPR Audit | Admin PII actions | AuditEntityListener | Define admin_log retention (2yr+) |
| Password Security | users.password/salt | PasswordSecurity.java pluggable algo | Verify no MD5/SHA1; enforce BCrypt/PBKDF2 |
| Banking/High-Security | All CMS data | require_ssl, RBAC, security filters | Periodic pentest; review dependency suppressions |
| Cookie Consent | Browser cookies | appcookiebar component | Verify blocks non-essential until consent |

---

## 5. Appendices

### A. SQL DDL Scripts

#### A.1 documents Table

```sql
CREATE TABLE documents (
    doc_id BIGINT NOT NULL AUTO_INCREMENT,
    group_id INT NOT NULL DEFAULT 0,
    title VARCHAR(255) NOT NULL,
    navbar VARCHAR(255) NOT NULL,
    virtual_path VARCHAR(255) NOT NULL DEFAULT '',
    editor_virtual_path VARCHAR(255) NULL,
    generate_url_from_title BOOLEAN NOT NULL DEFAULT TRUE,
    url_inherit_group BOOLEAN NOT NULL DEFAULT FALSE,
    sort_priority INT NOT NULL DEFAULT 0,
    external_link VARCHAR(255) NOT NULL DEFAULT '',
    available BOOLEAN NOT NULL DEFAULT FALSE,
    searchable BOOLEAN NOT NULL DEFAULT FALSE,
    cacheable BOOLEAN NOT NULL DEFAULT FALSE,
    temp_id INT NOT NULL DEFAULT 0,
    header_doc_id INT NOT NULL DEFAULT -1,
    footer_doc_id INT NOT NULL DEFAULT -1,
    menu_doc_id INT NOT NULL DEFAULT -1,
    right_menu_doc_id INT NOT NULL DEFAULT -1,
    perex_group VARCHAR(1024) NULL,
    date_created DATETIME NULL,
    password_protected VARCHAR(255) NOT NULL DEFAULT '',
    disable_after_end BOOLEAN NOT NULL DEFAULT FALSE,
    publish_after_start BOOLEAN NOT NULL DEFAULT FALSE,
    require_ssl BOOLEAN NOT NULL DEFAULT FALSE,
    field_a VARCHAR(255) NOT NULL DEFAULT '',
    field_b VARCHAR(255) NOT NULL DEFAULT '',
    field_c VARCHAR(255) NOT NULL DEFAULT '',
    field_d VARCHAR(255) NOT NULL DEFAULT '',
    field_e VARCHAR(255) NOT NULL DEFAULT '',
    field_f VARCHAR(255) NOT NULL DEFAULT '',
    field_g VARCHAR(255) NOT NULL DEFAULT '',
    field_h VARCHAR(255) NOT NULL DEFAULT '',
    field_i VARCHAR(255) NOT NULL DEFAULT '',
    field_j VARCHAR(255) NOT NULL DEFAULT '',
    field_k VARCHAR(255) NOT NULL DEFAULT '',
    field_l VARCHAR(255) NOT NULL DEFAULT '',
    field_m VARCHAR(255) NOT NULL DEFAULT '',
    field_n VARCHAR(255) NOT NULL DEFAULT '',
    field_o VARCHAR(255) NOT NULL DEFAULT '',
    field_p VARCHAR(255) NOT NULL DEFAULT '',
    field_q VARCHAR(255) NOT NULL DEFAULT '',
    field_r VARCHAR(255) NOT NULL DEFAULT '',
    field_s VARCHAR(255) NOT NULL DEFAULT '',
    field_t VARCHAR(255) NOT NULL DEFAULT '',
    temp_field_a_docid INT NOT NULL DEFAULT -1,
    temp_field_b_docid INT NOT NULL DEFAULT -1,
    temp_field_c_docid INT NOT NULL DEFAULT -1,
    temp_field_d_docid INT NOT NULL DEFAULT -1,
    show_in_menu BOOLEAN NOT NULL DEFAULT FALSE,
    show_in_navbar BOOLEAN NULL,
    show_in_sitemap BOOLEAN NULL,
    logged_show_in_menu BOOLEAN NULL,
    logged_show_in_navbar BOOLEAN NULL,
    logged_show_in_sitemap VARCHAR(255) NULL,
    html_head LONGTEXT NOT NULL,
    publish_start DATETIME NULL,
    publish_end DATETIME NULL,
    event_date DATETIME NULL,
    html_data LONGTEXT NOT NULL,
    perex_place VARCHAR(255) NOT NULL DEFAULT '',
    perex_image VARCHAR(255) NOT NULL DEFAULT '',
    data LONGTEXT NULL,
    data_asc LONGTEXT NULL,
    author_id INT NOT NULL DEFAULT 0,
    logon_page_doc_id INT NOT NULL DEFAULT 0,
    sync_id INT NOT NULL DEFAULT 0,
    sync_status INT NOT NULL DEFAULT 0,
    forum_count INT NOT NULL DEFAULT 0,
    file_name VARCHAR(255) NULL,
    views_total INT NOT NULL DEFAULT 0,
    root_group_l1 INT NULL,
    root_group_l2 INT NULL,
    root_group_l3 INT NULL,
    PRIMARY KEY (doc_id),
    INDEX idx_doc_group (group_id),
    INDEX idx_doc_temp (temp_id),
    INDEX idx_doc_author (author_id),
    INDEX idx_doc_available (available),
    INDEX idx_doc_pub_start (publish_start),
    INDEX idx_doc_pub_end (publish_end)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### A.2 user_perm_groups Table

```sql
CREATE TABLE user_perm_groups (
    group_id BIGINT NOT NULL,
    group_title VARCHAR(255) NOT NULL,
    writable_folders TEXT NULL,
    editable_groups TEXT NULL,
    editable_pages TEXT NULL,
    PRIMARY KEY (group_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sequence (
    seq_name VARCHAR(50) NOT NULL,
    seq_count DECIMAL(38) NULL,
    PRIMARY KEY (seq_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO sequence (seq_name, seq_count) VALUES ('user_perm_groups', 1);
```

#### A.3 gallery Table

```sql
CREATE TABLE gallery (
    gallery_id BIGINT NOT NULL AUTO_INCREMENT,
    gallery_name VARCHAR(255) NOT NULL,
    group_id INT NOT NULL DEFAULT 0,
    image_path VARCHAR(512) NULL,
    description TEXT NULL,
    sort_priority INT NOT NULL DEFAULT 0,
    date_created DATETIME NULL,
    PRIMARY KEY (gallery_id),
    INDEX idx_gallery_group (group_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### A.4 Recommended Normalisation

```sql
-- Replace comma-separated perex_group
CREATE TABLE document_perex_groups (
    doc_id BIGINT NOT NULL,
    perex_group_id INT NOT NULL,
    PRIMARY KEY (doc_id, perex_group_id),
    FOREIGN KEY (doc_id) REFERENCES documents(doc_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Replace comma-separated password_protected
CREATE TABLE document_access_groups (
    doc_id BIGINT NOT NULL,
    user_group_id INT NOT NULL,
    PRIMARY KEY (doc_id, user_group_id),
    FOREIGN KEY (doc_id) REFERENCES documents(doc_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE group_access_groups (
    group_id INT NOT NULL,
    user_group_id INT NOT NULL,
    PRIMARY KEY (group_id, user_group_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### B. Technology Stack

| Layer | Technology | Notes |
|---|---|---|
| App Server | Apache Tomcat | /tomcat/ directory |
| Language | Java | Node.js for docs tooling only |
| Build | Gradle | build.gradle, settings.gradle |
| Framework | Spring MVC + Spring Web | REST under /admin/rest/ |
| ORM | JPA (EclipseLink) + Spring Data | persistence-unit webjet7 |
| Database | MariaDB | org.mariadb.jdbc.Driver; max 60 conn |
| Pool | Poolman (custom) | poolman.xml |
| AOP | AspectJ compile-time | src/main/aspectj/; aop-ajc.xml |
| Logging | Logback | logback.xml |
| Boilerplate | Lombok | lombok.config |
| Mapping | MapStruct | docs/en/developer/backend/mapstruct.md |
| Admin UI | DataTables.net + Editor | @DataTableColumn annotations |
| File Mgr | elFinder | sk.iway.iwcm.system.elfinder |
| Search | Findexer (Lucene) | sk.iway.iwcm.findexer |
| Security | Spring Security | sk.iway.iwcm.system.spring |
| i18n | Custom | sk.iway.iwcm.i18n; sk/cs/en docs |

### C. JPA Entity Naming Convention

Per `persistence-webjet.xml`: All JPA entities must end in `Bean` and must not end in `ActionBean`. Entities are loaded dynamically at startup by scanning this pattern. The persistence.xml is a placeholder only.

### D. Data Sensitivity Classification

| Category | Tables/Fields | Class | Handling |
|---|---|---|---|
| Credentials | users.password, users.password_salt | Confidential | Hashed+salted; masked in audit |
| User PII | users.email/first_name/last_name | Personal Data (GDPR) | Access-controlled; erasure rights |
| Sessions | HTTP session (Tomcat) | Sensitive | Invalidated on logout |
| Content HTML | documents.data/html_data | Internal/Public | XSS-sanitised |
| Audit logs | admin_log.* | Confidential | Admin-only; retain per policy |
| Statistics | stat_* | Aggregated/Anonymous | Verify no raw IP stored |
| GDPR consents | gdpr_* | Personal Data (GDPR) | Timestamped; version-tracked |
| Files | /images/, /files/ | Internal/Public | writable_folders permission |

---

*Generated by AI Data Architect from source-code analysis of [crafted-by-art/webjetcms](https://github.com/crafted-by-art/webjetcms) on 2025-07-14.*

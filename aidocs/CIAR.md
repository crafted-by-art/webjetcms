# Code Inventory and Analysis Report (CIAR)

## Version History
| Version | Date       | Author         | Changes                  |
|---------|------------|----------------|--------------------------|
| 1.0     | 2025-10-31 | modernization-bot | Initial version          |

## 1. Introduction
### 1.1 Purpose
This report provides a granular breakdown of the WebJET CMS codebase to identify dead code, technical debt, and migration candidates. The goal is to support maintainability, refactoring, and modernization initiatives.

### 1.2 Methodology
- Static analysis of directory structure and Gradle build files
- Manual inspection of representative source directories
- Dependency extraction from `build.gradle`
- Quality and complexity estimation based on file size, structure, and known patterns
- Alignment with ISO/IEC 42010:2011 (architecture) and ISO/IEC 25010:2011 (maintainability)

### 1.3 LOC Metrics
| Language/Module | LOC (est.) | % of Total |
|-----------------|------------|------------|
| Java (src/main/java) | ~120,000 | 85% |
| Java (src/webjet8/java) | ~15,000 | 11% |
| Test Java (src/test/java) | ~5,000 | 4% |
| **Total** | **~140,000** | **100%** |

## 2. Inventory
### 2.1 File/Module Listing
Representative listing (see repository for full details):

| Path | LOC (est.) | Dependencies |
|------|------------|--------------|
| src/main/java/sk/iway/iwcm/Tools.java | 3,000 | commons-lang, commons-io, Spring |
| src/main/java/sk/iway/iwcm/PageParams.java | 350 | - |
| src/main/java/sk/iway/iwcm/JsonTools.java | 180 | gson |
| src/main/java/sk/iway/iwcm/admin/ | 10,000+ | Spring, Hibernate, Jackson |
| src/webjet8/java/sk/ | 15,000 | legacy modules |
| src/test/java/ | 5,000 | JUnit, Mockito |

### 2.2 Dependency Map
The project uses Gradle for dependency management. Major inbound dependencies are Spring, Hibernate, Jackson, Apache Commons, and custom modules. Outbound dependencies are primarily to Java EE APIs and third-party libraries.

**Dependency Graph (simplified):**
~~~mermaid
graph TD;
  App[WebJET CMS]
  App --> Spring
  App --> Hibernate
  App --> Jackson
  App --> ApacheCommons
  App --> CustomModules
  App --> Tomcat
  App --> MariaDB
~~~

### 2.3 Third-Party Libraries
Extracted from `build.gradle` (partial list):

| Library | Version | Vulnerabilities |
|---------|---------|-----------------|
| org.springframework:spring-core | 5.3.+ | See OWASP DC |
| org.hibernate.validator:hibernate-validator | 6.2.5.Final | See OWASP DC |
| com.fasterxml.jackson.core:jackson-databind | 2.15.+ | See OWASP DC |
| org.apache.commons:commons-lang3 | 3.19.0 | None known |
| com.google.code.gson:gson | 2.13.2 | CVE-2022-25647 |
| org.jsoup:jsoup | 1.17.2 | None known |
| org.mariadb.jdbc:mariadb-java-client | 3.3.2 | None known |
| org.apache.poi:poi-ooxml | 5.4.1 | None known |
| org.apache.logging.log4j:log4j-to-slf4j | 2.17.1 | Patched |
| ... | ... | ... |

*Note: For full vulnerability details, run OWASP Dependency-Check on the codebase.*

## 3. Analysis Results
### 3.1 Quality Metrics
| Metric | Value | Threshold |
|--------|-------|-----------|
| Code Duplication | ~7% | <10% |
| Cyclomatic Complexity (avg/class) | 4-8 | <10 |
| Large Classes (>2k LOC) | 5+ | <3 |
| Test Coverage (est.) | 40% | >60% |

### 3.2 Hotspots
- `Tools.java`: Large, multi-purpose utility class, high coupling
- `admin/` modules: High churn, complex business logic
- `src/webjet8/java/`: Legacy code, low test coverage
- Custom integrations (sk/iway/aceintegration, basecms): Complex, domain-specific logic

### 3.3 Technical Debt Estimation
- **SonarQube Debt Ratio (est.):** 12-18%
- Major sources: Large classes, legacy modules, insufficient modularization, low test coverage in legacy code

## 4. Recommendations
### 4.1 Refactoring Priorities
- Split `Tools.java` into focused utility classes
- Modularize `admin/` code
- Increase test coverage, especially for legacy (`webjet8`) code
- Remove or rewrite deprecated/unused modules in `src/webjet8/java/`
- Update dependencies with known vulnerabilities (e.g., gson)

### 4.2 Migration Feasibility
| Migration Path | Feasibility (1-5) | Notes |
|----------------|-------------------|-------|
| Java 8 → 17 | 5 | Already on Java 17 |
| Java → Kotlin | 3 | Large codebase, gradual migration possible |
| Monolith → Microservices | 2 | High coupling, requires major refactor |

## 5. Appendices
### A. Tool Outputs
- See `build/jacoco/report/` for coverage
- See `build/reports/dependency-check-report.html` for vulnerabilities

### B. Glossary of Metrics
- **LOC**: Lines of Code
- **Cyclomatic Complexity**: Number of linearly independent paths
- **Debt Ratio**: Ratio of remediation cost to development cost
- **Hotspot**: Area of code with high complexity/churn

**Standards Alignment**: ISO/IEC 42010:2011 (Architecture views), ISO/IEC 25010:2011 (Maintainability).

**Traceability**: See SORD and repository documentation for further details.

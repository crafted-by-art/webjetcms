# WebJET CMS Modernization Documentation Index

**Project Title:** WebJET CMS

**Generation Metadata:**
- Date: 2025-10-31
- Documentation Workflow Version: 2024.06
- Branch: aidocs-20251031-1707

**Architecture Note:**
- The application is currently monolithic (Spring/Struts/JSP) and is **not microservices-based**. Modernization analysis includes microservices decomposition guidance.

---

## Documentation Index

Below are links to all generated documentation in the `aidocs/` directory. Each document supports a specific aspect of system analysis and modernization.

### System Overview and Requirements Document
- [SORD.md](./SORD.md)
  - **Purpose:** High-level system snapshot, business context, functional/non-functional requirements, modernization objectives, and traceability (ISO/IEC/IEEE 29148:2011).

### Code Inventory and Analysis Report
- [CIAR.md](./CIAR.md)
  - **Purpose:** Codebase inventory, dependency analysis, technical debt, migration candidates, and risk hotspots (ISO/IEC 42010:2011).

### Architecture Description Document
- [ADD.md](./ADD.md)
  - **Purpose:** As-Is architecture, module/layer/deployment/data views, design rationale, and cross-cutting concerns (ISO/IEC 42010:2011, UML 2.5.1).

### Data Model and Flow Documentation
- [DMFD.md](./DMFD.md)
  - **Purpose:** Data models, entity relationships, data flows, lineage, and compliance mapping for modernization and integrity (ISO/IEC 25010:2011).

### Business Process and Use Case Document
- [BPUCD.md](./BPUCD.md)
  - **Purpose:** Mapping of business processes, use cases, actors, and requirements traceability to code and modernization impacts (ISO/IEC/IEEE 29148:2011, BPMN 2.0.2).

### Risk and Gap Analysis Report
- [RGAR.md](./RGAR.md)
  - **Purpose:** Risk register, gap analysis, mitigation strategies, and monitoring plan for phased modernization (ISO/IEC 31000:2018).

### Microservices Decomposition Guide
- [MDG.md](./MDG.md)
  - **Purpose:** Guidance for decomposing the monolithic system into microservices, including candidate boundaries, migration steps, and risk considerations. *(Included because the application is not microservices-based.)*

---

**Note:**
- All documentation is aligned with international standards for requirements, architecture, and risk management.
- For further details, see individual documents and referenced diagrams, tables, and traceability matrices.

---

**Repository:** [crafted-by-art/webjetcms](https://github.com/crafted-by-art/webjetcms)
**Branch:** aidocs-20251031-1707

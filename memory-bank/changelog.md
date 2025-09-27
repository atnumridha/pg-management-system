# Changelog

## [0.2.0] - 2025-09-27
### Changed
- Global dashboard search is now async, searches all columns, returns only top 5 most relevant results (with prioritized ID/label/entity), supports material ripple effect on click, and places entity type label at the top of every result with consistent dark bold visibility.
- Dashboard KPI cards use individualized material styling, conditional links for nonzero counts, and chart legends no longer overflow; all UI/UX refactored for accessibility and modern professionalism.

## [0.1.1] - 2025-09-27
### Changed
- Fixed Angular FontAwesome icon/type error by downgrading @fortawesome/fontawesome-free to v6.4.2, aligning all @fortawesome/* package versions, deleting lockfile/node_modules, and reinstalling dependencies for a clean, error-free build.
- Documented best practice: All @fortawesome packages must use identical version for predictable Angular/TypeScript compatibility.

## [0.1.0] - 2025-09-27
### Added
- Initialized Memory Bank with core documentation files: projectBrief.md, productContext.md, activeContext.md, systemPatterns.md, techContext.md, progress.md, changelog.md
- Established baseline context for the Paying Guest Management System project

---

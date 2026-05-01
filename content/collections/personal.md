---
id: personal
slug: personal
name: Engineering
type: task-list
icon: code
color: "#a78bfa"
sortOrder: 2
metadata: {"sections":[{"name":"Active","icon":"circle","color":"var(--color-primary)"},{"name":"Backlog","icon":"archive","color":"#64748b"},{"name":"Waiting","icon":"clock","color":"var(--color-warning)"},{"name":"Done","icon":"circle-check","color":"var(--color-success)"}]}
createdAt: "2026-04-06T14:40:11.291Z"
---

## Active
- [ ] Implement offline-first sync engine priority:urgent due:2026-04-14 note:Core differentiator. Markdown files sync via CRDTs when back online
  - [ ] Research Yjs vs Automerge for CRDT layer
  - [ ] Build conflict resolution for markdown merges
  - [ ] Add sync status indicator to UI
  - [ ] Write integration tests for sync edge cases
- [ ] Add keyboard shortcuts for power users priority:high due:2026-04-16 note:Cmd+K command palette, vim-like navigation in lists
  - [ ] Implement command palette component
  - [ ] Add shortcuts for task operations
  - [ ] Add shortcuts for navigation between views
  - [ ] Write shortcut reference overlay
- [ ] Build mobile-responsive layout priority:high due:2026-04-18 note:Board view needs to collapse to single-column on mobile. Notes editor needs touch support
  - [ ] Audit all views for mobile breakpoints
  - [ ] Implement responsive board column stacking
  - [ ] Add swipe gestures for mobile navigation
- [ ] Performance audit and optimization priority:normal due:2026-04-20
  - [ ] Profile initial load time with Lighthouse
  - [ ] Lazy-load non-critical views
  - [ ] Optimize markdown parsing for large collections
  - [ ] Add virtual scrolling for task lists over 200 items

## Backlog
- [ ] Add recurring tasks support priority:normal note:Users want daily/weekly/monthly task recurrence. Need to design the metadata format
  - [ ] Design recurrence metadata schema
  - [ ] Build recurrence engine
  - [ ] Add UI for setting recurrence rules
- [ ] Implement task templates priority:low note:Pre-built checklists for common workflows like code review, sprint planning
- [ ] Add calendar view for tasks with due dates priority:low note:Week and month views showing tasks on their due dates
- [ ] Build plugin system for extensibility priority:low note:Allow third-party integrations via a plugin API. Post-launch feature
- [ ] Add natural language date parsing priority:normal note:Type tomorrow or next friday instead of picking from date picker

## Waiting
- [ ] Investigate WebAuthn for passwordless login priority:normal note:Depends on auth refactor. Blocked by OAuth cleanup
- [ ] Evaluate Turso for edge database priority:low note:Alternative to R2 for structured data. Waiting for their new pricing tier

## Done
- [x] Set up ESLint and Prettier config done:2026-03-10
- [x] Build UIX component library foundation done:2026-03-18
  - [x] Button, Input, Select components done:2026-03-14
  - [x] Card, Badge, Drawer components done:2026-03-16
  - [x] Draggable and Droparea components done:2026-03-18
- [x] Implement markdown item parser done:2026-03-22
- [x] Build type registry for collections done:2026-03-25
- [x] Add dark theme support done:2026-04-01
- [x] Fix subtask parent-child operations in collection manager done:2026-04-08

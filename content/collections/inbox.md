---
id: inbox
slug: inbox
name: Bootstrapp Launch
type: task-list
icon: rocket
color: null
sortOrder: 0
metadata: {"sections":[{"name":"Active","icon":"circle","color":"var(--color-primary)"},{"name":"In Review","icon":"eye","color":"#8b5cf6"},{"name":"Waiting","icon":"clock","color":"var(--color-warning)"},{"name":"Done","icon":"circle-check","color":"var(--color-success)"}]}
createdAt: "2026-04-06T14:40:11.255Z"
---

## Active
- [ ] Design onboarding flow for new users experience: create first collection, import existing tasks priority:high due:2026-04-15 note:First-run
  - [ ] Sketch onboarding wireframes
  - [ ] Implement welcome wizard component
  - [ ] Add sample seed data for new accounts
- [ ] Get beta feedback from 10 early testers out to indie hackers community, friends in tech priority:high due:2026-04-25 note:Reach
  - [ ] Create beta tester feedback form
  - [ ] Compile list of 20 potential testers
  - [ ] Send personalized invite emails
- [ ] Prepare Product Hunt launch assets gallery images, tagline, description, maker comment priority:normal due:2026-05-01 note:Thumbnail,
  - [x] Design PH thumbnail 240x240 done:2026-04-08
  - [x] Create gallery screenshots done:2026-04-08
  - [x] Write short and long descriptions done:2026-04-08
  - [ ] Draft first maker comment

## In Review
- [ ] Implement data export and import feature need to export their markdown files and import from Notion or Todoist priority:high note:Users
  - [x] Add notes editor with live markdown preview done:2026-04-05
  - [x] Task board drag-and-drop subtask nesting task onto another task to make it a subtask with visual indicators priority:normal note:Drop done:2026-04-08
- [x] Build collection manager with markdown parsing done:2026-03-22

## Waiting
- [ ] Set up Stripe billing integration until pricing is finalized. Free tier plus Pro at 8 dollars per month priority:normal due:2026-04-28 note:Blocked
- [x] Implement challenges and habit tracking system done:2026-04-06
  - [x] Pick final logo from shortlist done:2026-04-08
  - [x] Define brand color palette done:2026-04-08
  - [x] Choose primary and secondary typefaces done:2026-04-08
  - [x] Create brand guidelines document done:2026-04-08
  - [x] Build export to ZIP functionality done:2026-04-08
  - [x] Build Notion markdown import parser done:2026-04-08
  - [x] Add Todoist CSV import support done:2026-04-08

## Done
- [x] Set up Bootstrapp monorepo structure done:2026-03-15
- [ ] Finalize Bootstrapp branding and visual identity color palette, typography. Need to decide between 2 final logo concepts. priority:urgent due:2026-04-12 note:Logo,
- [x] Implement task list view component done:2026-03-28
- [x] Build kanban board view done:2026-04-02
- [ ] Set up production deployment pipeline priority:urgent due:2026-04-10
  - [ ] Configure Cloudflare Workers production environment
  - [ ] Set up custom domain and SSL
  - [ ] Configure R2 storage for file uploads
  - [ ] Add error monitoring with Sentry
- [x] Build landing page for launch section, features overview, pricing, waitlist signup form priority:high due:2026-04-18 note:Hero done:2026-04-08
  - [x] Write hero copy and tagline done:2026-04-08
  - [x] Design feature showcase section done:2026-04-08
  - [x] Implement pricing table done:2026-04-08
  - [x] Add waitlist email capture with Resend done:2026-04-08
  - [x] Set up analytics tracking done:2026-04-08
- [x] Record demo video for landing page min walkthrough showing task board, notes, and challenges priority:high due:2026-04-20 note:2-3 done:2026-04-08
  - [x] Write video script done:2026-04-08
  - [x] Record screen capture done:2026-04-08
  - [x] Edit and add voiceover done:2026-04-08
  - [x] Upload and embed on landing page done:2026-04-08
- [x] Write blog post: Why we built Bootstrapp story, philosophy behind local-first markdown-based productivity priority:normal due:2026-04-22 note:Origin done:2026-04-09

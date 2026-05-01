---
id: typescript-patterns
slug: typescript-patterns
title: TypeScript Patterns
tags: ["Learning","Work"]
pinned: 0
createdAt: "2026-04-06T14:08:33.065Z"
updatedAt: "2026-04-06T14:08:33.065Z"
---

# Useful TypeScript Patterns

## Discriminated Unions
```typescript
type Result<T> = { ok: true; value: T } | { ok: false; error: Error };
```

## Builder Pattern
```typescript
class QueryBuilder {
  private filters: Filter[] = [];
  where(f: Filter) { this.filters.push(f); return this; }
  build() { return { filters: this.filters }; }
}
```

## Branded Types
```typescript
type UserId = string & { __brand: 'UserId' };
const createUserId = (id: string): UserId => id as UserId;
```
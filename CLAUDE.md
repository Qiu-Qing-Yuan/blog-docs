# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VuePress 2.X personal blog/documentation site with a custom local theme (AnyForkTheme) that extends the default VuePress theme. Content is in Chinese (zh-CN). Deploys as static HTML to GitHub Pages and Gitee Pages via GitHub Actions.

## Commands

- `npm run dev` — Dev server on `0.0.0.0:9527`
- `npm run build` — Build static site to `dist/` (runs `generate-timeline.mjs` and `validate-taxonomy.mjs` before VuePress build)
- `npm run debug` — Build with debug output
- `npm run new` — Interactive CLI to create a new blog post (generates frontmatter and scaffolding in `docs/posts/`)
- `npm run new:paper` — Same as `new` but with paper-specific frontmatter (authors, venue, year, PDF, difficulty, rating)
- `npm run validate` — Check that all categories/tags referenced in articles have corresponding definition files in `docs/posts/_categories/` and `docs/posts/_tags/`

No test, lint, or format scripts are configured. Code style is enforced via `.prettierrc.json` (no semicolons, single quotes, 2-space indent, `printWidth: 300`, trailing comma: none, endOfLine: lf).

## Architecture

### Theme System (`docs/.vuepress/theme/`)
The custom theme in `theme/index.ts` extends VuePress's `defaultTheme` via `alias` and `layouts` overrides — the standard VuePress 2.x local theme inheritance pattern. Five layout overrides exist: `Layout` (main), `Category`, `Tag`, `Timeline`, `404`.

`Layout.vue` uses Vue named slots (`#page-top`, `#page-bottom`) to inject blog metadata and Waline comments into the parent default layout.

### Configuration (`docs/.vuepress/config/`)
VuePress config is modularized: `navbar.ts`, `sidebar.ts`, `plugins.ts`, `firendLink.ts`, `container.ts` are re-exported via `index.ts`. The main entry is `docs/.vuepress/config.ts`. All imports use ESM format (no CommonJS `require`).

### Composables (`docs/.vuepress/theme/composables/`)
Reusable Vue 3 Composition API logic:
- `useBanner` — Banner image management with CSS transition carousel (no jQuery/flux.js dependency)
- `useTyped` — typed.js hero text with MutationObserver for reliable DOM detection
- `useCircleMagic` — Canvas bubble animation with proper cleanup (no memory leaks)
- `useLoading` — Global loading state management
- `useCount` — Waline pageview counter
- `usePagination` — Generic pagination logic used by HomeBlog, Category, and Tag pages

### Components (`docs/.vuepress/theme/components/`)
- `BlogListPage.vue` — Generic component for Category and Tag list pages (eliminates code duplication)
- `BlogItem.vue` — Article card with left/right alternating layout
- `BlogItemInfo.vue` — Article metadata (author, date, category, tags, reading time, views)
- `BlogSider.vue` — Sidebar with author info, stats, categories, tags, and friend links
- `HomeBanner.vue` — Hero banner with CSS transition carousel and typed.js
- `HomeBlog.vue` — Article list with pagination and sidebar
- `Icon.vue` — Generic icon component based on @vicons/antd

### Utility Scripts (`scripts/`)
- `new-post.mjs` — Interactive post scaffolding (used by `npm run new` / `npm run new:paper`)
- `validate-taxonomy.mjs` — Validates that article categories/tags match defined taxonomy files
- `generate-timeline.mjs` — Generates `docs/.vuepress/public/_temp/timeline.json` from git history for the Timeline page (4 categories: site, post, taxonomy, settings)

### Custom Containers (`docs/.vuepress/config/container.ts`)
`cardList` and `cardImgList` markdown containers parse YAML inside fenced code blocks to render styled card grids.

### Content (`docs/posts/`)
Blog posts organized by topic (ai, design-pattern, devops, linux, mysql, node, nuxt, other). The `vuepress-plugin-blog2` classifies pages with `filePathRelative` starting with `posts/` as articles, enabling categories, tags, and timeline views. Taxonomy definitions live in `docs/posts/_categories/` and `docs/posts/_tags/` — articles must reference categories/tags that have corresponding definition files (enforced by `npm run validate`).

### Styling
Tailwind CSS 3.x with preflight disabled (to avoid conflicts with VuePress base styles). Dark mode uses `class` strategy. Custom CSS in `docs/.vuepress/styles/` for animations and containers. Tailwind utility classes used directly in SFC templates.

### Client Enhancement (`docs/.vuepress/client.ts`)
Hooks into VuePress router lifecycle to show/hide a loading overlay during page transitions.

### Type Definitions (`docs/.vuepress/theme/types/`)
- `theme.d.ts` — AnyForkThemeOptions interface with proper TypeScript types
- `env.d.ts` — Blog.Home namespace for frontmatter configuration

## Tech Stack

VuePress 2.0.0-rc.18, Vue 3 (Composition API, `<script setup>`), Vite bundler, Tailwind CSS 3.4.x, TypeScript. Comments via Waline (`vuepress-plugin-comment2`). Search via Algolia DocSearch. SEO via `vuepress-plugin-seo2` + `vuepress-plugin-sitemap2`.

## Build Optimization

Vite config includes manual chunk splitting for `@vicons`, `@anyfork` plugins, and `pagesRoutes`. Gzip compression and rollup visualizer are included. Output filenames are deterministic (no content hashes) for gh-pages compatibility.

## Deployment

CI/CD in `.github/workflows/deploy.yml`: triggers on push to `main`, builds with Node.js 16, deploys `dist/` to `gh-pages` branch, mirrors to Gitee, and triggers Gitee Pages deployment.

# davidclarance.github.io

Personal site and blog. Built by GitHub Pages with its stock Jekyll — there is
no build step, no CI workflow and no dependencies to install.

## Writing a post

Add a file to `_posts/` named `YYYY-MM-DD-some-title.md`:

```markdown
---
title: Some title
---

Body text in markdown.
```

Commit it. The filename sets the date and the URL (`/blog/some-title/`); the
layout, feed entry and sitemap entry are all inferred. Nothing else is needed.

Drafts go in `_drafts/` without a date in the filename. Jekyll ignores that
directory when it builds, so a draft is never published by accident.

## Layout

| Path              | What it is                                    |
|-------------------|-----------------------------------------------|
| `_config.yml`     | Site title, description, permalinks, plugins  |
| `index.md`        | Homepage                                      |
| `blog.html`       | Post list at `/blog/`                         |
| `_posts/`         | Published posts                               |
| `_drafts/`        | Unpublished drafts                            |
| `_layouts/`       | Three HTML templates                          |
| `assets/style.css`| The entire stylesheet                         |

The design is deliberately minimal: one column, system fonts, a single accent
colour, and no JavaScript anywhere on the site.

## Previewing locally

Optional — the live site rebuilds on push, and the CSS is one file.

```sh
gem install jekyll jekyll-feed jekyll-seo-tag jekyll-sitemap
jekyll serve
```

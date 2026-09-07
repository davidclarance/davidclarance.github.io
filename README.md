# davidclarance.github.io

Personal site and writing. Built by GitHub Pages with its stock Jekyll — there is
no build step, no CI workflow and no dependencies to install.

## Writing a post

Add a file to `_posts/` named `YYYY-MM-DD-some-title.md`:

```markdown
---
title: Some title
---

Body text in markdown.
```

Commit it. The filename sets the date and the URL (`/writing/some-title/`); the
layout, feed entry and sitemap entry are all inferred. Nothing else is needed.

Drafts go in `_drafts/` without a date in the filename. Jekyll ignores that
directory when it builds, so a draft is never published by accident.

## The home page portrait

`index.md` points at `assets/portrait.jpg`. To change the picture, replace
that file, keeping the name. It renders as a 160px square, cropped with
`object-fit: cover` so a non-square source fills the box without
distorting.

The photo floats left and the intro text wraps around it, stacking above
the text on narrow screens instead.

Which part of the photo survives the crop is set by `object-position` in
`assets/style.css`. It currently crops from the top of the frame, because
the photo is a tall 9:16 shot with the subject's face at the top — the
default centre crop landed on his hands. Swap in a differently-framed photo
and that value probably wants revisiting.

## Callouts

For a boxed aside — an announcement, a caveat, a note that a post is out of
date — write a block quote and tag it with `{: .note}` underneath:

```markdown
> I'll be in Japan in April. Email me recommendations.
{: .note}
```

That `{: ... }` is a kramdown inline attribute list: it attaches the class
to the element directly above, and `.note` is styled in `assets/style.css`.
Adding another kind of box is a new class in that file, nothing more.

## Layout

| Path              | What it is                                    |
|-------------------|-----------------------------------------------|
| `_config.yml`     | Site title, description, permalinks, plugins  |
| `index.md`        | Homepage                                      |
| `writing.html`    | Post list at `/writing/`                      |
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

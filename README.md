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

The photo is centred above the intro text. It is `display: block` with
`margin: 0 auto` — an inline image ignores `margin: auto` and silently
left-aligns, which is easy to mistake for a centring bug elsewhere.

Which part of the photo survives the crop is set by `object-position` in
`assets/style.css`. It currently crops from the top of the frame, because
the photo is a tall 9:16 shot with the subject's face at the top — the
default centre crop landed on his hands. Swap in a differently-framed photo
and that value probably wants revisiting.

## Photos in posts

### When a photo earns its place

The pattern that emerged across the first five posts, which is worth keeping:
a photo opens the posts that are *not* about nature. Poisson bootstrapping,
hash spaces and the M-KOPA piece each lead with a bird; the birding post
leads with a map, and the short GPT post has no image at all.

That is the right way round. A wagtail above two thousand words on md5
hashing tells the reader who wrote it and gives dry material somewhere to
breathe. On a birding post the same photo is redundant — there the images
should be doing content work.

So: one photo, at the top, on posts whose subject is technical or
professional. It is a device, not a rule. Two of the five posts skip it and
the site does not look inconsistent. A post held back because no photo has
been chosen is the failure mode to avoid.

### Preparing one

Photographs are JPEG, never PNG. The wagtail arrived as a 3.1MB PNG and
became a 172KB JPEG at the same visible quality — that one mistake cost more
than every other image on the site combined.

Resize the long edge to 1400px and save at quality 82. The text column is
608px, so 1400 still looks sharp on a 2x display and anything larger is
wasted bytes. Aim for under 250KB.

```python
from PIL import Image
im = Image.open("DSCN1234.jpg").convert("RGB")
im.thumbnail((1400, 1400), Image.LANCZOS)
im.save("assets/writing/<post-slug>/<name>.jpg",
        "JPEG", quality=82, optimize=True, progressive=True)
```

On macOS, `sips -Z 1400 -s format jpeg -s formatOptions 82 in.jpg --out out.jpg`
does the same thing with no install.

Screenshots, charts and diagrams stay PNG, but quantise them to a 256-colour
palette — it is invisible on flat graphics and roughly halves the file:

```python
Image.open(p).convert("RGB").quantize(colors=256).save(p, "PNG", optimize=True)
```

### Adding it to a post

Photos live in `assets/writing/<post-slug>/`. Use a `<figure>` so the caption
is attached to the image rather than floating as a stray paragraph, and name
the species and the place:

```html
<figure>
  <img src="/assets/writing/<post-slug>/<name>.jpg" alt="Describe the bird">
  <figcaption>Mountain Wagtail, Karura Forest</figcaption>
</figure>
```

Images after the first are deferred automatically by `_layouts/post.html`, so
a picture-heavy post costs the reader only its opening photo up front. Nothing
to remember when writing.

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

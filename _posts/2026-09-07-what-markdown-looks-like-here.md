---
title: What markdown looks like here
---

A reference for how the stylesheet renders things. Worth keeping around until
the design settles, then delete it.

## Headings and prose

Body text is a system serif at 18px on a 65-character measure, which is the
width most people read comfortably without losing their place between lines.
Links take [the accent colour](/) and keep their underline.

### A third-level heading

Emphasis comes in *italic* and **bold**. Inline `code` sits in a tinted box.

> Block quotes are set in italic against a rule, and stay quiet enough that
> they read as an aside rather than a shout.

## Lists

- Unordered items
- Nested lists work too
  - like this
- And they wrap cleanly at this measure

1. Ordered lists are numbered
2. In the usual way

## Code

```python
def greet(name: str) -> str:
    """Syntax highlighting is deliberately subdued."""
    return f"hello, {name}"
```

## Tables

| Element   | Font  | Size   |
|-----------|-------|--------|
| Body      | Serif | 18px   |
| Dates     | Mono  | 0.8rem |
| Headings  | Serif | 1.6rem |

## Footnotes

Kramdown handles footnotes,[^1] which render at the foot of the post behind a
rule.

---

That horizontal rule is the one other place the accent colour appears.

[^1]: Like this one.

# Headerly Design Guide

This document describes Headerly’s current visual and interaction language. Use it as the baseline when adding or revising pages and components so that new work feels like part of the same product.

## Product character

Headerly is a developer-facing tool that presents technical information in a warm, approachable way. Its visual idea is **technical warmth**:

- Technical accuracy, raw values, and monospaced data remain visible.
- Coral and orange accents add energy and direction to an otherwise calm interface.
- Dense information is made readable through cards, generous spacing, and clear hierarchy.
- The interface should teach without overwhelming users with jargon or decoration.

The overall feel is clean, rounded, high-contrast, lightly elevated, and tool-oriented.

## Color system

Use semantic tokens rather than hard-coded colors (`bg-background`, `text-foreground`, `border-border`, `text-primary`, and so on). The current palette is:

| Token | Light theme | Dark theme | Usage |
| --- | --- | --- | --- |
| `background` | `#FDFCFB` | `#0D0C10` | Page background |
| `foreground` | `#645D75` | `#F8F7F9` | Primary text |
| `card` | `#FFFFFF` | `#16151A` | Cards and panels |
| `primary` | `#FF6B6B` | `#FF6B6B` | Primary action, links, selected state |
| `accent` | `#FF8E53` | `#FF8E53` | Secondary emphasis and focus ring |
| `muted` | `#F0EFF4` | `#24222C` | Secondary surfaces and inputs |
| `muted-foreground` | `#717075` | `#A1A0A6` | Supporting text |
| `border` | `#E5E4E9` | `rgba(255,255,255,.05)` | Dividers and card boundaries |
| `destructive` | `#EF4444` | `#EF4444` | Errors and dangerous states |

Color meaning:

- Coral (`primary`) marks primary actions, links, selected cards, and important technical data.
- Orange (`accent`) marks focus and secondary emphasis.
- Green indicates a successful result, such as a passing security check or green hosting.
- Orange/yellow indicates a warning or partial result.
- Red indicates an error, missing security control, or destructive state.

Prefer opacity variants of existing tokens (`bg-primary/5`, `border-primary/20`) over introducing new colors.

## Typography

The project defines `Plus Jakarta Sans` and `JetBrains Mono`. Use them by role:

- Page titles: bold, large, and concise; generally `text-4xl` to `text-7xl`.
- Section headings: `text-3xl` to `text-4xl`, clear and descriptive.
- Card headings: `font-semibold` or `font-bold`.
- Supporting copy: `text-muted-foreground` with comfortable line height (`leading-relaxed`).
- Header names and values: emphasized header names; values in `font-mono` with `break-all`.
- Technical constants, URLs, RFC references, and JSON should always use a monospaced treatment.

Use sentence case for headings. Reserve all caps for small labels with `uppercase tracking-wider`. Balance long headings with `text-balance` or a controlled maximum width.

## Layout, spacing, and shape

- Most content uses `container mx-auto px-4`; data tools use a maximum width around `max-w-6xl`.
- Hero areas use generous vertical space (`py-24`, up to `md:py-48` on large screens).
- Sections use generous separation (`py-24` to `py-32`).
- Card padding is usually `p-6` or `p-8`.
- Gaps are incremental: `gap-3`, `gap-4`, and `gap-6`.
- The base radius is `--radius: .75rem`; larger surfaces use `rounded-2xl` or `rounded-3xl`.
- Shadows should be subtle: `shadow-sm`/`shadow-lg` in light mode and very low-contrast or no shadows in dark mode.

## Navigation

The top navigation is sticky (`sticky top-0 z-50`), approximately 56 px tall, and uses a translucent blurred surface. The brand sits on the left, tool links occupy the main area, and language/theme controls sit on the right.

The current tool order is Headers, Network, User-Agent, Green Web, and Security Headers. The removed fingerprint feature must not be reintroduced into navigation.

Desktop navigation shows links directly; small screens use a menu button. Menu items should have a touch target of roughly 44 px and preserve the user’s page context when opened.

## Data-tool screens

The Headers screen is the product’s core:

- Group the data card, search field, and view switcher into one surface.
- “Pretty” is the readable card list; “Raw JSON” is for copying and debugging.
- Header rows are clickable. A selected row uses `border-primary`, `bg-primary/10`, and a visible focus ring.
- The detail panel sits on the right on desktop and below the list on narrow screens.
- The panel contains the header name, raw value, description, an RFC reference when available, and an MDN link when available.
- The close action is always visible and keyboard accessible.
- Long values must not cause horizontal page overflow; use `break-all` or controlled scrolling.

Analysis screens (Security Headers and Green Web) share the same form language: rounded inputs, a clear primary action, loading skeletons, result cards, and a short “how it works” explanation.

## Interaction and states

Design every interactive element in these states:

- Default: quiet surface with a low-contrast border.
- Hover: a small increase in surface or text contrast; never cause layout jumps.
- Focus: a visible ring or outline; do not rely on color alone.
- Selected: primary border and a lightly tinted primary surface.
- Disabled: reduced opacity, disabled cursor, and a genuinely unavailable action.
- Loading: a skeleton or spinner that preserves the final layout dimensions.
- Empty/error: explain what happened and the next useful action briefly.

Animations should be short and functional (`transition-all`, fade/slide-in). Avoid continuous decorative motion on information-dense screens.

## Responsive design and accessibility

- Work mobile-first and use the existing Tailwind `sm`, `md`, and `lg` breakpoints.
- On small screens, panels should stack; horizontal scrolling is reserved for genuinely wide content such as raw data.
- Every icon-only control needs a meaningful `aria-label`; decorative icons should use `aria-hidden`.
- Non-native clickable surfaces need `role="button"`, `tabIndex`, Enter/Space behavior, and selected-state semantics. Prefer a native `<button>` where possible.
- Target WCAG AA contrast for text and surfaces.
- Do not communicate state through color alone; pair color with text, an icon, or a label.

## Localization and content

No user-visible text should be hard-coded in a component. Store copy in `messages/` and keep the same key structure across all locales.

Translate technical terms according to how developers naturally use them in the target language. Standard names such as HTTP, request header, response header, User-Agent, RFC, and MDN may remain in their original form when appropriate; surrounding explanations should read naturally.

Headings should be short. Descriptions should communicate one idea, use plain language, and avoid unverifiable marketing claims. Prefer explaining a method’s limits over words such as “instant,” “completely secure,” or “exact.”

## New-component checklist

- Does it use existing semantic color tokens?
- Is it readable in both themes?
- Are desktop and mobile layouts defined?
- Are hover, focus, loading, empty, error, and disabled states covered?
- Can it be used with a keyboard and screen reader?
- Is all visible copy localized?
- Are technical values monospaced and overflow-safe?
- Can an existing component provide the same behavior?
- Does the result preserve Headerly’s technical-but-warm character?

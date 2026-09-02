# Design - Hitendra Singh Shaktawat Portfolio

A locked design system for this portfolio. Future page work should extend this
system instead of introducing a separate visual language.

## Genre

Modern-minimal technical interface with a terminal-native voice.

## Macrostructure Family

- Marketing pages: single centered terminal with an identity-first transcript.
- App pages: one scrollable output region with a persistent prompt.
- Content pages: Long Document using shell prompts as section labels.

## Theme

- Near-black graphite background and slightly lifted console surface.
- A broad, blurred blue-violet-green field sits behind the centered terminal.
- Cold white primary text and cool grey secondary text.
- Signal green is the primary status accent.
- Amber marks metadata; blue marks paths and links.
- Accent colours remain below 10 percent of each viewport.

## Typography

- Display: JetBrains Mono, weight 600, roman.
- Body: JetBrains Mono, weight 400.
- Labels: JetBrains Mono, weight 400.
- Letter spacing: 0.

## Spacing

Use the 4-point spacing tokens defined in `tokens.css`.

## Motion

- Command output enters with a short opacity reveal.
- No ambient gradients, floating decoration, or scroll choreography.
- Reduced motion removes every loop and transform.

## CTA Voice

- Primary actions are shell commands.
- The macOS-style header controls clear output, restore the profile, and toggle fullscreen.
- External destinations are inline links with an external-link icon.
- Controls use square corners and one-pixel rules.

## Per-Page Allowances

- The portfolio home is typography-only.
- Content pages should remain typography-only.

## What Pages Must Share

- HSS wordmark and shell identity.
- Terminal palette and JetBrains Mono.
- Command prompt and square control language.
- Hairline dividers and dense information rhythm.

## What Pages May Differ On

- Available commands and transcript content.
- The amount of supporting metadata in each output.

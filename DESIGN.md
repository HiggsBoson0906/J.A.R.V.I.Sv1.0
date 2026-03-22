# Design System Strategy: The Focused Academic

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Sanctuary."** 

Unlike typical student portals that feel cluttered and overwhelming, this system treats the dashboard as a high-end editorial workspace. Inspired by the utility of Linear and the aesthetics of Apple, we move beyond "standard UI" by embracing **Intentional Asymmetry** and **Tonal Depth**. The goal is to create a "flow state" environment where the interface recedes, and the student's work takes center stage. We achieve this through expansive white space, nested surface layering, and a total rejection of traditional structural lines.

---

## 2. Colors & Surface Philosophy
Our palette is rooted in deep indigos and crisp neutrals, designed to feel authoritative yet calm.
Color Mode: LIGHT
Custom Color: #4F46E5

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders for sectioning. 
Boundaries must be defined solely through background color shifts. Use `surface-container-low` (#f2f4f6) for a sidebar sitting against a `surface` (#f7f9fb) background. If a container needs to feel "raised," use a transition in tone rather than a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of fine paper in light mode, or frosted glass in dark mode.
- **Base:** `surface` (#f7f9fb)
- **Secondary Areas:** `surface-container-low` (#f2f4f6)
- **Interactive Cards:** `surface-container-lowest` (#ffffff)
- **Elevated Modals:** `surface-bright` (#f7f9fb)

### The "Glass & Gradient" Rule
To inject "soul" into the productivity experience:
- **CTAs:** Use a linear gradient from `primary` (#3525cd) to `primary-container` (#4f46e5).
- **Floating Elements:** In Dark Mode (#0B0F19), use semi-transparent surface colors with a `20px` backdrop-blur to create an integrated, high-end feel.

---

## 3. Typography: Editorial Authority
We utilize a dual-font system to separate "Content" from "Interface."

- **Display & Headlines (Manrope):** Used for page titles and section headers. Manrope’s geometric nature provides a premium, modern "Apple-esque" feel.
- **UI & Body (Inter):** Used for all functional data, labels, and long-form reading. Inter’s legibility at small sizes ensures high productivity.

**Hierarchy Guidance:**
- **Display-LG (3.5rem):** Reserved for "Welcome" states or deep-focus headers.
- **Headline-SM (1.5rem):** Standard section header; always paired with high-contrast `on-surface` (#191c1e).
- **Label-MD (0.75rem):** Used for metadata (e.g., "Due Date") with `on-surface-variant` (#464555) to reduce visual noise.

---

## 4. Elevation & Depth
Depth is a functional tool, not a decoration. We use **Tonal Layering** to guide the eye.

### The Layering Principle
Instead of shadows, place a `surface-container-lowest` card on a `surface-container-low` section. This creates a "soft lift" that feels architectural.

### Ambient Shadows
When a card must float (e.g., a dragging task):
- **Blur:** `32px` to `64px`.
- **Opacity:** 4%–6%.
- **Tint:** Use a soft Indigo tint (`primary`) rather than pure black to keep the shadows from feeling "dirty."

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., in Dark Mode):
- **Token:** `outline-variant` (#c7c4d8).
- **Opacity:** Max 15%. It should be felt, not seen.

---

## 5. Signature Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary-container`), `full` roundedness, white text. No shadow—let the color drive the action.
- **Secondary:** `surface-container-high` (#e6e8ea) with `on-surface` text. Feels integrated into the page.
- **Tertiary:** Pure text with `primary` color; reserved for low-emphasis actions like "Cancel."

### Productivity Cards
- **Construction:** `2xl` (2rem) corner radius. 
- **Spreading:** Use `spacing-6` (2rem) internal padding to give content room to breathe.
- **Content Separation:** Forbid divider lines. Use `spacing-4` (1.4rem) of vertical white space to separate list items within a card.

### Input Fields
- **Style:** "Subtle Inset." Use `surface-container-highest` (#e0e3e5) with a `ghost-border` on focus.
- **Radius:** `md` (1.5rem) to differentiate from the `2xl` layout cards.

### Progress Indicators
- **Style:** Thick `0.5rem` bars with `full` rounding. Use `primary` for the progress fill and `primary-fixed` (#e2dfff) for the track to maintain a monochromatic, premium look.

---

## 6. Do’s and Don’ts

### Do
- **Embrace White Space:** If a section feels "tight," use `spacing-10` (3.5rem) or `spacing-12` (4rem).
- **Use Intentional Asymmetry:** Align the main content to a 12-column grid, but allow sidebars or "quick notes" widgets to float with unique widths.
- **Layer for Importance:** The more important the info, the "brighter" or "higher" the surface tier.

### Don't
- **Don't use 1px lines:** Ever. Separate "Today's Tasks" from "Upcoming" using a subtle background shift.
- **Don't use pure Black shadows:** They kill the premium "Digital Sanctuary" vibe.
- **Don't use standard `lg` rounding:** Always push to `xl` (3rem) or `2xl` (2rem) for that soft, modern hardware feel.
- **Don't crowd the screen:** If a student has 20 tasks, show the top 5 with an editorial "View All" transition. Avoid the "spreadsheet look."

---
## Theme Variables Reference

| Color Role | Hex Value |
| --- | --- |
| background | #f7f9fb |
| primary | #3525cd |
| primary_container | #4f46e5 |
| secondary | #505f76 |
| surface | #f7f9fb |
| surface_container_lowest | #ffffff |
| surface_container_low | #f2f4f6 |
| surface_container_high | #e6e8ea |
| surface_container_highest | #e0e3e5 |
| on_surface | #191c1e |
| on_surface_variant | #464555 |
| outline_variant | #c7c4d8 |
| error | #ba1a1a |
| error_container | #ffdad6 |

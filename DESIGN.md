---
name: OPDRIFT
description: A painted Danish trivia expedition from Earth to the galaxies.
colors:
  amber: "#ffcb69"
  button-light: "#ffd888"
  button-gold: "#f9bb53"
  button-ink: "#483019"
  cream: "#fff6de"
  ink: "#263b45"
  muted: "#aec7cb"
  panel: "#193643f5"
  field: "#fff5dc"
  secondary: "#31505a"
  secondary-hover: "#466873"
  focus: "#fff7ca"
  tier-none: "#9c9dab"
  tier-beginner: "#a5bbc7"
  tier-practiced: "#9dc6b4"
  tier-mid: "#badbb1"
  tier-rare: "#dce9a3"
  tier-ultra-rare: "#f5c49c"
  tier-legendary: "#f5a3af"
typography:
  display:
    fontFamily: "Lilita, sans-serif"
    fontSize: "clamp(72px, 8.5vw, 112px)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "2px"
  headline:
    fontFamily: "Lilita, sans-serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "0.2px"
  title:
    fontFamily: "Lilita, sans-serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.12
  body:
    fontFamily: "Nunito, Arial, sans-serif"
    fontSize: "14px"
    lineHeight: 1.6
  label:
    fontFamily: "Nunito, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 900
  button:
    fontFamily: "Nunito, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 900
rounded:
  compact: "8px"
  control: "10px"
  button: "12px"
  mobile-panel: "16px"
  panel: "18px"
  round: "50%"
spacing:
  compact: "5px"
  small: "8px"
  control: "12px"
  medium: "15px"
  large: "20px"
  panel: "24px"
components:
  button-primary:
    textColor: "{colors.button-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "15px 22px"
    width: "100%"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    rounded: "{rounded.control}"
    padding: "12px 17px"
  button-secondary-hover:
    backgroundColor: "{colors.secondary-hover}"
  answer-field:
    backgroundColor: "{colors.field}"
    rounded: "{rounded.button}"
    padding: "5px"
  question-panel:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.panel}"
    padding: "24px 28px 19px"
  question-panel-mobile:
    rounded: "{rounded.mobile-panel}"
    padding: "21px 19px 12px"
  icon-button:
    textColor: "{colors.cream}"
    rounded: "{rounded.control}"
  selected-mode:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.compact}"
  progress-pip:
    rounded: "{rounded.round}"
    size: "12px"
  flight-level-ladder:
    rounded: "15px"
    padding: "20px 17px 17px"
    width: "185px"
  flight-level-ladder-mobile:
    rounded: "{rounded.button}"
    padding: "13px 9px 12px"
    width: "112px"
---

# Design System: OPDRIFT

## Overview

**Creative North Star: "The Painted Updraft"**

OPDRIFT is a continuous painted expedition with compact, tactile game controls. Mountain scenery and foreground clouds give way to floating islands, asteroid belts, ice crystals, planetary rifts and galaxies; the balloon and pilot remain the traveler through that world. The illustration supplies atmosphere, while warm cream text and amber controls keep decisions readable.

This is a standalone Danish game identity. The confirmed direction rejects generic marketing-page framing and horizontal tier lines as a substitute for a universe. A control dock temporarily overlays the world; during actual flight the question and menus disappear while a six-tier ladder tracks the answer’s earned ascent, then the arrival card appears after deceleration.

**Key Characteristics:**
- A full-viewport illustrated world with a separate balloon and foreground cloud planes.
- Rounded display lettering, compact readable supporting text, and tactile amber actions.
- Dark teal control surfaces that preserve the painted scene around them.
- Long upward travel crosses overlapping painted regions, with a readable side ladder showing earned answer tiers and a reduced-motion alternative.

## Colors

Warm cream and amber controls sit against a dark teal interface and a richly painted sky; scene colors belong to the raster art rather than an invented interface palette.

### Primary
- **Updraft Amber:** Score emphasis and the shared warm action family. Main actions use the button-light to button-gold gradient; dark button ink keeps the label readable.

### Secondary
- **Flight Teal:** Question surfaces, secondary controls and modal surfaces support the scene without competing with it.
- **Rarity Pastels:** The seven tier colors belong to outcome labels, help entries and result columns; the six positive tiers also color the flight ladder’s earned medals and active label. They encode fixed editorial categories, not measured player frequency.

### Neutral
- **Warm Cream:** Main text and the selected game mode.
- **Answer Cream:** Light answer-entry surface.
- **Deep Ink:** Text on light controls.
- **Sky Mist:** Supporting interface color.
- **Focus Cream:** High-visibility keyboard outline.

**The Amber Action Rule.** Use the warm amber family for the primary action and earned-score emphasis; retain dark teal as the supporting control surface.

## Typography

**Display Font:** Lilita One, self-hosted under the CSS family alias `Lilita`, with sans-serif fallback.
**Body Font:** Nunito Sans, self-hosted under the CSS alias `Nunito`, with Arial and sans-serif fallbacks. There is no distinct monospace role.

**Character:** Broad, soft display letters make headings feel like an illustrated game. Heavy rounded supporting type keeps commands and telemetry concise; explanatory paragraphs retain a quieter regular weight.

### Hierarchy
- **Display:** Home title; the frontmatter captures desktop sizing. Mobile uses a fluid size (clamp(68px, 16vw, 96px)), a tighter letter spacing (1px), and a thinner outline.
- **Headline:** Question prompt; mobile reduces it (25px, line-height 1.13).
- **Title:** Dialog headings. Arrival tier labels grow larger (44px desktop, 34px mobile); result titles use 39px desktop and 32px mobile.
- **Body:** Dialog explanation text; question rules use 12px and line-height 1.5, with a mobile line-height of 1.45. Entry text uses 19px desktop and 18px mobile.
- **Label:** Supporting telemetry, progress labels, field labels and chart annotations use the final 11px floor. Uppercase is reserved for existing functional labels.
- **Score:** Lilita numerals emphasize height (62px desktop, 52px mobile); height telemetry uses tabular numerals.

**The Readable Telemetry Rule.** Functional supporting text stays at or above the implemented 11px floor, including mobile chart labels and question progress.

## Layout

The world is fixed to the viewport; there is no scrolling page composition. The expedition spans 48 viewport heights of camera travel, with one additional viewport of world coverage. Eight overlapping panels draw from five tall scene rasters: the existing universe plus islands, orbit, ice and rift. Each panel adds an overlap of 65% of viewport height; its width is the larger of viewport width and panel height divided by three. Only nearby assets are requested and only visible panels are active. The balloon remains a separate layer. Header controls sit at the top; home actions sit near the lower center.

During flight, the six-tier ladder sits on the left at the vertical midpoint, using the desktop component token. At 700px and below it narrows to 112px, sits 10px from the left at 40% viewport height, and the balloon shifts right to 63% viewport width. Ladder labels remain at least 11px. Short flight viewports (maximum height 600px, minimum width 701px) tighten the ladder to 160px, hide secondary point labels and move the arrival panel right.

The question dock is centered near the bottom with a bounded width (620px maximum, viewport minus 40px), desktop padding from the component token, and a bottom gap (30px). At the mobile breakpoint (700px), it uses viewport minus 24px, a lower gap (14px), and the compact panel token. The home mode switch moves to a centered bottom position (35px) and disappears during play and results. Icon controls have a minimum target (44px by 44px); skip controls retain a minimum height (44px).

Short desktop viewports (maximum height 680px, minimum width 701px) move the question dock right and the balloon left. Final results use a scrollable bounded panel, not body scrolling, with a 640px maximum width. Twenty result columns use a ten-column grid, producing two rows. Supporting gaps recur at 5px, 8px, 12px, 15px and 20px rather than a fabricated uniform scale.

## Elevation & Depth

Soft masks blend overlapping painted panels at scene boundaries. The painted scene, separate transparent traveler, three transparent cloud planes, vignette and restrained translucent panels establish depth. The foreground planes reuse `assets/clouds-v2.png`, whose naturally bounded lower silhouettes fade to a transparent canvas edge; the cloud layer overscans the viewport by 160px horizontally. The traveler has a diffuse drop shadow. Controls use small diffuse shadows and primary buttons add a compact tactile bevel; these are local game-control treatments, not a general heavy-shadow card system. Telemetry uses neutral black text shadows for contrast over imagery.

### Shadow Vocabulary
- **Question panel:** `0 13px 40px #0a1b3466, inset 0 1px 0 #a6c3c32b` supports a readable temporary dock.
- **Primary action:** `inset 0 2px 1px #fff0ba, 0 4px 1px #966232, 0 8px 16px #17283b55` supplies the existing tactile control surface.
- **Icon control:** `0 4px 12px #0003` lifts utility controls subtly.
- **Dialog:** `0 20px 100px #0009` separates a modal from the world.

The camera derives progress from score divided by the maximum score (2000), producing 2.4 viewport heights of upward travel for a 100-point answer. GSAP owns the world camera, with duration `4.8 + earnedPoints × .034` seconds and `power2.inOut` easing. Foreground clouds travel at 1.6, 1.8 and 1.5 times the far displacement. No scroll controller owns these transforms. Reduced motion repositions immediately and fades the world from opacity .35 to 1 over .25 seconds; CSS disables decorative animation and transitions. Idle balloon motion uses a small five-second drift and stops while traveling.

**The World Leads Rule.** During actual flight, hide the question dock and header; show the arrival result and continuation only after the camera stops.

Not canonized: the home title’s existing hard offset text extrusion is a one-off lettering treatment. It is excluded from reusable elevation tokens so later surfaces do not inherit it as a general shadow rule.

## Shapes

Controls have soft rounded corners: compact selected tabs, medium icon/secondary controls, larger primary buttons and cream entry fields. Main panels and dialogs share the largest panel radius; mobile question panels tighten it. Question progress uses circular pips. The flight ladder adds numbered circular medals and a thin vertical earned-progress track. SVG interface icons use rounded strokes, while the balloon, pilot and clouds keep their original illustrated contours. Preserve field and panel boundaries through tonal contrast and restrained inset highlights.

## Components

### Buttons
Primary actions are full-width amber gradient controls with dark ink labels, a minimum desktop height (58px), the primary padding token, and a tactile bevel. Hover brightens them and raises them slightly (2px); active presses them down (2px) and shortens the shadow. Touch devices suppress hover translation. Secondary actions use a quiet teal fill and a lighter hover fill. Disabled buttons reduce opacity to .5. Keyboard focus uses a cream outline (3px, offset 4px).

### Answer Field
A cream rounded field contains a dark text input and an amber square submit action with an inline upward-arrow SVG. The wrapper has a five-pixel inset; focus-within adds an amber ring (`0 0 0 3px #f8c86a66`). The input has a visible label, a text placeholder, feedback status below, and an adjacent skip action. Error feedback uses warm coral text rather than replacing the field geometry.

### Navigation
The two game modes live in a compact dark rounded tray. The selected mode becomes cream with dark ink text; the unselected hover gains a translucent white fill. Utility actions use square dark icon buttons with explicit accessible names. The mobile tray moves below home content; actual flight hides the header entirely.

### Question Dock
A translucent dark teal panel holds question count and score, a Lilita prompt, concise rule text, a slim countdown, cream answer field and supporting actions. Twenty circular progress pips sit across its upper edge; current is light cream, completed is amber, and unvisited is muted teal. Pips shrink from 12px to 9px on mobile. The countdown warms to coral when urgent.

### Flight Level Ladder
A dark translucent side panel shows all six positive answer tiers, with Legendarisk at the top and Begynder at the bottom. Numbered medals, tier names and point thresholds provide a persistent reading of the answer’s ascent. Unreached names remain readable in muted light teal; passed medals gain their existing tier colors, while the active name gains that same color and shifts slightly right (4px desktop, 2px mobile). The vertical track fills upward monotonically from the earned points for the current answer, rather than total run points. The final attained tier remains marked at arrival. The ladder is informational, uses a labeled aside and ordered list, and marks the current tier with `aria-current="step"`. Reduced motion displays the attained state immediately.

### Arrival Result
The compact arrival panel presents the earned rarity, accepted answer, point and height gain, any real spelling correction, and the next action. It is created only when the camera completes its flight. Reduced motion uses the same completion gate after its brief fade.

### Results and Local History
The final panel emphasizes total height, then renders 20 labeled result columns in two rows of ten. Each column uses its actual editorial tier color. Expandable answer details use a compact table; dialogs show help, editorial scoring context and real local flight history. No invented popularity data is part of the system.

### Dialogs and Feedback
Dialogs use a dark teal surface, the shared panel radius, a strong soft shadow and a dark translucent backdrop. Text toasts use a warm cream surface with dark ink; transient toasts are hidden during flight. Native dialog, form, table and details semantics remain part of the component behavior.

## Do's and Don'ts

### Do:
- **Do** extend the existing painted universe with the islands, orbit, ice and rift scene assets, retaining the transparent traveler and separate clouds.
- **Do** preserve the visual distinction between cream answer fields, amber primary actions and dark teal panels.
- **Do** keep 20 progress pips and the result chart in two rows of ten.
- **Do** keep all six answer tiers visible during flight and preserve the attained tier at arrival.
- **Do** retain visible keyboard focus, accessible control names and the reduced-motion flight path.
- **Do** describe rarity as editorial estimates and show only real local history.

### Don't:
- **Don't** replace the painted journey with horizontal tier lines or generic marketing-page sections.
- **Don't** keep questions or menus over the actual flight.
- **Don't** invent player statistics, popularity percentages or a global leaderboard.
- **Don't** inherit the home title’s hard offset extrusion as a general shadow token.

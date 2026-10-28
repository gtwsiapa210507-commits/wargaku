---
name: Suroboyo Civic Pulse
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#5b403d'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0ef'
  outline: '#906f6c'
  outline-variant: '#e4beb9'
  surface-tint: '#bb171c'
  primary: '#b7131a'
  on-primary: '#ffffff'
  primary-container: '#db322f'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb4ac'
  secondary: '#b51925'
  on-secondary: '#ffffff'
  secondary-container: '#d8363a'
  on-secondary-container: '#fffbff'
  tertiary: '#b6171e'
  on-tertiary: '#ffffff'
  tertiary-container: '#da3433'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ac'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000d'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#ffb3ae'
  on-secondary-fixed: '#410004'
  on-secondary-fixed-variant: '#930015'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb3ac'
  on-tertiary-fixed: '#410003'
  on-tertiary-fixed-variant: '#930010'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e5e2e1'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes a citizen-first, accessible, and civic-tech mobile experience inspired by municipal public services. The design language balances civic authority with approachable everyday utility, ensuring high clarity for all demographics across Surabaya.

The aesthetic blends **Modern Tactile Minimalism** with **Warm Civic Modernism**:
- Bold municipal crimson header zones transition seamlessly into elevated, rounded white card sheets.
- Friendly, highly legible typography paired with spacious tap targets and soft pill-based filters.
- Subtle physical presence via soft ambient shadows, contoured floating navigation bars, and prominent emergency call-to-action touchpoints.
- Uncluttered interfaces emphasizing swift discovery, transparent bureaucratic status tracking, and effortless civic engagement.

## Colors

The palette revolves around the energetic municipal red representing the spirit of Surabaya:

- **Primary (`#e53935`)**: The core brand anchor used for primary action buttons, active navigation states, primary filter pills, and signature hero backdrops.
- **Secondary (`#ff5252`)**: A soft coral-red used for vibrant gradient fills, top bar ambient transitions, and active hover/focus indicators.
- **Tertiary (`#d32f2f`)**: Deep crimson used for pressed button states, emergency hotline accents, and high-emphasis civic badges.
- **Neutral Palette**:
  - Surface Background: Pure White (`#ffffff`) for elevated container sheets and clean contrast.
  - Soft Neutral (`#f4f5f7`): For search input fills, empty state card backgrounds, and pill container outlines.
  - Text Primary (`#212121`): High-contrast charcoal black for headers, titles, and critical notices.
  - Text Secondary / Muted (`#757575`): Accessible mid-gray for placeholders, metadata, inactive tab icons, and subtitle microcopy.

## Typography

The type scale relies entirely on **Plus Jakarta Sans**, chosen for its friendly geometric construction, wide optical aperture, and distinct modern civic character.

- **Headlines**: Set in Extra Bold (`800`) and Bold (`700`) with tight letter-spacing for punchy recognition across top app bars and section titles.
- **Body Text**: Tuned for effortless readability in both civic instruction texts and empty-state messaging, using Medium (`500`) and Regular (`400`).
- **Interactive Labels**: High-emphasis bold weights ensure pills, tab buttons, and badge labels remain distinct and accessible even under direct outdoor sunlight.

## Layout & Spacing

The layout model is optimized for mobile-first handheld usage:
- **Canvas Anatomy**: A fixed header container housing city insignia and utility actions, giving way to a layered content body sheet that overlaps the header with large curved top corners (`rounded-3xl`).
- **Horizontal Margins**: Standard screen padding of `1.25rem` (20px) on mobile viewports ensures touch safety from bezel edges.
- **Vertical Rhythm**: Built upon an 8pt baseline grid (`0.5rem`, `1rem`, `1.5rem`, `2rem`) keeping visual density structured, readable, and thumb-friendly.
- **Scroll Buffer**: Bottom content reserves a minimum padding of `5.5rem` (88px) to prevent floating navigation overlays from occluding the lowest cards.

## Elevation & Depth

Visual hierarchy uses sheet-layering and diffused ambient shadows rather than harsh outlines:

- **Level 0 (Flat Ground)**: Clean backdrop surfaces using `#f8f9fa` or pure `#ffffff`.
- **Level 1 (Card Containers & Inset Fields)**: Soft containers using low-contrast border lines (`1px solid #e0e0e0`) with flat or subtle `0 2px 8px rgba(0, 0, 0, 0.04)` shadows.
- **Level 2 (Header Overlap Sheet)**: The primary white content sheet features an elevated presence over the crimson hero banner, marked by its smooth curved perimeter and subtle vertical shadow falloff (`0 -4px 16px rgba(0, 0, 0, 0.06)`).
- **Level 3 (Floating Hotline & Navigation Deck)**: The bottom navigation dock and floating emergency button employ warm diffused shadows (`0 8px 24px rgba(229, 57, 53, 0.35)` on the hotline, and `0 4px 20px rgba(0, 0, 0, 0.08)` on the white dock).

## Shapes

The design uses generous roundedness to create an approachable, citizen-friendly aesthetic:
- **Base Components**: Default buttons, search fields, and regular cards employ `rounded-lg` (12px to 16px).
- **Categorical & Filter Pills**: Fully rounded pill shapes (`rounded-full` / 9999px) for effortless chip interaction.
- **Main Content Shell**: Large top corner radiuses (`24px` to `28px`) where the main white surface slides up over the red header.
- **Emergency Action Dial**: Circular floating action component with an organic carved cradle contouring the bottom navigation bar.

## Components

### Header & App Bar
- **Hero Header**: Gradient crimson-to-red banner (`linear-gradient(135deg, #e53935 0%, #ff5252 100%)`) featuring bold white title "Layanan Digital" and municipal subtitle "Pemerintah Kota Surabaya".
- **Top Utility Button**: Glassmorphic frosted translucent button (`background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(8px)`) with crisp white icon and label.

### Search Field
- **Search Bar**: Light gray filled container (`#f2f4f7`), 48px height, rounded pill corners (`rounded-full`), left-aligned magnifying glass icon (`#757575`), with placeholder styled in `body-md` muted typography.

### Pill Filters & Tabs
- **Active Pill**: Solid primary red fill (`#e53935`), pure white text, bold weight, with subtle red elevation shadow.
- **Inactive Pill**: Transparent or crisp white fill, 1.5px subtle border (`#e0e0e0`), dark gray text (`#424242`), with interactive press state tinting to `#f5f5f5`.

### Informational & Empty Cards
- **Empty State Card**: Clean rounded card (`rounded-2xl`) with soft neutral background (`#f9fafb`), 1px subtle border (`#ebeef2`), containing centered monochrome icon (`#b0bec5`), bold heading (`#424242`), and supportive subtitle (`#757575`).

### Floating Bottom Navigation & Notch
- **Navigation Dock**: Floating curved white bar elevated from viewport bottom, featuring active icon indicator in primary red (`#e53935`) and inactive items in neutral gray (`#9e9e9e`).
- **Emergency Hotline Cutout Button**: Centered floating action button housed in an organic scooped-out curve. Gradient crimson sphere (`#e53935` to `#d32f2f`) with a bold white phone receiver icon and glowing ambient drop shadow.
# Logo Configuration Guide

This document explains how to embed the RootWork Framework logo as base64 to ensure it persists across deployments.

## Problem

The logo was being referenced from an external file path (`/mnt/user-data/uploads/Emblem_of_Knowledge_and_Balance.png`) which would get lost during deployments or environment changes. This caused the logo to not "stick" or display properly.

## Solution

The logo is now embedded directly in the code as a base64-encoded data URI. This ensures the logo is always available and doesn't depend on external file paths.

## How to Add the Logo

### Step 1: Convert Your Logo to Base64

If you have the logo file (PNG, WEBP, JPG, etc.), convert it to base64:

```bash
base64 -w 0 path/to/your/logo.png > logo_base64.txt
```

This will create a text file containing the base64-encoded version of your logo.

### Step 2: Copy the Base64 String

Open the `logo_base64.txt` file and copy the entire base64 string. It should look something like:

```
UklGRqysAQBXRUJQVlA4WAoAAAAgAAAA/wMA/wMASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AAB...
```

### Step 3: Update the Logo Configuration

Open the file: `/src/config/logo.ts`

Replace the empty string in `LOGO_BASE64_DATA` with your complete base64 string:

```typescript
export const LOGO_BASE64_DATA = 'UklGRqysAQBXRUJQVlA4WAoAAAAgAAAA...[your full base64 string here]'
```

If your logo is not a WEBP image, also update the `LOGO_MIME_TYPE`:

- For PNG: `'image/png'`
- For JPEG: `'image/jpeg'`
- For SVG: `'image/svg+xml'`
- For WEBP: `'image/webp'` (default)

### Step 4: Verify the Logo Displays

Run the development server:

```bash
npm run dev
```

Visit the registration page at `http://localhost:3000/register` and verify that the logo appears in the header instead of the 🌱 emoji.

## Where the Logo Appears

The logo currently appears in:
- **Registration page header** (`/register`)

## Fallback Behavior

If no base64 data is configured, the system will display a 🌱 emoji as a fallback. This ensures the UI remains functional even without a logo.

## Technical Details

- **Configuration file**: `/src/config/logo.ts`
- **Usage in components**: Import `getLogoDataUri()` to get the data URI
- **Image format**: The header indicates WEBP format based on the partial base64 string provided
- **Estimated size**: ~146KB based on the character count (146,332 characters)

## Notes

- The base64 string should be a single line with no line breaks
- Large logos may increase the bundle size - consider optimizing the image before conversion
- The logo is embedded in the JavaScript bundle, so it's cached with the application code

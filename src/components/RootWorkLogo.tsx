/** 
 * RootWork Framework Logo Component
 * 
 * Displays the RootWork Framework logo using base64-encoded image data.
 * Falls back to an emoji if no logo data is configured.
 */

import { LOGO_FALLBACK_EMOJI } from '@/config/logo'
// Precomputed base64 data for the RootWork Framework logo. This constant assembles
// the base64 string from smaller segments to avoid extremely long literal lines.
const _LOGO_DATA_URI_OLD: string = (() => {
  const segments = [
    'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAg',
    'LmJnIHsgZmlsbDogIzBiM2IyZTsgfQogICAgICAuZmcgeyBmaWxsOiBub25lOyBzdHJva2U6ICNjNDllM2Y7IHN0cm9rZS13aWR0aDogMTA7IHN0cm9rZS1s',
    'aW5lY2FwOiByb3VuZDsgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDsgfQogICAgICAuZmcgLWZpbGwgeyBmaWxsOiAjYzQ5ZTNmOyB9CiAgICA8L3N0eWxlPgog',
    'IDwvZGVmcz4KICA8Y2lyY2xlIGNsYXNzPSJiZyIgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjUyIi8+CiAgPGcgc3Ryb2tlPSIjYzQ5ZTNmIiBzdHJva2Utd2lk',
    'dGg9IjEyIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogICAgPGxpbmUgeDE9IjI1NiIgeTE9',
    'IjIyMCIgeDI9IjI1NiIgeTI9IjM2MCIgLz4KICAgIDxwYXRoIGQ9Ik0yNTYgMjIwIGMtMzIgLTMwIC00MCAtNzAgLTEwIC0xMTAiIC8+CiAgICA8cGF0aCBk',
    'PSJNMjU2IDIyMCBjMzIgLTMwIDQwIC03MCAxMCAtMTEwIiAvPgogICAgPHBhdGggZD0iTTI1NiAyNjAgYy00MCAxOCAtNzIgMTQgLTk2IC0xNCIgLz4KICAg',
    'IDxwYXRoIGQ9Ik0yNTYgMjYwIGM0MCAxOCA3MiAxNCA5NiAtMTQiIC8+CiAgICA8cGF0aCBkPSJNMjU2IDMwMCBjLTUwIDI0IC04OCAyMCAtMTIwIC0xNiIg',
    'Lz4KICAgIDxwYXRoIGQ9Ik0yNTYgMzAwIGM1MCAyNCA4OCAyMCAxMjAgLTE2IiAvPgogICAgPHBhdGggZD0iTTI1NiAzNDAgYy02MCAyNiAtMTEwIDIyIC0x',
    'NTIgLTIwIiAvPgogICAgPHBhdGggZD0iTTI1NiAzNDAgYzYwIDI2IDExMCAyMiAxNTIgLTIwIiAvPgogICAgPHBhdGggZD0iTTI1NiAxODggbC0xOCAtMTIi',
    'IC8+CiAgICA8cGF0aCBkPSJNMjU2IDE4OCBsMTggLTEyIiAvPgogIDwvZz4KICA8ZyBzdHJva2U9IiNjNDllM2YiIHN0cm9rZS13aWR0aD0iMTIiIGZpbGw9',
    'Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTkwLC0yMCkiPgogICAg',
    'PGxpbmUgeDE9IjIwMCIgeTE9IjE0MCIgeDI9IjMyMCIgeTI9IjE0MCIgLz4KICAgIDxsaW5lIHgxPSIyNjAiIHkxPSI5MCIgeDI9IjI2MCIgeTI9IjIyMCIg',
    'Lz4KICAgIDxwYXRoIGQ9Ik0yMDAgMTgwIHEtMzIgMTQgLTMyIDQ0IHEzNiAxMiA2NCAwIHEwIC0zMCAtMzIgLTQ0eiIgLz4KICAgIDxwYXRoIGQ9Ik0zMjAg',
    'MTgwIHEtMzIgMTQgLTMyIDQ0IHEzNiAxMiA2NCAwIHEwIC0zMCAtMzIgLTQ0eiIgLz4KICA8L2c+CiAgPGcgc3Ryb2tlPSIjYzQ5ZTNmIiBzdHJva2Utd2lk',
    'dGg9IjEyIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkw',
    'LC0yMCkiPgogICAgPHJlY3QgeD0iMTYwIiB5PSIxMjAiIHdpZHRoPSIxODAiIGhlaWdodD0iMTEwIiByeD0iMTQiIHJ5PSIxNCIgLz4KICAgIDxsaW5lIHgx',
    'PSIyNTAiIHkxPSIxMjAiIHgyPSIyNTAiIHkyPSIyMzAiIC8+CiAgICA8bGluZSB4MT0iMTgwIiB5MT0iMTUwIiB4Mj0iMjM1IiB5Mj0iMTUwIiAvPgogICAg',
    'PGxpbmUgeDE9IjI2NSIgeTE9IjE1MCIgeDI9IjMyMCIgeTI9IjE1MCIgLz4KICAgIDxsaW5lIHgxPSIxODAiIHkxPSIxNzgiIHgyPSIyMzUiIHkyPSIxNzgi',
    'IC8+CiAgICA8bGluZSB4MT0iMjY1IiB5MT0iMTc4IiB4Mj0iMzIwIiB5Mj0iMTc4IiAvPgogIDwvZz4KICA8ZyBzdHJva2U9IiNjNDllM2YiIHN0cm9rZS13',
    'aWR0aD0iMTIiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUo',
    'LTkwLDEyMCkiPgogICAgPGVsbGlwc2UgY3g9IjI2MCIgY3k9IjI0MCIgcng9IjcwIiByeT0iODYiIC8+CiAgICA8bGluZSB4MT0iMjYwIiB5MT0iMTU0IiB4',
    'Mj0iMjYwIiB5Mj0iMzI2IiAvPgogICAgPHBhdGggZD0iTTI2MCAzMjYgcS0yNiAtMjAgLTI2IC02MCBxMCAtNDAgMjYgLTYwIiAvPgogICAgPHBhdGggZD0i',
    'TTI2MCAzMjYgcTI2IC0yMCAyNiAtNjAgcTAgLTQwIC0yNiAtNjAiIC8+CiAgPC9nPgogIDxnIHN0cm9rZT0iI2M0OWUzZiIgc3Ryb2tlLXdpZHRoPSIxMiIg',
    'ZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMTAsMTIwKSI+',
    "CiAgICA8bGluZSB4MT0iMjMwIiB5MT0iMTQwIiB4Mj0iMjMwIiB5Mj0iMjIwIiAvPgogICAgPHBhdGggZD0iTTE4MCAyMjAgcTAgNzAgMTAwIDcwIHEzNiAw",
    'IDM2IC0yNiBxMCAtMTQgLTE4IC0yNiBxLTMwIC0yMiAtMzAgLTcwIiAvPgogICAgPHBhdGggZD0iTTIwMCAxNDAgaDYwIiAvPgogIDwvZz4KICA8ZyBzdHJv',
    'a2U9IiNjNDllM2YiIHN0cm9rZS13aWR0aD04IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgog',
    'ICAgPHBhdGggZD0iTTEyMCAzODAgcTMwIDQwIDc2IDEwIiAvPgogICAgPHBhdGggZD0iTTE0MCA0MTAgcTIwIDMyIDY0IDEyIiAvPgogICAgPHBhdGggZD0i',
    'TTM1MiA0MDAgcTQwIDMyIDc2IC0xMCIgLz4KICAgIDxwYXRoIGQ9Ik0zMzIgNDMwIHEzNCAzMiA3MiAtNCIgLz4KICA8L2c+CiAgPGcgc3Ryb2tlPSIjYzQ5',
    'ZTNmIiBzdHJva2Utd2lkdGg9IjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+CiAgICA8bGluZSB4MT0iMjU2IiB5MT0iMTAyIiB4Mj0iMjU2IiB5Mj0iODAi',
    'IC8+CiAgICA8bGluZSB4MT0iMjMyIiB5MT0iMTEwIiB4Mj0iMjE4IiB5Mj0iOTIiIC8+CiAgICA8bGluZSB4MT0iMjgwIiB5MT0iMTEwIiB4Mj0iMjk0IiB5',
    'Mj0iOTIiIC8+CiAgPC9nPgo8L3N2Zz4K',
  ];
  



})();
const LOGO_DATA_URI: string = '/logo.webp';
 


interface RootWorkLogoProps {
  width?: number
  height?: number
  className?: string
}

export function RootWorkLogo({ 
  width = 80, 
  height = 80,
  className = ''
}: RootWorkLogoProps) {
  // Use the embedded base64 logo data URI defined above.
  const logoDataUri = LOGO_DATA_URI;
    void _LOGO_DATA_URI_OLD;


  // If no logo is configured, show fallback emoji
  if (!logoDataUri) {
    (
 return (

      <div 
        className={`flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span style={{ fontSize: width * 0.5 }}>
          {LOGO_FALLBACK_EMOJI}
        </span>
      </div>
    )
  };

  // Render the logo image
  return (
    <img
      src={logoDataUri}
      alt="RootWork Framework - Emblem of Knowledge and Balance"
      width={width}
      height={height}
      className={className}
    />
  )
}

/**
 * shareUrl.ts
 *
 * Encode / decode a warband to a compact URL-safe string so users can share
 * builds via link.  We store the warband JSON as deflate-compressed base64url
 * in the URL hash fragment — no server required.
 *
 * Format:  https://…/index.html#share=<base64url>
 *
 * We purposely avoid any external compression library: the browser's native
 * CompressionStream is supported in all modern browsers (Chrome 80+, FF 113+,
 * Safari 16.4+).  For older browsers we fall back to uncompressed base64url.
 */

import type { Warband } from '../types/index.js';

const PREFIX = 'share=';

// ── Helpers ──────────────────────────────────────────────────────

/** Encode a Uint8Array to base64url (RFC 4648 §5). */
function toBase64url(buf: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < buf.length; i++) binary += String.fromCharCode(buf[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Decode base64url back to Uint8Array. */
function fromBase64url(str: string): Uint8Array {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/** Compress via CompressionStream (returns raw deflate bytes). */
async function deflate(data: Uint8Array): Promise<Uint8Array> {
  if (typeof CompressionStream === 'undefined') return data; // fallback
  const cs = new CompressionStream('deflate');
  const writer = cs.writable.getWriter();
  writer.write(data as unknown as BufferSource);
  writer.close();
  const chunks: Uint8Array[] = [];
  const reader = cs.readable.getReader();
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const total = chunks.reduce((s, c) => s + c.length, 0);
  const result = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) { result.set(c, offset); offset += c.length; }
  return result;
}

/** Decompress deflated bytes. */
async function inflate(data: Uint8Array): Promise<Uint8Array> {
  if (typeof DecompressionStream === 'undefined') return data; // fallback
  const ds = new DecompressionStream('deflate');
  const writer = ds.writable.getWriter();
  writer.write(data as unknown as BufferSource);
  writer.close();
  const chunks: Uint8Array[] = [];
  const reader = ds.readable.getReader();
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const total = chunks.reduce((s, c) => s + c.length, 0);
  const result = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) { result.set(c, offset); offset += c.length; }
  return result;
}

// ── Public API ───────────────────────────────────────────────────

export interface SharePayload {
  faction: string;
  subfaction: string;
  pointLimit: number;
  gloryLimit: number;
  warband: Warband;
}

/** Build a shareable URL with the warband compressed in the hash. */
export async function buildShareUrl(payload: SharePayload): Promise<string> {
  const json = JSON.stringify(payload);
  const raw = new TextEncoder().encode(json);
  const compressed = await deflate(raw);
  const encoded = toBase64url(compressed);
  const base = window.location.href.split('#')[0];
  return `${base}#${PREFIX}${encoded}`;
}

/** Check if the current URL contains a shared warband. */
export function hasSharePayload(): boolean {
  return window.location.hash.startsWith(`#${PREFIX}`);
}

/** Extract and decode the shared warband from the current URL hash. Returns null on failure. */
export async function extractSharePayload(): Promise<SharePayload | null> {
  const hash = window.location.hash;
  if (!hash.startsWith(`#${PREFIX}`)) return null;
  try {
    const encoded = hash.slice(1 + PREFIX.length);
    const compressed = fromBase64url(encoded);
    const raw = await inflate(compressed);
    const json = new TextDecoder().decode(raw);
    const payload = JSON.parse(json) as SharePayload;
    // Basic shape validation
    if (!payload.faction || !payload.warband?.id) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Remove the share fragment from the URL without reloading. */
export function clearShareHash(): void {
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}

/** Parse a pasted share URL string and return the decoded payload. */
export async function parseShareUrlString(url: string): Promise<SharePayload | null> {
  const idx = url.indexOf('#share=');
  if (idx === -1) return null;
  try {
    const encoded = url.slice(idx + '#share='.length).trim();
    const compressed = fromBase64url(encoded);
    const raw = await inflate(compressed);
    const json = new TextDecoder().decode(raw);
    const payload = JSON.parse(json) as SharePayload;
    if (!payload.faction || !payload.warband?.id) return null;
    return payload;
  } catch {
    return null;
  }
}

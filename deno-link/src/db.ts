import { encodeBase64Url, encodeHex } from "jsr:@std/encoding";
import { crypto } from "jsr:@std/crypto/crypto";

const kv = await Deno.openKv();

export type ShortLink = {
  shortCode: string;
  longUrl: string;
  createdAt: number;
  userId: string;
  clickCount: number;
  lastClickEvent?: string;
};

export async function storeShortLink(
  longUrl: string,
  shortCode: string,
  userId: string
) {
  const shortLinkKey = ["shortlinks", shortCode];
  const data: ShortLink = {
    shortCode,
    longUrl,
    userId,
    createdAt: Date.now(),
    clickCount: 0,
  };

  const res = await kv.set(shortLinkKey, data);

  if (!res.ok) {
    // handle errors
  }

  return res;
}

export async function getShortLink(shortCode: string) {
  const link = await kv.get<ShortLink>(["shortlinks", shortCode]);

  return link.value;
}

export async function generateShortCode(longUrl: string) {
  try {
    new URL(longUrl);
  } catch (error) {
    console.error(error);
    throw new Error("Invalid Url Provided");
  }

  const urlData = new TextEncoder().encode(longUrl + Date.now());
  const hash = await crypto.subtle.digest("SHA-256", urlData);
  const shortCode = encodeBase64Url(hash.slice(0, 8));

  return shortCode;
}

// const url = "https://guerrero.zone";
// const shortCode = await generateShortCode(url);
// const userId = "amguerrero";

// await storeShortLink(url, shortCode, userId);

// const link = await getShortLink(shortCode);
// console.log(link);

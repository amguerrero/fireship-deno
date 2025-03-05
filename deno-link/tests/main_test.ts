import { assertEquals, assertNotEquals, assertRejects } from "jsr:@std/assert";
import { delay } from "jsr:@std/async/delay";
import { generateShortCode } from "../src/db.ts";

Deno.test("URL Shortener", async (t) => {
  await t.step("should generate a shortcode for a valid url", async () => {
    const longUrl = "https://www.somereallylong.url.com/because-why-not";
    const shortCode = await generateShortCode(longUrl);

    // console.log(shortCode);
    assertEquals(typeof shortCode, "string");
    assertEquals(shortCode.length, 11);
  });

  await t.step("should generate unique codes for the same url in different timestamps", async () => {
    const longUrl = "https://www.somereallylong.url.com/because-why-not";
    const shortCode1 = await generateShortCode(longUrl);
    await delay(5);
    const shortCode2 = await generateShortCode(longUrl);

    assertNotEquals(shortCode1, shortCode2);
  });

  await t.step("throws an error on a bad url", () => {
    const badUrl = "this is not a url";

    assertRejects(async () => {
      await generateShortCode(badUrl);
    });
  });
});

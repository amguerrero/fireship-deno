// function helloWorld() {
//   console.log("Hello, world!");
// }
// // Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
// if (import.meta.main) {
//   helloWorld();
// }

import { mapEntries } from "jsr:@std/collections";

const map = { a: "1", b: "2", c: "3" };

const reverseMap = mapEntries(map, ([key, value]) => [value, key]);

console.log(reverseMap);

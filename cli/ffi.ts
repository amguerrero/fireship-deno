const libName = "lib.so";

const lib = Deno.dlopen(libName, {
  toUpperCase: {
    parameters: ["pointer"],
    result: "void",
  },
});

function toCString(str: string): Uint8Array {
  const encoder = new TextEncoder();
  const arr = encoder.encode(str + "\0");
  return arr;
}

export function toUpperCaseWithC(str: string): string {
  const text = toCString(str);
  lib.symbols.toUpperCase(Deno.UnsafePointer.of(text));

  const decoder = new TextDecoder();
  return decoder.decode(text);
}

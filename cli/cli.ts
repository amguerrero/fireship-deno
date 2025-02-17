import { parseArgs } from "jsr:@std/cli/parse-args";
import { red, yellow, blue, magenta, bgGreen } from "jsr:@std/fmt/colors";
import { toKebabCase, toSnakeCase } from "jsr:@std/text";

const flags = parseArgs(Deno.args, {
  boolean: ["kebab", "snake"],
  string: ["text"],
  default: {
    text: "Hi, Mom!",
  },
});

const age = prompt("How old are you?");

if (parseInt(age!) < 21) {
  console.log(red("Sorry, you're too young for this command."));
  Deno.exit();
}

const cont = confirm("Are you sure you want to continue?");

if (!cont) {
  console.log(red("Goodbye!"));
  Deno.exit();
}

console.log();
console.log(bgGreen("Access Granted!"));
console.log();

console.log(yellow(flags.text.toUpperCase()));
flags.kebab && console.log(blue(toKebabCase(flags.text)));
flags.snake && console.log(magenta(toSnakeCase(flags.text)));
console.log(flags);

const data = Deno.readFileSync("./test/first.txt");
const decoder = new TextDecoder("utf-8");

console.log(decoder.decode(data));

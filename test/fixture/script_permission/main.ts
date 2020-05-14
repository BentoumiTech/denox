const data = Deno.readFileSync("./files/test.txt");
const decoder = new TextDecoder("utf-8");

console.log(decoder.decode(data));

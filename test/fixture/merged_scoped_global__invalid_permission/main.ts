const data = Deno.readFileSync("./files/test.txt");
const decoder = new TextDecoder("utf-8");

console.log(decoder.decode(data));

const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const json = await response.json();
console.log(json);

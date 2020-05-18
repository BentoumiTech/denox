console.log("allow-env:", await Deno.permissions.query({ name: "env" }));
console.log("allow-hrtime:", await Deno.permissions.query({ name: "hrtime" }));
console.log(
  "allow-net:",
  await Deno.permissions.query({ name: "net", url: "https://google.com" }),
);
console.log("allow-plugin:", await Deno.permissions.query({ name: "plugin" }));
console.log(
  "allow-read:",
  await Deno.permissions.query({ name: "read", path: "./files" }),
);
console.log("allow-run:", await Deno.permissions.query({ name: "run" }));
console.log(
  "allow-write:",
  await Deno.permissions.query({ name: "write", path: "./files" }),
);

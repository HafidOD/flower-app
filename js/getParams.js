const paramsURL = new URLSearchParams(window.location.search);
const name = paramsURL.get("name") || null;
const msg = paramsURL.get("msg") || null;
const from = paramsURL.get("from") || null;

console.log(name);
console.log(msg);
console.log(from);



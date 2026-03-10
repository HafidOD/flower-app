const paramsURL = new URLSearchParams(window.location.search);
const name = paramsURL.get("name") || null;
const msg = paramsURL.get("msg") || null;
const from = paramsURL.get("from") || null;

const containerName = document.getElementById("name")
const containerMsg = document.getElementById("msg")
const containerFrom = document.getElementById("from")

containerName ? containerName.textContent = name : null;
containerMsg ? containerMsg.textContent = msg : null;
containerFrom && from ? containerFrom.textContent = ("- " + from) : null;


const paramsURL = new URLSearchParams(window.location.search);
const name = paramsURL.get("name") || null;
const msg = paramsURL.get("msg") || null;
const from = paramsURL.get("from") || null;

const containerName = document.getElementById("name")
const containerMsg = document.getElementById("msg")
const containerFrom = document.getElementById("from")

containerName ? containerName.textContent = name : null;
containerMsg.textContent = msg || "Nadie debería quedarse sin sus flores amarillas, por eso te las envío llenas de cariño y buenos deseos para iluminar tu día.";
containerFrom && from ? containerFrom.textContent = ("- " + from) : null;


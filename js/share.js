// Wizard setup
const steps = ["step-occasion","step-message","step-name","step-sender","step-generate"];
let currentStep = 0;

// Copys por ocasión
const copies = {
  amor:["Para recordarte cuánto te amo ❤️","Eres mi persona favorita","Solo quería decirte que te amo"],
  amistad:["La vida es mejor con amigos como tú","Gracias por estar siempre","Las mejores risas son contigo"],
  carino:["Un pequeño detalle para ti","Pensé en ti hoy","Solo quería alegrarte el día"],
  agradecer:["Gracias por todo lo que haces","No siempre lo digo, pero lo aprecio","Este detalle es para agradecerte"],
  porque:["Porque sí, porque me acordé de ti","Solo quería sacarte una sonrisa","A veces no se necesita motivo"]
};

// Variables globales
let selectedOccasion = "";
let selectedCopy = "";

// Elementos
const occasionButtons = document.querySelectorAll(".occasion");
const copyContainer = document.getElementById("copyContainer");
const customMessage = document.getElementById("customMessage");
const previewMessage = document.getElementById("previewMessage");
const nameInput = document.getElementById("nameInput");
const senderInput = document.getElementById("senderInput");
const resultDiv = document.getElementById("result");
const nextStepBtn = document.getElementById("nextStep");
const prevStepBtn = document.getElementById("prevStep");

prevStepBtn.style.display = "none";
function updateNavigationButtons(){
  // Botón atrás
  prevStepBtn.style.display = currentStep === 0 ? "none" : "inline-block";
}

// Elegir ocasión
occasionButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    occasionButtons.forEach(c=>c.classList.remove("selected"));
    btn.classList.add("selected");
    selectedOccasion = btn.dataset.type;

    copyContainer.innerHTML = "";
    customMessage.style.display = "none";
    selectedCopy = "";
    previewMessage.textContent = "";

    if(selectedOccasion==="personalizado"){
      customMessage.style.display="block";
      customMessage.value="";
    } else if(copies[selectedOccasion]){
      copies[selectedOccasion].forEach(copy=>{
        const card = document.createElement("button");
        card.className="copy-card";
        card.textContent = copy;
        card.addEventListener("click",()=>{
          document.querySelectorAll(".copy-card").forEach(c=>c.classList.remove("selected"));
          card.classList.add("selected");
          selectedCopy = copy;
          previewMessage.textContent = copy;
        });
        copyContainer.appendChild(card);
      });
    }
  });
});

// Preview mensaje personalizado
customMessage.addEventListener("input",()=>{
  previewMessage.textContent = customMessage.value;
});

// Siguiente paso
nextStepBtn.addEventListener("click",()=>{
  // Validaciones
  if(currentStep===0 && !selectedOccasion){
    alert("Por favor selecciona una ocasión");
    return;
  }
  if(currentStep===1){
    const msg = customMessage.style.display==="block" ? customMessage.value.trim() : selectedCopy;
    if(!msg){
      alert("Selecciona o escribe un mensaje");
      return;
    }
  }
  if(currentStep===2 && !nameInput.value.trim()){
    alert("Ingresa el nombre del destinatario");
    return;
  }
  // if(currentStep===3 && !senderInput.value.trim()){
  //   alert("Ingresa tu nombre");
  //   return;
  // }

  document.getElementById(steps[currentStep]).style.display="none";
  currentStep++;
  document.getElementById(steps[currentStep]).style.display="block";
  updateNavigationButtons();

  // Último paso
  if(currentStep===steps.length-1){
    nextStepBtn.style.display="none";

    const message = customMessage.style.display==="block" ? customMessage.value.trim() : selectedCopy;

    const baseUrl = new URL('.', window.location.href).href;
    const url = `${baseUrl}?name=${encodeURIComponent(nameInput.value.trim())}&msg=${encodeURIComponent(message)}&from=${encodeURIComponent(senderInput.value.trim())}`;

    resultDiv.innerHTML = `<input value="${url}" readonly style="width:80%; margin-bottom:10px;">`;

    document.getElementById("shareWhatsApp").onclick = ()=>{
      window.open(`https://wa.me/?text=${encodeURIComponent(url)}`,'_blank');
    };
    document.getElementById("shareCopy").onclick = ()=>{
      navigator.clipboard.writeText(url);
      alert("Link copiado!");
    };
    document.getElementById("shareBtn").onclick = () => {
      if (navigator.share) {
        navigator.share({
          title: "Eres especial para mí, por eso te comparto esto",
          url: url
        });
      } else {
        navigator.clipboard.writeText(url);
        alert("Tu dispositivo no soporta compartir directamente. Link copiado! Compártelo con quien quieras :)");}
    };
  }
});

// Paso atrás
prevStepBtn.addEventListener("click",()=>{
  if(currentStep===0) return;
  document.getElementById(steps[currentStep]).style.display="none";
  currentStep--;
  document.getElementById(steps[currentStep]).style.display="block";
  nextStepBtn.style.display="inline-block";
  updateNavigationButtons();

  if(currentStep < steps.length-1){
    resultDiv.innerHTML="";
  }
});

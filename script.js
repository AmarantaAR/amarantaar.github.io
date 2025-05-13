// script.js

function toggleMenu() {
  document.getElementById('sidebar').classList.toggle('collapsed');
  document.getElementById('main').classList.toggle('collapsed');
}

function openModal(title, description, images) {
  const modal = document.getElementById("modal");
  const modalGallery = document.getElementById("modal-gallery");
  modal.style.display = "flex";
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-description").textContent = description;

  modalGallery.innerHTML = '';
  images.forEach((url) => {
    const img = document.createElement("img");
    img.src = url;
    img.className = "modal-gallery-image";
    img.onclick = () => zoomImage(url);
    modalGallery.appendChild(img);
  });
}

function closeModal(e) {
  if (e.target.classList.contains("modal") || e.target.classList.contains("modal-close")) {
    document.getElementById("modal").style.display = "none";
  }
}

function zoomImage(url) {
  const overlay = document.createElement("div");
  overlay.className = "zoom-overlay";
  overlay.onclick = () => overlay.remove();

  const img = document.createElement("img");
  img.src = url;
  img.className = "zoomed-image";

  overlay.appendChild(img);
  document.body.appendChild(overlay);
}

// function openModal(title, description, imageUrl) {
//   document.getElementById('modal').style.display = 'flex';
//   document.getElementById('modal-title').innerText = title;
//   document.getElementById('modal-description').innerText = description;
//   document.getElementById('modal-image').src = imageUrl;
//   document.getElementById('purchase-form').dataset.artTitle = title;
// }

// function closeModal(event) {
//   if (event.target.classList.contains('modal') || event.target.classList.contains('modal-close')) {
//     document.getElementById('modal').style.display = 'none';
//   }
// }

// 🔐 Esta variable será reemplazada automáticamente en build.sh con la URL real
let GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby7op0B61n7CNe2UHZ7IH-yenEqhQE4LVOB4I2p9fJ0yY9B5ycXf8XnKW6EbBUccaWA/exec";

// Manejar el envío del formulario
const form = document.getElementById("purchase-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = form.nombre.value.trim();
  const correo = form.correo.value.trim();
  const telefono = form.telefono.value.trim();
  const instagram = form.instagram.value.trim();
  const obra = form.dataset.artTitle;

  // 1. Enviar mensaje por WhatsApp
  const msg = `Hola, soy ${nombre}. Estoy interesad@ en la obra \"${obra}\".%0A%0AMis datos son:%0A📧 ${correo}%0A📱 ${telefono}%0A📷 IG: ${instagram || 'No registrado'}`;
  const whatsappURL = `https://wa.me/573108125179?text=${msg}`;
  window.open(whatsappURL, '_blank');

  // 2. Guardar en Google Sheets con verificación
  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombre,
      correo,
      telefono,
      instagram,
      obra,
      secretKey: "amaranta2024"
    })
  });

  form.reset();
  document.getElementById('modal').style.display = 'none';
});



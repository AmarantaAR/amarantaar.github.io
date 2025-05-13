// script.js

function toggleMenu() {
  document.getElementById('sidebar').classList.toggle('collapsed');
  document.getElementById('main').classList.toggle('collapsed');
}

// function openModal(title, description, imageUrl) {
//   document.getElementById('modal').style.display = 'flex';
//   document.getElementById('modal-title').innerText = title;
//   document.getElementById('modal-description').innerText = description;
//   document.getElementById('modal-image').src = imageUrl;
//   document.getElementById('purchase-form').dataset.artTitle = title;
// }

function openModal(title, description, images) {
  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-description').innerText = description;

  const modalContent = document.querySelector('.modal-content');

  // Crear estructura Swiper para múltiples imágenes
  modalContent.innerHTML = `
    <span class="modal-close" onclick="closeModal(event)">&times;</span>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        ${images.map(img => `
          <div class="swiper-slide">
            <img src="${img}" class="zoomable-image" style="width:100%; border-radius:6px;" />
          </div>
        `).join('')}
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-pagination"></div>
    </div>
    <h3>${title}</h3>
    <p>${description}</p>
    <form id="purchase-form">
      <input type="text" name="nombre" placeholder="Nombre completo" required>
      <input type="email" name="correo" placeholder="Correo electrónico" required>
      <input type="text" name="telefono" placeholder="Número de contacto (WhatsApp)" required>
      <input type="text" name="instagram" placeholder="Instagram (opcional)">
      <button type="submit">Solicitar compra</button>
    </form>
  `;

  // Mostrar modal
  document.getElementById('modal').style.display = 'flex';

  // Inicializar Swiper
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // Aplicar zoom en imágenes
  mediumZoom('.zoomable-image');
}

function closeModal(event) {
  if (event.target.classList.contains('modal') || event.target.classList.contains('modal-close')) {
    document.getElementById('modal').style.display = 'none';
  }
}


// 🔐 Esta variable será reemplazada automáticamente en build.sh con la URL real
let GOOGLE_SCRIPT_URL = "__INJECT_GOOGLE_SCRIPT_URL__";

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

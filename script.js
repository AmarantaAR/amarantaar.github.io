// script.js

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('collapsed');
    document.getElementById('main').classList.toggle('collapsed');
  }
  
  function openModal(title, description, imageUrl) {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-description').innerText = description;
    document.getElementById('modal-image').src = imageUrl;
    document.getElementById('purchase-form').dataset.artTitle = title;
  }
  
  function closeModal(event) {
    if (event.target.classList.contains('modal') || event.target.classList.contains('modal-close')) {
      document.getElementById('modal').style.display = 'none';
    }
  }
  
  let GOOGLE_SCRIPT_URL = "";
  
  // Cargar la URL desde el archivo desencriptado env.json
  fetch('env.json')
    .then(res => res.json())
    .then(config => {
      GOOGLE_SCRIPT_URL = config.GOOGLE_SCRIPT_URL;
    })
    .catch(err => {
      console.error("Error al cargar configuración:", err);
    });
  
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
  
    // 2. Guardar en Google Sheets con clave de verificación
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
        name: "amaranta2003"
      })
    });
  
    form.reset();
    document.getElementById('modal').style.display = 'none';
  });
  
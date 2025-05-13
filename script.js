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
  
  document.getElementById("purchase-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const form = e.target;
    const nombre = form.nombre.value.trim();
    const correo = form.correo.value.trim();
    const telefono = form.telefono.value.trim();
    const instagram = form.instagram.value.trim();
    const obra = form.dataset.artTitle;
  
    // 1. ENVIAR MENSAJE A WHATSAPP
    const msg = `Hola, soy ${nombre}. Estoy interesad@ en la obra "${obra}".\n\nMis datos son:\n📧 ${correo}\n📱 ${telefono}\n📷 IG: ${instagram || 'No registrado'}`;
    const whatsappURL = `https://wa.me/573001112233?text=${encodeURIComponent(msg)}`;
    window.open(whatsappURL, '_blank');
  
    // 2. GUARDAR EN GOOGLE SHEETS
    fetch("https://script.google.com/macros/s/TU_WEBAPP_URL/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre, correo, telefono, instagram, obra })
    });
  
    form.reset();
    document.getElementById('modal').style.display = 'none';
  });
  
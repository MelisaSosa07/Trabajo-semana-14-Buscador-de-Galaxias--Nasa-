document.getElementById('btnBuscar').addEventListener('click', () => {
    const query = document.getElementById('inputBuscar').value;
    if (query) {
      buscarImagenesNASA(query);
    } else {
      alert('Por favor ingrese un término de búsqueda.');
    }
  });
  async function buscarImagenesNASA(query) {
    const url = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      mostrarResultados(data.collection.items);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }
  function mostrarResultados(items) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = ''; 
    items.forEach((item) => {
      const { title, description, date_created } = item.data[0];
      const imageUrl = item.links[0].href;
  
      //  estructura de la tarjeta 
      const card = document.createElement('div');
      card.className = 'col-md-4 mb-4';
  
      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${imageUrl}" class="card-img-top" alt="${title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${title}</h5>
            <p class="card-text overflow-auto" style="height: 100px;">${description || 'Sin descripción disponible.'}</p>
            <p class="text-muted mt-auto">Fecha: ${new Date(date_created).toLocaleDateString()}</p>
          </div>
        </div>
      `;
      contenedor.appendChild(card);
    });
  }
  
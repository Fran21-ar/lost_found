window.onload = function() {
    // Petición al backend para los objetos perdidos
    fetch('./obj_perdido') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json(); 
        })
        .then(data => {
            const listaPerdidos = document.getElementById('lista-perdidos');
            listaPerdidos.innerHTML = '';
            
            data.forEach(objeto => {
                const li = document.createElement('li');
                li.textContent = `Tipo: ${objeto.tipo}, Descripción: ${objeto.descripcion}, Contacto: ${objeto.numero_contacto}`;
                listaPerdidos.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al cargar objetos perdidos:', error);
        });

    // Petición al backend para los objetos encontrados
    fetch('/obj_encontrado') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json(); 
        })
        .then(data => {
            const listaEncontrados = document.getElementById('lista-encontrados');
            listaEncontrados.innerHTML = ''; 

            data.forEach(objeto => {
                const li = document.createElement('li');
                li.textContent = `Tipo: ${objeto.tipo}, Descripción: ${objeto.descripcion}, Contacto: ${objeto.numero_contacto}`;
                listaEncontrados.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al cargar objetos encontrados:', error);
        });
};

function searchFunction() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let items = document.getElementById('li');
    
    for (let i = 0; i < items.length; i++) {
        let item = items[i].innerText.toLowerCase();
        if (item.includes(input)) {
            items[i].classList.remove('hidden');
        } else {
            items[i].classList.add('hidden');
        }
    }
}

function searchFunction2() {
    let input = document.getElementById('searchInput2').value.toLowerCase();
    let items = document.getElementById('li');

    for (let i = 0; i < items.length; i++) {
        let item = items[i].innerText.toLowerCase();
        if (item.includes(input)) {
            items[i].classList.remove('hidden');
        } else {
            items[i].classList.add('hidden');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchObjetosPerdidos();
    fetchObjetosEncontrados();
});

function fetchObjetosPerdidos() {
    fetch('/api/perdidos')
        .then(response => response.json())
        .then(data => {
            const listaPerdidos = document.getElementById('lista-perdidos');
            listaPerdidos.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos
            data.forEach(objeto => {
                const li = document.createElement('li');
                li.textContent = objeto.descripcion; // Ajusta esto según el campo que quieras mostrar
                listaPerdidos.appendChild(li);
            });
        })
        .catch(error => console.error('Error al obtener objetos perdidos:', error));
}

function fetchObjetosEncontrados() {
    fetch('/api/encontrados')
        .then(response => response.json())
        .then(data => {
            const listaEncontrados = document.getElementById('lista-encontrados');
            listaEncontrados.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos
            data.forEach(objeto => {
                const li = document.createElement('li');
                li.textContent = objeto.descripcion; // Ajusta esto según el campo que quieras mostrar
                listaEncontrados.appendChild(li);
            });
        })
        .catch(error => console.error('Error al obtener objetos encontrados:', error));
}
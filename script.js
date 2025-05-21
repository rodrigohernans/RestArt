const hamburgerMenu = document.querySelector('.hamburger-menu');
const menuPrincipal = document.getElementById('menu-principal');
const overlay = document.querySelector('.overlay');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('is-active');
    menuPrincipal.classList.toggle('is-open');
    overlay.classList.toggle('is-open');
    const isExpanded = hamburgerMenu.classList.contains('is-active');
    hamburgerMenu.setAttribute('aria-expanded', isExpanded);
});

overlay.addEventListener('click', () => {
    hamburgerMenu.classList.remove('is-active');
    menuPrincipal.classList.remove('is-open');
    overlay.classList.remove('is-open');
    hamburgerMenu.setAttribute('aria-expanded', false);
});


// usar fetch para llamar a mis productos json

function visualizarProductos() {
    fetch("productos.json").then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status : ${response.status}`);
        }
        return response.json();
    })
        .then(data => {
            console.log(data);
            renderizarCards(data)
        })
        .catch(error => {
            console.error("Error al cargar o procesar los productos", error)
        });
}

visualizarProductos()

// realizar cards 


function renderizarCards(productos) {
    let cardsContainer = document.getElementById("container-cards");
    if (!cardsContainer) {
        console.warn("El contenedor principal no se encontró: #container-cards");
        return;
    }
    cardsContainer.innerHTML = "";
    productos.forEach(producto => {
        let card = document.createElement("div");
        card.className = "card";

        // Genera todas las etiquetas <img> para el scroll snap
        let allImagesHtml = '';
        producto.imagenes.forEach(imagenUrl => {
            // Cada imagen individual lleva la clase 'img-product-scroll-item'
            allImagesHtml += `<img src="${imagenUrl}" alt="${producto.nombre}" class="img-product-scroll-item"/>`;
        });

        card.innerHTML = `
                <div class="card-images-scroll"> ${allImagesHtml}
                </div>
                
                <p class="precio-original"> Precio antes: $${producto.precio_original} </p>
                <p class="precio-descuento"> Precio ahora: $${producto.precio_descuento} </p>
                <p class="talles"> Talles Disponibles: "${producto.tallas_disponibles}" </p>
            `;
        cardsContainer.appendChild(card);
    });
}






//Hacer scroll para la sección de ver zapatillas



document.addEventListener('DOMContentLoaded', function () {
    const botonExplorar = document.querySelector('.explorar');
    const enlaceProductos = document.querySelector('.scroll-producto');
    const seccionDestino = document.getElementById('container-cards');

    function scrollToProductos() {
        if (seccionDestino) {
            seccionDestino.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            console.warn("Error: La sección de destino 'container-cards' no fue encontrada.");
        }
    }

    if (botonExplorar) {
        botonExplorar.addEventListener('click', scrollToProductos);
    } else {
        console.warn("Advertencia: El botón con la clase 'explorar' no fue encontrado.");
    }

    if (enlaceProductos) {
        enlaceProductos.addEventListener('click', function (event) {
            event.preventDefault();
            scrollToProductos();
        });
    } else {
        console.warn("Advertencia: El enlace con la clase 'scroll-producto' no fue encontrado.");
    }
});
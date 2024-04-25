// 6 Aqui vamos a crear un array que nos recolecte los productos  adonde hacemos click
let carritoDeCompra = [];

// 1 definir el area que contiene los productos en variable
const inventario = document.querySelector("#lista-inventario")

// 7.2 Creamos selector
const contenidoCarrito = document.querySelector("#tabla-carrito tbody")

// 8.2 creamos una variable que este enlazada con el boton que tiene como id variar-carrito-btn en html
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito-btn")

// 10.1 Aqui definimos un area donde se detectara el click para eliminar
const cuerpoCarrito = document.querySelector("#carrito");

// 10.2 Aqui estamos definiendo el evento que click que al detectarse detonara el evento eliminiarProducto
cuerpoCarrito.addEventListener("click", eliminarProducto)

// 2 a esta area se asigna un event listener del listado
inventario.addEventListener("click", agregarAlCarrito)

// 8.3 Creamos evento listener que ejecute la funcion limpiar carrito
vaciarCarritoBtn.addEventListener("click", limpiarCarrito)

// 10 Aqui definire una funcion para irlos eleminando del carrito con la X
function eliminarProducto(evt){ 
    evt.preventDefault(); 
    if(evt.target.classList.contains("quitar-producto")){ 
        const producto = evt.target.parentElement.parentElement; 
        const productoId = producto.querySelector("a").getAttribute("data-id"); 

        carritoDeCompra = carritoDeCompra.filter(producto => producto.id !== productoId) // dejo todos los elementos en el carrito salvo el que coincide con el seleccionado
        carritoSitio();
    }
}

// 3 Aqui vamos a crear una funcion para definir los clicks a contar
function agregarAlCarrito(evt) {
    evt.preventDefault() // esto previene que al hacer clic se vaya a otra pagina
    if(evt.target.classList.contains("comprar-producto")) { // si el objetivo del click e contiene la clase "comprar-producto" entonces lo cuenta
        const producto = evt.target.parentElement.parentElement.parentElement; 
        //Al cumplirse, regresara como variable producto el contenedor padre que tiene ese elemento, en este caso el boton y su elemento padre es el DIV textproduct

    leerDatosMinisplit(producto);

    }
}

// 5 Aqui vamos a crear la funcion de arriba (4) para traer los datos
function leerDatosMinisplit(producto) {
    const infoEquipo = { // Aqui estoy definiendo la informacion que recopilare como objeto
        imagen: producto.querySelector(".minisplit-foto").src, // Aqui le digo que traiga la imagen
        modelo: producto.querySelector("h4").textContent, // Aqui le digo traeme el texto del h4 
        marca: producto.querySelector(".marcaOculto").textContent, // aqui le digo traeme el texto del elemento con clase .precio
        precio: producto.querySelector(".precio").textContent, // aqui le digo traeme el texto del elemento con clase .precio
        id: producto.querySelector("a").getAttribute("data-id"), // aqui le digo traeme el ATRIBUTO del elemento a, link
        cantidad: 1
    }

    if(carritoDeCompra.some( producto => producto.id === infoEquipo.id)){ 
        const productos = carritoDeCompra.map( producto => { 
            if(producto.id === infoEquipo.id){ 
                let cantidad = parseInt(producto.cantidad); 
                cantidad +=1; 
                producto.cantidad = cantidad; 
                return producto 
            }else {
                return producto 
            }
        })
        carritoDeCompra = productos.slice();
    } else {
        carritoDeCompra.push(infoEquipo) 
    }

    carritoSitio()
} 

// 7 Aqui estoy creando una funcion que me permita ir recopilando la informacion en el array y crear los elementos en el menu de carrito
function carritoSitio() {
    limpiarCarrito();
    carritoDeCompra.forEach( producto => {
        const fila = document.createElement("tr"); // Aqui le digo que cree una fila en la tabla
        // Ahora debo indicar los elementos html que va a ingresar
        fila.innerHTML = ` 
        <td>
            <img src="${producto.imagen}" width="100"/>
        </td>
        <td>${producto.marca}</td>
        <td>${producto.modelo}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>
            <a href="#" class="quitar-producto" data-id="${producto.id}">X</a>
        </td>
    `;
    // Aqui le estoy indicando EN QUE ELEMENTO va a ingresarlos, en este caso la tala del menu
    contenidoCarrito.appendChild(fila);
    } )

}

// 8 Ahora crearemos una funcion para elimnar productos 
function limpiarCarrito(){ /* evt */
    /* evt.preventDefault() 9.1 eliminamos este poreventdefault, no es necesario*/
    while(contenidoCarrito.firstChild) {
        contenidoCarrito.removeChild(contenidoCarrito.firstChild)
    }
} 






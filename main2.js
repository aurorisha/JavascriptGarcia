// Array para el carrito de compras
const carrito = []

// 3 Aqui Ordenar productos de menor a mayor y luego pasa a mostrar listado (abajo
const ordenMenosAManos = () => {
    productosOferta.sort((me, ma) => me.precio - ma.precio)
    mostrarListaOrdenada()
};

const ordenMasAMenos = () => {
    productosOferta.sort((me, ma) => ma.precio - me.precio)
    mostrarListaOrdenada()
};
// Ordena los producots
const mostrarListaOrdenada = () => { // 4 Aqui muestra el listado
    const listaDeProductos = productosOferta.map(producto => {
        return '▸ '+producto.linea+' marca '+producto.marca+' $'+producto.precio
    })
    alert('Lista de ofertas:'+'\n\n'+listaDeProductos.join('\n'))
    comprarProductos(listaDeProductos)
};
// AQui inicia el codigo que tengo --------------------------
const comprarProductos = (listaDeProductos) => { // 5 Aqui pregunta al usuario que productos comprar
    let productoNombre = ''
    let productoCantidad = 0
    let otroProducto = false

    do {
        productoNombre = prompt('¿Qué producto desea comprar?'+'\n\n'+listaDeProductos.join('\n'))
        productoCantidad = parseInt(prompt('¿Cuántos queres comprar?'))

        const producto = productosOferta.find(producto => producto.linea.toLowerCase() === productoNombre.toLowerCase())

        if (producto) {
            agregarAlCarrito(producto, producto.codigo, productoCantidad)
        } else {
            alert('El producto no se encuentra en el catálogo!')
        }

        otroProducto = confirm('Desea agregar otro producto?')
    } while (otroProducto); // 6 este bucle pregunta por mas productos

    confirmarCompra()
};

const agregarAlCarrito = (producto, productoId, productoCantidad) => {
    const productoRepetido = carrito.find(producto => producto.id === productoId)
    if (!productoRepetido) {
        producto.cantidad += productoCantidad
        carrito.push(producto)
    } else {
        productoRepetido.cantidad += productoCantidad
    }
};

const eliminarProductoCarrito = (nombreProductoAEliminar) => {
    carrito.forEach((producto, index) => {
        if (producto.linea.toLowerCase() === nombreProductoAEliminar.toLowerCase()) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(index, 1)
            }
        }
    })
    confirmarCompra()
};

const confirmarCompra = () => {
    const listaProductos = carrito.map(producto => {
        return '- '+producto.linea+' | Cantidad: '+producto.cantidad
    }) 

    const isCheckout = confirm('Checkout: ' // 7 Aqui se hace un resumen de lo que se va a comprar
        +'\n\n'+listaProductos.join('\n')
        +'\n\nPara continuar presione "Aceptar" sino "Cancelar" para eliminar un producto del carrito'
    )

    if (isCheckout) {
        finalizarCompra(listaProductos)
    } else {
        const nombreProductoAEliminar = prompt('Ingrese el nombre del producto a eliminar:')
        eliminarProductoCarrito(nombreProductoAEliminar)
    }
};

const finalizarCompra = (listaProductos) => { // 8 Aqui se termina el proceso
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const precioTotal = carrito.reduce((acc, item) => acc + (item.cantidad * item.precio), 0)
    alert('Detalle de su compra: '
        +'\n\n'+listaProductos.join('\n')
        +'\n\nTotal de productos: '+cantidadTotal
        +'\n\nEl total de su compra es: '+precioTotal
    )

    const solicitaInstalacion = confirm("¿Requiere Servicio de Instalacion?");

    if (solicitaInstalacion) {
        calcularInstalacion(cantidadTotal)
    } 
    const solicitaEnvioADomicilio = confirm("¿Necesitas envio a domicilio?");

    if (solicitaEnvioADomicilio) {
        calcularEnvio(precioTotal)
    } else {
        alert("El pedido sera recogido en sucursal a partir de mañana. ¡Gracias por tu preferencia!");
        } 
};

function calcularInstalacion(cantidadTotal) { 
    
    if (cantidadTotal >= 5) { // Si la cantidad final de los equipos es igual o mayor a 5 se multiplicara cantidad por 550
        costoInstalacion = cantidadTotal*550;
        alert("El costo de instalacion total es $"+costoInstalacion);
    } else if (cantidadTotal <= 4 && cantidadTotal !== 0) { // Si la cantidad final de los equipos es igual o menor a 4 se multiplicara cantidad por 1100
        costoInstalacion = cantidadTotal*1100;
        alert("El costo de instalacion total es $"+costoInstalacion);
    } else { // No se cobra instalacionf
        alert("No se cobrara servicio de instalación. El total de tu compra es $"+precioTotal);
    } 
}

function calcularEnvio(precioTotal) {

    if (precioTotal >= 12000) {
        alert("¡Tu compra cuenta con envio gratis y llegara a tu domicilio en 3 dias! ¡Gracias por tu preferencia!");
    } else if (precioTotal <= 11999) {
        alert("El costo de envio es de $850 pagados a contraentrega y llegara a tu domicilio en 3 dias ¡Gracias por tu preferncia!");
    } 

}

const comprar = () => { // 2 Ordena precios y dirije a ProductosBaratos (Inicio del codigo)
    const productosBaratos = confirm('¿Querés ordenar la lista de productos del mas barato al mas caro?')

    if (productosBaratos) {
        ordenMenosAManos()
    } else {
        ordenMasAMenos()
    }
};


comprar()  // 1 Inicia proceso y dirije a ordenar lista (arriba )
// Variables globales para usar en las otras funciones
let cantidad = 0;
let totalPedido = 0;

// 1 - Inicia funcion principal de comprar los productos
const comprarEquipos = () => {  
    // Flujo principal
    let equipo = '';
    let precio = 0;
    let seguirComprando = false;

    // 1.1 ingreso de pedido en promt
do {
    equipo = prompt("¿Que minisplit buscas:? inverter, convencional o Alpha","Ej. convencional").toLowerCase();
    cantidad = parseInt(prompt ("¿Cuantos equipos necesitas?", "Ej. 2"));

    const cantidadComprobada = comprobarCantidad(cantidad) //  1.4 Aqui estamos llamando a la funcion comprobarCantidad de 
    //la línea 46 con el parametro Cantidad y valor que nos regresa se almazena en la variable cantidadComprobada

    switch (equipo) { // 1.2 Opciones de minisplit
        case "convencional":
            precio = 4500;
            break;
        case "inverter":
            precio = 7500;
            break;
        case "alpha":
            precio = 12000;
            break;
        default:
        alert("Ingresa una opcion de producto valida");
            precio = 0;
            cantidad = 0;
            }

    // 1.5 Variable cuyo valor es igual al resultado de multiplicar precio con Cantidad
    totalPedido += precio * cantidadComprobada;

    // Seguimietno de compra o finalizar compra
    seguirComprando = confirm("¿Deseas seguir comprando?"); // Esto regresa un valor booleano true para ok y false para cancelar, recordemos que si while de SeguirCompranod es true, todo el ciclo se repite
    
    }  while (seguirComprando)

    const totalConInstalacion = calcularInstalacion(totalPedido); // 2.4 Aqui estamos llamando la funcion calcularInstalacion y estableciendo el totalPedido como el valor a trabajar
    const totalConEnvio = calcularEnvio(totalConInstalacion);
    const ticketFinal = totalConInstalacion+totalConEnvio;

    return ticketFinal;
};

///---------------------- funciones complementarias

// 1.3 Esta funcion nos permitira validar los datos ingresados en CANTIDAD en la línea 14 (La llamamos dentro de la funcion para poder sacar la variable del bloque)
const comprobarCantidad = (cantidad) => { //El cantidad de aqui es un parametro
    while (Number.isNaN(cantidad) || cantidad === 0) { // Usa variable de línea 14, scope bloque
        if (cantidad !== 0) {
            alert("Debes especificar una cantidad.")
        } else {
            alert("Debes pedir una cantidad superior a 0.")
        }
        cantidad = parseInt(prompt("¿Cuantos equipos necesitas?", "Ej. 2"));
    }

    return cantidad; // Aqui le estoy diciendo que regrese el resultado de esta funcion a cantidad como parametro
}

// 2 Esta funcion nos permitira calcular el costo de instalacion mediante condicionales

const calcularInstalacion = (precioInstalacion) => { 
    let cantidadMinisplits = comprobarCantidad(cantidad++);
    let costoInstalacion = 0;
    let preguntaInstalacion = confirm("¿Necesitas servicio de instalacion?"); // 2.1 Aqui le preguntaremos al usuario si quiere envio y ese valor se aloja en la variante solicitaEnvio como true si da OK
    
    if (preguntaInstalacion && cantidadMinisplits >= 5) { // Si la cantidad final de los equipos es igual o mayor a 5 se multiplicara cantidad por 550
        costoInstalacion = cantidadMinisplits*550;
        alert("El costo de instalacion total es $"+costoInstalacion+" El total de tu compra es $"+(costoInstalacion+precioInstalacion));
    } else if (preguntaInstalacion && cantidadMinisplits <= 4 && cantidadMinisplits !== 0) { // Si la cantidad final de los equipos es igual o menor a 4 se multiplicara cantidad por 1100
        costoInstalacion = cantidadMinisplits*1100;
        alert("El costo de instalacion total es $"+costoInstalacion+" El total de tu compra es $"+(costoInstalacion+precioInstalacion));
    } else { // No se cobra instalacionf
        alert("No se cobrara servicio de instalación. El total de tu compra es $"+(costoInstalacion+precioInstalacion));
    }
    return precioInstalacion;

    // 3 Esta funcion nos permitira calcular el costo de envio y arrojar final total

}

function calcularEnvio(precioEnvio) {
    let solicitaEnvioADomicilio = false;

    solicitaEnvioADomicilio = confirm("¿Necesitas envio a domicilio?");

    if (solicitaEnvioADomicilio && precioEnvio >= 12000) {
        alert("¡Tu compra cuenta con envio gratis y llegara a tu domicilio en 3 dias! ¡Gracias por tu preferencia!");
    } else if (solicitaEnvioADomicilio && precioEnvio <= 11999) {
        precioEnvio += 850;
        alert("El costo de envio es de $850 pagados a contraentrega y llegara a tu domicilio en 3 dias ¡Gracias por tu preferncia!");
    } else {
        alert("El pedido sera recogido en sucursal a partir de mañana. ¡Gracias por tu preferncia");
    }

    return precioEnvio;
}

///---------------------- Invocacion de funciones

comprarEquipos(); // Aqui estoy llamando  la funcion de comprar para que se ejectue

class productoMinisplit {
    constructor(c, l, m, p) {
        this.codigo = c;
        this.linea = l;
        this.marca = m;
        this.precio = p;
        this.cantidad = 0;
    }

    sumarIva() {
        this.precio = this.precio+(this.precio*0.16)
    }
}

const productosOferta = [];

const ms1 = new productoMinisplit(1,"Eficiente","Aurus",5500)
const ms2 = new productoMinisplit(2,"Inverter","Aurus",7500)
const ms3 = new productoMinisplit(3,"Inverter pro","Aurus",13000)
const ms4 = new productoMinisplit(4,"Convencional","AUX",6500)
const ms5 = new productoMinisplit(5,"Inverter","AUX",9000)
const ms6 = new productoMinisplit(6,"Alpha","AUX",14500)


productosOferta.push(ms1, ms2, ms3, ms4, ms5, ms6);

for(const minisplit of productosOferta) {
    minisplit.sumarIva()
}

console.log(productosOferta);
class Persona {
    constructor(nombre, edad){
        this.nombre = nombre;
        this.edad = edad;
    }

    //metodos

    saltar(){
        console.log(`${this.nombre} esta saltando`)
    }

}

let ciudadano = new Persona("Manuel", 23);
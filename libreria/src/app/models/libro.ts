export class libro {
    _id?: number;
    nombre: string; //el mismo del video
    genero: string; //categoria
    autor: string;//ubicacion
    paginas: number; //precio

    constructor(nombre: string, genero: string, autor: string, paginas: number){
        this.nombre = nombre;
        this.genero = genero;
        this.autor = autor;
        this.paginas = paginas;
    }
}
import { Song, songs } from './songs';

class Lista {

    constructor(id, name, description, userId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.userId = userId;
        this.songs = canciones;

    }
}
let canciones = [
    new Song(1, 'Believer', 'Imagine Dragon', 'Album 2017', 2017),
    new Song(2, 'Thunder', 'Imagine Dragon', 'Album 2017', 2017),
]
let listas = [
    new Lista(1, 'moderna', 'Música moderna',1 , canciones),
    new Lista(2, 'medieval', 'Música medieval', 2, canciones),
]

const indexOfPorId = (id) => {
    let posicionEncontrado = -1;
    for (let i = 0; i < listas.length && posicionEncontrado == -1; i++) {
        if (listas[i].id == id)
            posicionEncontrado = i;
    }
    return posicionEncontrado;
}

const listaRepository = {

    findAll() {
        return listas;
    },
    findById(id) {
        const posicion = indexOfPorId(id);
        return posicion == -1 ? undefined : listas[posicion];
     },
 

     create(newLista) {
         const lastId = listas.length == 0 ? 0 : listas[listas.length-1].id;
         const newId = lastId + 1;
         const result = new Lista(newId, newLista.name, newLista.description, newLista.userId, newLista.songs);
         listas.push(result);
         return result;
     },

     updateById(id, modifiedLista) {
         const posicionEncontrado = indexOfPorId(id)
         if (posicionEncontrado != -1) {
            listas[posicionEncontrado].name = modifiedLista.name;
         }
         return posicionEncontrado != -1 ? listas[posicionEncontrado] : undefined;
     },
 
     delete(id) {
         const posicionEncontrado = indexOfPorId(id);
         if (posicionEncontrado != -1)
             listas.splice(posicionEncontrado, 1);
     }

}    

export  {
    Lista,
    listaRepository
}

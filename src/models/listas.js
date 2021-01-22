import { songs } from './songs'
class Lista {

    constructor(id, name, description, userId, songs) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.userId = userId;
        this.songs = songs;

    }
}
let listas = [
    new Lista(1, 'moderna', 'Música moderna',1 , songs),
    new Lista(2, 'medieval', 'Música medieval', 2, songs),
]

const listaRepository = {

    findAll() {
        return listas;
    },
    findById(id) {
        let result = listas.filter(lista => lista.id == id);
        return Array.isArray(result) && result.length > 0 ? result[0] : undefined;
    }

}    

export  {
    Lista,
    listaRepository
}

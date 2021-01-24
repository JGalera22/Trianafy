class Song {

    constructor(id, title, artist, album, year) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.year = year;

    }
}
let songs = [
    new Song(1, 'Believer', 'Imagine Dragon', 'Album 2017', 2017),
    new Song(2, 'Thunder', 'Imagine Dragon', 'Album 2017', 2017),
]

const indexOfPorId = (id) => {
    let posicionEncontrado = -1;
    for (let i = 0; i < songs.length && posicionEncontrado == -1; i++) {
        if (songs[i].id == id)
            posicionEncontrado = i;
    }
    return posicionEncontrado;
}

const songRepository = {

    findAll() {
        return songs;
    },
    // Método que nos va a permitir obtener la posición de una
    // canción dentro de la colección en base a su ID
    // Devuelve la posición si la encuentra, y -1 si no la encuentra.
    findById(id) {
       const posicion = indexOfPorId(id);
       return posicion == -1 ? undefined : songs[posicion];
    },

    // Inserta una nueva canción y devuelve la canción insertada
    create(newSong) {
        const lastId = songs.length == 0 ? 0 : songs[songs.length-1].id;
        const newId = lastId + 1;
        const result = new Song(newId, newSong.tittle, newSong.artist, newSong.album, newSong.year);
        songs.push(result);
        return result;
    },
    // Actualiza una canción identificada por su ID
    updateById(id, modifiedSong) {
        const posicionEncontrado = indexOfPorId(id)
        if (posicionEncontrado != -1) {
            songs[posicionEncontrado].title = modifiedSong.title;
        }
        return posicionEncontrado != -1 ? songs[posicionEncontrado] : undefined;
    },

    // Borrar una canción por su ID
    delete(id) {
        const posicionEncontrado = indexOfPorId(id);
        if (posicionEncontrado != -1)
            songs.splice(posicionEncontrado, 1);
    }

}


export  {
    Song,
    songRepository
}

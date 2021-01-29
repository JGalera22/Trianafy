import 'dotenv/config';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const songSchema = new Schema({
    title: String,
    artist: String,
    album: String,
    year: String,
    _id: Schema.Types.ObjectId,
});

const Song = mongoose.model('Song', songSchema);

/*
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
*/
const songRepository = {

    async findAll() {
        const result =  await Song.find({}).exec();
        return result;
    },
    // Método que nos va a permitir obtener la posición de una
    // canción dentro de la colección en base a su ID
    // Devuelve la posición si la encuentra, y -1 si no la encuentra.

    async findById(id) {
        const result = await Song.findById(id).exec();
        return result != null ? result : undefined;
     },

    // Inserta una nueva canción y devuelve la canción insertada

    async create(newSong) {
        const theSong = new Song({
            title : newSong.title,
            artist: newSong.artist,
            album:newSong.album,
            year: newSong.year 
        });
        const result = await theSong.save();
        return result;
    },
    // Actualiza una canción identificada por su ID

    async updateById(id, modifiedSong) {
        const songSaved = await Song.findById(id);

        if (songSaved != null) {
            return await Object.assign(songSaved, modifiedSong).save();
        } else
            return undefined;
    },

    // Borrar una canción por su ID
    async delete(id) {
        await Song.findByIdAndRemove(id).exec();
    }

}


export  {
    Song,
    songRepository
}

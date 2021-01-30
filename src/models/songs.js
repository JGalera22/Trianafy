import 'dotenv/config';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const songSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    artist: String,
    album: String,
    year: String
    
});

const Song = mongoose.model('Song', songSchema);

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
            _id : new mongoose.Types.ObjectId(),
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

    // Versión del anterior
    update(modifiedSong) {
        return this.update(modifiedSong.id, modifiedSong);
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

import 'dotenv/config';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const listaSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    description: String,
    
    user:{
        type: mongoose.ObjectId,
        ref: 'User'
    },
    songs: [{
        type: mongoose.ObjectId,
        ref: 'Song'
    }]
});

const Lista = mongoose.model('Lista', listaSchema);



const listaRepository = {


    async findAll() {
        return await Lista
            .find()
            .populate('users', 'username')
            .populate('songs', 'title')
            .exec();
    },

     async findById(_id) {
        return await Lista
            .findById(_id)
            .populate('users')
            .populate('songs')
            .exec();
    },
 

    async create(newLista) {
         const theLista = new Lista({
            _id : new mongoose.Types.ObjectId(),
            name : newLista.name,
            description: newLista.description,
            //user_id: newLista.user_id,
            user: newLista.user,
            songs: newLista.songs
        });   
        const result = await theLista.save();
        return result;
     },

    async updateById(id, modifiedLista) {
        const listaSaved = await Lista.findById(id);

        if (listaSaved != null) {
            return await Object.assign(listaSaved, modifiedLista).save();
        } else
            return undefined;


    },

    update(modifiedLista) {
        return this.update(modifiedLista.id, modifiedLista);
    }, 

    async delete(id) {
        await Lista.findByIdAndRemove(id).exec();
    }

}    

export  {
    Lista,
    listaRepository
}

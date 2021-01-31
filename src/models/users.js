import 'dotenv/config';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: String,
    fullname: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

/**
 * Función que comprueba si un email ya está
 * definido como el email de un usuario en el repositorio
 */
const emailExists = async (email) => {
    const result = await User.countDocuments({ email: email }).exec();
    return result > 0;

}

const usernameExists = async (username) => {
    const result = await User.countDocuments({ username: username }).exec();
    return result > 0;
}

const userRepository = {

    // Devuelve todos los usuarios del repositorio
    async findAll() {
        const result =  await User.find({}).exec();
        return result;
    },
    // Devuelve un usuario por su Id
    async findById(_id) {
       const result = await User.findById(_id).exec();
       return result != null ? result : undefined;
    },

    //Encuentra un usuario con su username
    
    async findByUsername(username) {
        let result = await User.find(user => user.username == username);
        return result != null ? result : undefined;   
     },
     
    // Inserta un nuevo usuario y devuelve el usuario insertado
    async create(newUser) {
        const theUser = new User({
            _id : new mongoose.Types.ObjectId(),
            username : newUser.username,
            fullname: newUser.fullname,
            email: newUser.email
        });
        const result = await theUser.save();
        return result; 

    },
    // Actualiza un usuario identificado por su ID
    async updateById(_id, modifiedUser) {
        const userSaved = await User.findById(_id);

        if (userSaved != null) {
            return await Object.assign(userSaved, modifiedUser).save();
        } else
            return undefined;


    },
    // Versión del anterior, en la que el ID va dentro del objeto usuario
    update(modifiedUser) {
        return this.update(modifiedUser.id, modifiedUser);
    }, 

    async delete(_id) {
        await User.findByIdAndRemove(_id).exec();
    }

}


export  {
    User,
    userRepository,
    emailExists,
    usernameExists
}
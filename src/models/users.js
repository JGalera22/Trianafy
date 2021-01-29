import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    fullname: String,
    email: String,
    password: String,
    _id: Schema.Types.ObjectId,
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

/**
 * Función que comprueba si un username ya está
 * definido como el username de un usuario en el repositorio
 */
/*
const usernameExists = (username) => {
    let usernames = users.map(user => user.username);
    return usernames.includes(username);
}*/

const userRepository = {

    // Devuelve todos los usuarios del repositorio
    async findAll() {
        const result =  await User.find({}).exec();
        return result;
    },
    // Devuelve un usuario por su Id
    async findById(id) {
       const result = await User.findById(id).exec();
       return result != null ? result : undefined;
    },
    // Inserta un nuevo usuario y devuelve el usuario insertado
    async create(newUser) {
        const theUser = new User({
            username : newUser.username,
            email: newUser.email
        });
        const result = await theUser.save();
        return result; // Posiblemente aquí nos interese implementar un DTO

    },
    // Actualiza un usuario identificado por su ID
    async updateById(id, modifiedUser) {
        const userSaved = await User.findById(id);

        if (userSaved != null) {
            return await Object.assign(userSaved, modifiedUser).save();
        } else
            return undefined;


    },
    // Versión del anterior, en la que el ID va dentro del objeto usuario
    update(modifiedUser) {
        return this.update(modifiedUser.id, modifiedUser);
    }, 

    async delete(id) {
        await User.findByIdAndRemove(id).exec();
    }

}


export  {
    User,
    userRepository,
    emailExists
}
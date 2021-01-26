import "dotenv/config";
import bcrypt from 'bcryptjs';

class User {

    constructor(id = 0, username, fullname, email, password) {
        this.id = id;
        this.username = username;
        this.fullname = fullname;
        this.email = email;
        this.password = password;
    }


}

const password = bcrypt.hashSync('12345678', parseInt(process.env.BCRYPT_ROUNDS));

let users = [
    new User(1, 'Luismi', 'Luis Miguel López', 'luismi@salesianos.edu', password),
    new User(2, 'Angel', 'Ángel Naranjo', 'angel@salesianos.edu', password)
];

const indexOfPorId = (id) => {
    let posicionEncontrado = -1;
    for (let i = 0; i < users.length && posicionEncontrado == -1; i++) {
        if (users[i].id == id)
            posicionEncontrado = i;
    }
    return posicionEncontrado;
}

//Función que comprueba si un username ya está definido como el username de un usuario en el repositorio
const usernameExists = (username) => {
    let usernames = users.map(user => user.username);
    return usernames.includes(username);
}

// Comprobar si un email ya está registrado como parte de un usuario
const emailExists = (email) => {
    let emails = users.map(user => user.email);
    return emails.includes(email);
}

const userRepository = {

    // Devuelve todos los usuarios del repositorio
    findAll() {
        return users;
    },
    // Devuelve un usuario por su Id
    findById(id) {
       const posicion = indexOfPorId(id);
       return posicion == -1 ? undefined : users[posicion];
    },
    // Inserta un nuevo usuario y devuelve el usuario insertado
    create(newUser) {
        const lastId = users.length == 0 ? 0 : users[users.length-1].id;
        const newId = lastId + 1;
        const result = new User(newId, newUser.username, newUser.fullname, newUser.email, newUser.password);
        users.push(result);
        return result;
    },
    // Actualiza un usuario identificado por su ID
    updateById(id, modifiedUser) {
        const posicionEncontrado = indexOfPorId(id)
        if (posicionEncontrado != -1) {
            users[posicionEncontrado].username = modifiedUser.username;
        }
        return posicionEncontrado != -1 ? users[posicionEncontrado] : undefined;
    },
    // Versión del anterior, en la que el ID va dentro del objeto usuario
    update(modifiedUser) {
        return this.update(modifiedUser.id, modifiedUser);
    }, 
    delete(id) {
        const posicionEncontrado = indexOfPorId(id);
        if (posicionEncontrado != -1)
            users.splice(posicionEncontrado, 1);
    },
    findByUsername(username) {
        let result = users.filter(user => user.username == username);
        return Array.isArray(result) && result.length > 0 ? result[0] : undefined;   
    }

}

export  {
    User,
    userRepository,
    emailExists,
    usernameExists
}
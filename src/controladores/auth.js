import 'dotenv/config';
import { User, userRepository } from '../models/users';
import bcrypt from 'bcryptjs';
import { JwtService } from '../services/jwt';



const AuthController = {

    register: async(req, res, next) => {
        let usuarioCreado = await userRepository.create(
            {
                username: req.body.username, 
                fullname: req.body.fullname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS))
            });
        res.status(201).json({
            username: usuarioCreado.username,
            email: usuarioCreado.email
        });
    },
    login: (req, res, next) => {

        const token = JwtService.sign(req.user);
        res.status(201).json({
            user: req.user,
            token: token
        });
    }
}

export {
    AuthController
}
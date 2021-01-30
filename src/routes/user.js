import { Router } from 'express';
import { UserController } from '../controladores/user';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion';
import { emailExists } from '../models/users';

const router = Router();

router.get('/', UserController.todosLosUsuarios)


router.get('/:id',[
    param('id').isString().withMessage('ID debe ser un string')
], validar,
UserController.usuarioPorId);

router.put('/:id',[
    param('id').isString().withMessage('ID debe ser un string')
], validar,
 UserController.editarUsuario);

router.delete('/:id',[
    param('id').isString().withMessage('ID debe ser un string')
], validar,
UserController.eliminarUsuario);

export default router;
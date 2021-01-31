import { Router } from 'express';
import { UserController } from '../controladores/user';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion';
//mport { emailExists } from '../models/users';
import { token } from '../services/passport/index';

const router = Router();

router.get('/', UserController.todosLosUsuarios)


router.get('/:id',[
    param('id').isString().withMessage('ID debe ser un string')
],token(),
 validar,
UserController.usuarioPorId);

router.put('/:id',[
    param('id').isString().withMessage('ID debe ser un string')
],token(),
validar,
UserController.editarUsuario);

router.delete('/:id',[
    param('id').isString().withMessage('ID debe ser un string')
],token(),
validar,
UserController.eliminarUsuario);

export default router;
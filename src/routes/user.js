import { Router } from 'express';
import { UserController } from '../controladores/user';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion';
import { emailExists } from '../models/users';

const router = Router();

router.get('/', UserController.todosLosUsuarios)

/*
router.get('/:id', [
    param('id').isInt().withMessage('ID debe ser un número entero')
],
validar,
UserController.usuarioPorId);

router.post('/', [
    body('username').isLength({min: 5}).withMessage('La longitud mínima del nombre de usuario son 5 caracteres'),
    body('fullname').exists(),
    body('password').isLength({min: 8}).withMessage('La longitud mínima de la contraseña son 8 caracteres'),
    body('email').isEmail().withMessage('El campo email debe ser un email válido').custom(async email => {
        if(await emailExists(email)) {
            throw new Error('El email ya está registrado. Proporcione un valor diferente');
        } else {  
            return true;
        }
    }),
    body('id').not().exists().withMessage('No es necesario que proporcione un ID; este se asignará automáticamente')
],
validar, 
UserController.nuevoUsuario);


router.put('/:id', [
    param('id').isInt().withMessage('ID debe ser un número entero')
],
validar,
UserController.editarUsuario);
*/
router.delete('/:id', [
    param('id').isInt().withMessage('ID debe ser un número entero')
],
validar,
UserController.eliminarUsuario);

export default router;
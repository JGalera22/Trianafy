import { Router } from 'express';
import { UserController } from '../controladores/user';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion'

const router = Router();

router.get('/', UserController.todosLosUsuarios)

router.get('/me', UserController.me);

//router.get('/:id', UserController.usuarioPorId);
router.get('/:id', [
    param('id').isInt().withMessage('ID debe ser un número entero')
],
validar,
UserController.usuarioPorId);

//router.post('/', UserController.nuevoUsuario);

/* Sin comprobar si tiene correo repetido
router.post('/', [
    body('username').isLength({min: 5}).withMessage('La longitud mínima del nombre de usuario son 5 caracteres'),
    body('email').isEmail().withMessage('El campo email debe ser un email válido'),
    body('id').not().exists().withMessage('No es necesario que proporcione un ID; este se asignará automáticamente')
],
validar, 
UserController.nuevoUsuario);
*/
router.post('/', [
    body('username').isLength({min: 5}).withMessage('La longitud mínima del nombre de usuario son 5 caracteres'),
    body('email').isEmail().withMessage('El campo email debe ser un email válido').custom(email => {
            if(emailExists(email)) {
                throw new Error('El email ya está registrado. Proporcione un valor diferente');
            } else {  
                return true;
            }
        }),
    body('id').not().exists().withMessage('No es necesario que proporcione un ID; este se asignará automáticamente')
],
validar, 
UserController.nuevoUsuario);

router.put('/:id', UserController.editarUsuario);

router.delete('/:id', UserController.eliminarUsuario);

export default router;
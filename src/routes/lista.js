import { Router } from 'express';
import {ListaController } from '../controladores/lista';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion'
import { token } from '../services/passport'

const router = Router();

router.get('/',token(), ListaController.todasLasListas)

router.get('/:id', [
    param('id').isString().withMessage('ID debe ser un string')
],
validar,token(),
ListaController.listaPorId);

router.get('/:id_lista/songs',[
    param('id_lista').isString().withMessage('ID de lista debe ser un string'),
    param('id_song').isString().withMessage('ID de canción debe ser un string')
],token(),
validar, ListaController.cancionesLista);

router.get('/:id_lista/songs/:id_song',[
    param('id_lista').isString().withMessage('ID de lista debe ser un string'),
    param('id_song').isString().withMessage('ID de canción debe ser un string')
],token(),
validar, ListaController.buscarCancionLista);


router.post('/', [
    body('name').exists().withMessage('Debe proporcionarse un nombre a la lista'),
    body('description').exists().withMessage('Debe proporcionarse una descripción'),
    //body('user').exists().withMessage('Debe proporcionarse una Id de usuario'),
    //body('user_id').not().exists().withMessage('No es necesario que proporcione un ID de usuario'),
    body('id').not().exists().withMessage('No es necesario que proporcione un ID; este se asignará automáticamente')
],token(),
validar, 
ListaController.nuevaLista);

router.post('/:id_lista/songs/:id_song',[
    param('id_lista').isString().withMessage('ID de lista debe ser un string'),
    param('id_song').isString().withMessage('ID de canción debe ser un string')
],token(),
validar, ListaController.addCancionLista);

router.put('/:id', [
    body('name').exists().withMessage('Debe proporcionarse un nombre a la lista.'),
    body('description').exists().withMessage('Debe proporcionarse una descripción.'),
    body('user_id').exists().withMessage('Debe proporcionarse una Id de ususario.'),
    body('id').not().exists().withMessage('No es necesario que proporcione un ID.')
],token(),
validar,
ListaController.editarLista);

router.delete('/:id', [
    param('id').isString().withMessage('ID debe ser un string')
],token(),
validar,
ListaController.eliminarLista);

router.delete('/:id_lista/songs/:id_song',[
    param('id').isString().withMessage('ID debe ser un string')
],token(),
validar, ListaController.delCancionLista);



export default router;
import { Router } from 'express';
import {SongController } from '../controladores/song';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion'
import { token } from '../services/passport/index'

const router = Router();

router.get('/', SongController.todasLasCanciones)

router.get('/:id', [
    param('id').isInt().withMessage('ID debe ser un número entero')
],
validar,
SongController.cancionPorId);

router.post('/', [
    body('title').exists().withMessage('Debe proporcionarse un título'),
    body('artist').exists().withMessage('Debe proporcionarse un nombre del artista'),
    body('album').exists().withMessage('Debe proporcionarse un nombre de album'),
    body('year').exists().withMessage('Debe proporcionarse un año'),
    body('id').not().exists().withMessage('No es necesario que proporcione un ID; este se asignará automáticamente')
],
validar, token(),
SongController.nuevaCancion);

router.put('/:id', [
    param('id').isInt().withMessage('ID debe ser un número entero')
],
validar,
SongController.editarCancion);

router.delete('/:id', [
    param('id').isInt().withMessage('ID debe ser un número entero')
],
validar,
SongController.eliminarCancion);



export default router;
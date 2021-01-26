import { Router } from 'express';
import {ListaController } from '../controladores/lista';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion'

const router = Router();

router.get('/', ListaController.todasLasListas)

router.get('/:id', [
    param('id').isInt().withMessage('ID debe ser un número entero')
],
validar,
ListaController.listaPorId);

router.post('/', [
    body('name').exists().withMessage('Debe proporcionarse un nombre a la lista'),
    body('description').isLength({min:20}).withMessage('La descripción debe tener mínimo 20 caracteres'),
    body('id').not().exists().withMessage('No es necesario que proporcione un ID; este se asignará automáticamente')
],
validar, 
ListaController.nuevaLista);

router.put('/:id', [
    param('id').isInt().withMessage('ID debe ser un número entero')
],
validar,
ListaController.editarLista);

router.delete('/:id', [
    param('id').isInt().withMessage('ID debe ser un número entero')
],
validar,
ListaController.eliminarLista);


export default router;
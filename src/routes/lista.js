import { Router } from 'express';
import {ListaController } from '../controladores/lista';

const router = Router();

router.post('/', );

router.get('/', ListaController.todasLasListas)

router.get('/:id', ListaController.listaPorId);

router.put('/:id', );

router.delete('/:id', );



export default router;
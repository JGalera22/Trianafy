import { Router } from 'express';
import {ListaController } from '../controladores/lista';

const router = Router();

router.get('/', ListaController.todasLasListas)

router.get('/:id', ListaController.listaPorId);

router.post('/', ListaController.nuevaLista);

router.put('/:id', ListaController.editarLista);

router.delete('/:id', ListaController.eliminarLista);



export default router;
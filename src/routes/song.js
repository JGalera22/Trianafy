import { Router } from 'express';
import {SongController } from '../controladores/song';

const router = Router();

router.post('/', );

router.get('/', SongController.todasLasCanciones)

router.get('/:id', SongController.cancionPorId);

router.put('/:id', );

router.delete('/:id', );



export default router;
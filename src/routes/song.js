import { Router } from 'express';
import {SongController } from '../controladores/song';

const router = Router();

router.get('/', SongController.todasLasCanciones)

router.get('/:id', SongController.cancionPorId);



export default router;
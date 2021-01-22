import { songs } from '../models/';


const SongController = {

    todasLasCanciones : (req, res) => {
        res.json(req.context.models.songs.songRepository.findAll());
    },

    cancionPorId : (req, res) => {
        let song = req.context.models.songs.songRepository.findById(req.params.id);
        if (song != undefined) {
            res.json(song);
        } else {
            res.sendStatus(404);
        }
        
    }

};

export  {
    SongController
}
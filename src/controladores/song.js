import { Song, songRepository } from '../models/songs';


const SongController = {

    todasLasCanciones : (req, res) => {
        res.json(songRepository.findAll());
    },

    cancionPorId : (req, res) => {
        let song = songRepository.findById(req.params.id);
        if (song != undefined) {
            res.json(song);
        } else {
            res.sendStatus(404);
        }
        
    },

    nuevaCancion : (req, res) => {
        let cancionCreada = songRepository.create(new Song(undefined, 
            req.body.title, req.body.artist, req.body.album, req.body.year));
        res.status(201).json(cancionCreada);
    },

    editarCancion: (req, res) => {
        let cancionModificada = songRepository.updateById(req.params.id, new Song(undefined, 
            req.body.title, req.body.artist, req.body.album, req.body.year));
        if (cancionModificada == undefined)
            res.sendStatus(404);
        else   
            res.status(200).json(cancionModificada);
    },

    eliminarCancion: (req, res) => {
        songRepository.delete(req.params.id);
        res.sendStatus(204);
    }

};

export  {
    SongController
}
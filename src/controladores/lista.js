import { Lista, listaRepository } from '../models/listas';

const ListaController = {

    todasLasListas : (req, res) => {
        res.json(listaRepository.findAll());
    },

    listaPorId : (req, res) => {
        let lista = listaRepository.findById(req.params.id);
        if (lista != undefined) {
            res.json(lista);
        } else {
            res.sendStatus(404);
        }
        
    },

    nuevaLista : (req, res) => {
        let listaCreada = listaRepository.create(new Lista(undefined, 
            req.body.name, req.body.description, req.body.userId, req.body.songs));
        res.status(201).json(listaCreada);
    },

    editarLista: (req, res) => {
        let listaModificada = listaRepository.updateById(req.params.id, new Lista(undefined, 
            req.body.name, req.body.description, req.body.userId, req.body.songs));
        if (listaModificada == undefined)
            res.sendStatus(404);
        else   
            res.status(200).json(listaModificada);
    },

    eliminarLista: (req, res) => {
        listaRepository.delete(req.params.id);
        res.sendStatus(204);
    }

};

export  {
    ListaController
}
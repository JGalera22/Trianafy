import { listas } from '../models/';


const ListaController = {

    todasLasListas : (req, res) => {
        res.json(req.context.models.listas.listaRepository.findAll());
    },

    listaPorId : (req, res) => {
        let lista = req.context.models.listas.listaRepository.findById(req.params.id);
        if (lista != undefined) {
            res.json(lista);
        } else {
            res.sendStatus(404);
        }
        
    }

};

export  {
    ListaController
}
import { Lista, listaRepository } from '../models/listas';
import { songRepository } from '../models/songs';

const ListaController = {

    todasLasListas : async (req, res) => {
        const data = await listaRepository.findAll();
        if (Array.isArray(data) && data.length > 0) 
            res.json(data);
        else
            res.sendStatus(404);
    },

    listaPorId : async (req, res) => {
        let lista = await listaRepository.findById(req.params.id);
        if (lista != undefined) {
            res.json(lista);
        } else {
            res.sendStatus(404);
        }
        
    },

    cancionesLista: async (req, res) => {
        let lista = await listaRepository.findById(req.params.id);
        if (lista != undefined){
            res.json(lista.songs);
        }else{
            res.sendStatus(404);
        }
    },

    buscarCancionLista: async (req, res)=>{
        let lista = await listaRepository.findById(req.params.id_lista);
        if(lista != undefined){
            let song = await songRepository.findById(req.params.id_song);
            if (song != undefined){
                let cancionEnLista = lista.songs.find(song => song._id == req.params.id_song); 
                if(cancionEnLista != undefined){
                    res.json(cancionEnLista);
                }else{
                    res.status(400).json({ 
                        mensaje: `No existe ninguna canción con el ID: ${req.params.id_song} dentro de la lista de reproducción con ID: ${req.params.id_lista} `
                    });
                }
                
            }else{
                res.status(400).json({ 
                    mensaje: `No existe ninguna canción con el ID: ${req.params.id_song}`
                });
            }
        }else{
            res.status(400).json({
                mensaje: `No existe ninguna lista de reproducción con el ID: ${req.params.id_lista}` 
            });
        }
    },

    nuevaLista : async (req, res) => {
        let listaCreada = await listaRepository.create({
            user: await req.user,
            name: req.body.name, 
            description: req.body.description           
        } 
            );
        res.status(201).json(listaCreada);
        //console.log('hola')
        console.log(req.user)
    },

    addCancionLista: async (req, res)=>{
        let song = await songRepository.findById(req.params.id_song);
        if(song != undefined){
            let lista = await listaRepository.findById(req.params.id_lista);
            if (lista != undefined){
                console.log(song);
                lista.songs.push(song._id);
                await lista.save();
                res.json(await listaRepository.findById(lista._id));
            }else{
                res.status(400).json({
                    mensaje: `No existe ninguna lista de reproducción con el ID: ${req.params.id_lista}` 
                });
            }
        }else{
            res.status(400).json({
                mensaje: `No existe ninguna canción con el ID: ${req.params.id_song}` 
            });
        }
    },

    delCancionLista: async (req, res) => {
        let lista = await listaRepository.findById(req.params.id_lista);
        if (lista != undefined) {
            lista.songs.pull(req.params.id_song);
            await lista.save();
            res.json(await listaRepository.findById(lista._id));
        } else {
            res.status(400).json({
                mensaje: `La lista con ID: ${req.params.id_pelicula} no está registrada en la base de datos`
            });
        }
    },

    editarLista: async (req, res) => {
        let listaModificada = await listaRepository.updateById(req.params.id, {
            name: req.body.name, description: req.body.description,
            userId: req.body.userId, songs: req.body.songs
        });
            if (listaModificada == undefined)
            res.sendStatus(404);
        else   
            res.status(200).json(listaModificada);
    },

    eliminarLista: async (req, res) => {
        await listaRepository.delete(req.params.id);
        res.sendStatus(204);
    }

};

export  {
    ListaController
}
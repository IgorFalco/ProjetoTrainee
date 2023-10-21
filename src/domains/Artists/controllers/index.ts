import ArtistServices from "../services/ArtistServices"; 
import  { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get(" /", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const artist = await ArtistServices.listAll();
        res.json(artist);
    }catch(error){
        next(error);
    }
});

router.get(" /idArtist", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const artistStreams = await ArtistServices.listStreams(parseInt(req.params.idArtist));
        res.json(artistStreams);
    }catch(error){
        next(error);
    }
});

router.post("/creat", async (req: Request, res: Response, next: NextFunction) =>{
    try{
    await ArtistServices.create(req.body);
    res.json("Artista criado com sucesso!");
    } catch(error){
        next("Erro ao criar um artista" + error);
    }
})


router.put(" /update/:id", async(req: Request, res: Response, next: NextFunction) => {
    try{
        await ArtistServices.update(parseInt(req.params.idArtist), req.body);
		res.json("Artista atualizado com sucesso!");
	} catch (error) {
		next("Erro ao atualizar o artista" + error);
	}
})

router.put(" /updateStreams/:idArtist/: musicid", async(req: Request, res: Response, next: NextFunction) => {
    try{
        await ArtistServices.UpdateStreams(parseInt(req.params.idArtist), parseInt(req.params.musicId));
		res.json("Usuário atualizado com sucesso!");
	} catch (error) {
		next("Erro ao atualizar o  Usuário" + error);
	}
})



router.delete(" /:idArtist", async(req: Request, res: Response, next: NextFunction) =>{
    try {
        const deleteArtist = await ArtistServices.delete(parseInt(req.params.idArtist));
        res.json("Arista deletado com sucesso!");
    } catch(error) {
        next("Erro ao deletar artista" + error);
    }
})

export default router;
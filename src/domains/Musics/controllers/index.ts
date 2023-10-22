import musicServices from "../services/musicServices";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", async(req: Request, res: Response, next: NextFunction) => {
	try{
		const musics = await musicServices.listAll();
		res.json(musics);
	}catch(error){
		next(error);
	}
});

router.post("/create/:artistId", async(req: Request, res: Response, next: NextFunction) => {
	try{
		await musicServices.createMusic(req.body, parseInt(req.params.artistId)); // NAO SEI SE TA CERTO
		res.json("Música criada com sucesso!");
	}catch(error){
		next("Erro ao criar música." + error);
	}
});

router.put("/update/:musicId", async(req: Request, res: Response, next: NextFunction) => {
	try {
		await musicServices.updateMusic(parseInt(req.params.musicId), req.body);
		res.json("Música atualizada com sucesso!");
	}catch(error){
		next("Erro ao atualizar música." + error);
	}
});

router.put("/updateListener/:musicId/:userId",async(req: Request, res: Response, next: NextFunction) =>{
	try {
		await musicServices.updateListenerUser(parseInt(req.params.musicId),parseInt(req.params.userId));
		res.json("Música atualizada com sucesso!");
	}catch(error){
		next("Erro ao atualizar música." + error);
	}
} );

router.put("/updateMusicArtist/:musicId/:artistId", async(req: Request, res: Response, next: NextFunction) => {
	try{
		await musicServices.updateMusicArtist(parseInt(req.params.musicId),parseInt(req.params.artistId));
		res.json("Música atualizada com sucesso!");
	}catch(error){
		next("Erro ao atualizar música" + error);
	}
});

router.delete("/delete/:musicId", async(req: Request, res: Response, next: NextFunction) => {
	try{
		await musicServices.deleteMusic(parseInt(req.params.musicId));
		res.json("Música deletada com sucesso!");
	}catch(error){
		next("Erro ao deletar música" + error);
	}
});

export default router;




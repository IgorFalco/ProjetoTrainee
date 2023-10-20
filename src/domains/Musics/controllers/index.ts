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

router.post("/create", async(req: Request, res: Response, next: NextFunction) => {
	try{
		await musicServices.createMusic(req.body, parseInt(req.params.artistId)); // NAO SEI SE TA CERTO
		res.json("Música criada com sucesso!");
	}catch(error){
		next(error);
	}
});

export default router;




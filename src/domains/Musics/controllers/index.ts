import musicServices from "../services/musicServices";
import { Router, Request, Response, NextFunction } from "express";
import statusCodes from "../../../../utils/constants/statusCodes";
import checkRole from "../../middlewares/checkRole";

const router = Router();

router.get("/", async(req: Request, res: Response, next: NextFunction) => {
	try{
		const musics = await musicServices.listAll();
		res.json(musics);
	}catch(error){
		next(error);
	}
});

router.post("/create/:artistId",checkRole("admin"), async(req: Request, res: Response, next: NextFunction) => { //considerando que a musica para ser adicionada tem que passar por um admin
	try{
		await musicServices.createMusic(req.body, parseInt(req.params.artistId)); // NAO SEI SE TA CERTO
		res.status(statusCodes.CREATED).json("Música criada com sucesso!");
	}catch(error){
		next("Erro ao criar música." + error);
	}
});

router.put("/update/:musicId",checkRole("admin"), async(req: Request, res: Response, next: NextFunction) => {
	try {
		await musicServices.updateMusic(parseInt(req.params.musicId), req.body);
		res.status(statusCodes.SUCCESS).json("Música atualizada com sucesso");
	}catch(error){
		next("Erro ao atualizar música." + error);
	}
});

router.put("/updateListener/:musicId/:userId",checkRole("admin"),async(req: Request, res: Response, next: NextFunction) =>{
	try {
		await musicServices.updateListenerUser(parseInt(req.params.musicId),parseInt(req.params.userId));
		res.status(statusCodes.SUCCESS).json("Ouvinte atualizado com sucesso!");
	}catch(error){
		next("Erro ao atualizar música." + error);
	}
} );

router.put("/updateMusicArtist/:musicId/:artistId",checkRole("admin"), async(req: Request, res: Response, next: NextFunction) => {
	try{
		await musicServices.updateMusicArtist(parseInt(req.params.musicId),parseInt(req.params.artistId));
		res.status(statusCodes.SUCCESS).json("Artista da música atualizado com sucesso!");
	}catch(error){
		next("Erro ao atualizar música" + error);
	}
});

router.delete("/delete/:musicId", checkRole("admin"), async(req: Request, res: Response, next: NextFunction) => {
	try{
		await musicServices.deleteMusic(parseInt(req.params.musicId));
		res.status(statusCodes.SUCCESS).json("Música deletada com sucesso");
	}catch(error){
		next("Erro ao deletar música" + error);
	}
});

export default router;




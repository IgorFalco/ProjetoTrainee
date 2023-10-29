import { Router, Request, Response, NextFunction } from "express";
import ArtistServices from "../services/ArtistServices";
import statusCodes from "../../../../utils/constants/statusCodes";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const artists = await ArtistServices.listAll();
    res.status(statusCodes.SUCCESS).json(artists);
  } catch (error) {
    next(error);
  }
});

router.get("/:idArtist", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const artistStreams = await ArtistServices.listStreams(parseInt(req.params.idArtist));
    res.status(statusCodes.SUCCESS).json(artistStreams);
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ArtistServices.create(req.body);
    res.status(statusCodes.CREATED).json("Artista criado com sucesso!");
  } catch (error) {
    next("Erro ao criar um artista: " + error);
  }
});

router.put("/update/:idArtist", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ArtistServices.update(parseInt(req.params.idArtist), req.body);
    res.status(statusCodes.SUCCESS).json("Artista atualizado com sucesso!");
  } catch (error) {
    next("Erro ao atualizar o artista: " + error);
  }
});

router.put("/updateStreams/:idArtist/:musicId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ArtistServices.UpdateStreams(parseInt(req.params.idArtist), parseInt(req.params.musicId));
    res.status(statusCodes.SUCCESS).json("Artista atualizado com sucesso!");
  } catch (error) {
    next("Erro ao atualizar o artista: " + error);
  }
});

router.delete("/delete/:idArtist", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleteArtist = await ArtistServices.delete(parseInt(req.params.idArtist));
    res.status(statusCodes.SUCCESS).json("Artista deletado com sucesso!");
  } catch (error) {
    next("Erro ao deletar o artista: " + error);
  }
});

export default router;

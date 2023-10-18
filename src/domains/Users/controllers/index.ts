import userServices from "../services/userServices";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userServices.listAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
})

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userServices.create(req.body);
        res.json('Usário criado com sucesso!');
    } catch (error) {
        next(error);
    }
})

export default router;
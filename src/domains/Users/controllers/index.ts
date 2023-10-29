import userServices from '../services/userServices';
import { Router, Request, Response, NextFunction } from 'express';

enum Cargo {
	USER = "artist",
	ADMIN = "admin",
  }

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await userServices.listAll();
		res.json(users);
	} catch (error) {
		next(error);
	}
});

router.get('/:email', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await userServices.listByEmail(req.params.email);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
	try {
		await userServices.create(req.body);
		res.json('Usuário criado com sucesso!');
	} catch (error) {
		next('Erro ao criar um novo Usuário' + error);
	}
});

router.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		await userServices.update(parseInt(req.params.id), req.body);
		res.json('Usuário atualizado com sucesso!');
	} catch (error) {
		next('Erro ao atualizar o  Usuário' + error);
	}
});
router.put('/:userId/addMusics', async (req: Request, res: Response, next: NextFunction) => {

	try {
		const userId = parseInt(req.params.userId);
		const musics = req.body.idMusic;
		
		const updatedUser = await userServices.addNewMusics(userId, musics);

		res.json('Músicas adicionadas com sucesso!');
	} catch (error) {
		next('Erro ao adicionar músicas ao usuário' + error);
	}
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const deletedUser = await userServices.delete(parseInt(req.params.id));
		res.json('Usuário deletado com sucesso!');
	} catch (error) {
		next('Erro ao deletar o Usuário' + error);
	}
});

export default router;
// analisar req.role e req.user.role
//se o cargo estiver incluso na lista de cargos permitidos , chamar next() e .include()
//se nao, retornar um erro de permissao


import statusCodes from "../../../utils/constants/statusCodes";
import { Request, Response, NextFunction } from "express";




async function checkRole(allowedRoles : string) {
	return (req: Request, res: Response, next: NextFunction) => {
		const userRole = req.user.role;
		try{
			if(allowedRoles.includes(userRole)){
				next();
			}
			else{
				res.status(statusCodes.UNAUTHORIZED).json("Permissão negada");
			}
		}catch(error){
			next(error);
		}
		

	};
}

export default checkRole;
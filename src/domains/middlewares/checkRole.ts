// analisar req.role e req.user.role
//se o cargo estiver incluso na lista de cargos permitidos , chamar next() e .include()
//se nao, retornar um erro de permissao


import { PermissionError } from "../../../errors/errors/PermissionError";
import statusCodes from "../../../utils/constants/statusCodes";
import { Request, Response, NextFunction } from "express"; 


async function checkRole(allowedRole: Role) {
	return (req: Request, res: Response, next: NextFunction) => {
<<<<<<< HEAD
	  const userRole = req.user.role;
	  try {
		if (userRole === allowedRole) {
		  next();
		} else {
		  res.status(statusCodes.UNAUTHORIZED).json("Permissão negada");
		}
	  } catch (error) {
		next(error);
	  }
=======
		const userRole = req.user.role;
		
		if(allowedRoles.includes(userRole)){
			next();
		}
		else{
			res.status(statusCodes.UNAUTHORIZED).json("Permissão negada");
			throw new PermissionError("Usuário sem permissão");
		}
		
>>>>>>> 4a38c7e9c5a26ca78aee015389c3c5fe82338ca0
	};
  }

export default checkRole;
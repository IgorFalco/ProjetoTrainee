import statusCodes from "../../utils/constants/statusCodes";
import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import prisma from "../../config/prismaClient";
import { PermissionError } from "../../errors/errors/PermissionError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function generateJWT(body: User, res: Response) {
	const token = jwt.sign({ user: body }, process.env.SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRATION,
	});

	res.cookie("jwt", token, { 
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development", //falso no desenvolvimento
	});
}

function cookieExtractor(req: Request) {
	let token = null;

	if (req && req.cookies) {
		token = req.cookies["jwt"];
	}
	return token;
}

export async function loginMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		const user = await prisma.user.findUnique({ where: { email: req.body.email } });
		if (!user) {
			throw new PermissionError("E-mail e/ou senha incorretos!");
		} else {
			const matchingPassword = await bcrypt.compare(req.body.password, user.password);
			if (!matchingPassword) {
				throw new PermissionError("E-mail e/ou senha incorretos!");
			}
		}

		generateJWT(user, res);

		res.status(statusCodes.NO_CONTENT).end();
	} catch (error) {
		next(error);
	}
}

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
	try {
		const token = cookieExtractor(req);
		if (token) {
			const decoded = jwt.verify(token, process.env.SECRET_KEY);
			req.user = decoded.user;
		}
		if (!req.user) {
			throw new PermissionError("Você precisa estar logado para realizar esta ação");
		}
		next();
	} catch (error) {
		next(error);
	}
}

export function checkIfLoggedInMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		const token = cookieExtractor(req);
		if (!token) {
			next();
			return;
		}

		jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
			if (err) {
				next();
			} else {
				next(new PermissionError("Você já está logado. Não é permitido acessar esta página."));
			}
		});
	} catch (error) {
		next(error);
	}
}

export function logoutMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		res.clearCookie("jwt");
		res.status(200).json("Logout realizado com sucesso.");
	} catch (error) {
		next(error);
	}
}

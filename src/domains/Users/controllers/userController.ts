import UserService from "../services/userServices";
import { User, Music } from "@prisma/client";

export async function CreateUserWithMusics(Body: User, Musics: Music[]) {
	try {
		await UserService.create(Body, Musics);
	} catch (error) {
		console.log("Erro ao criar um novo Usuário", error);
	}
}
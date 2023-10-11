import UserService from "../services/userServices";
import { User, Music } from "@prisma/client";

export async function CreateUserWithMusics(body: User, musics: Music[]) {
	try {
		await UserService.create(body, musics);
	} catch (error) {
		console.log("Erro ao criar um novo Usuário", error);
	}
}

export async function DeleteUserById(id: number) {
	try {
		await UserService.delete(id);
	} catch (error) {
		console.log("Erro ao deletar o Usuário", error);
	}
}
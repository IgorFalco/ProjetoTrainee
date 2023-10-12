import UserService from "../services/userServices";
import { User, Music } from "@prisma/client";

export async function CreateUser(body: User) {
	try {
		await UserService.create(body);
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

export async function ListAllUsers() {
	try {
		const users = await UserService.listAll();
		return users;
	} catch (error) {
		console.log("Erro ao listar os usuários", error);
	}
}

export async function UpdateUserData(id: number, data: Partial<User>) {
	try {
		const updateUser = await UserService.update(id, data);
	} catch (error) {
		console.log("Erro ao atualizar o usuário", error);
	}
}

export async function UpdateUserHeardMusics(userId: number, musicId: number) {
	try {
		const updateUser = await UserService.updateHeardMusics(userId, musicId);
		return updateUser;
	} catch (error) {
		console.log("Erro ao atualizar a lista de músicas do usuário", error);
	}
}
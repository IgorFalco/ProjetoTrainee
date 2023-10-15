import { defineDmmfProperty } from "@prisma/client/runtime/library";
import prisma from "../../../../client/client";
import { Music, User } from "@prisma/client";

class UserService {

	async create(body: User) {
		const user = await prisma.user.create({
			data: {
				name: body.name,
				email: body.email,
				photo: body.photo,
				password: body.password,
				role: body.role,
				MusicsHeard: {
					create: [],
				}
			},

		});

		return user;
	}

	async delete(id: number) {
		const deleteUser = await prisma.user.delete({
			where: {
				idUser: id,
			},
		});
	}

	async listAll() {

		const users = await prisma.user.findMany();
		return users;
	}

	async update(id: number, data: Partial<User>) {
		const updateUser = await prisma.user.update({
			where: {
				idUser: id,
			},
			data: data,
		});
		return updateUser;

	}
	async updateHeardMusics(userId: number, musicId: number) {
		const updateUser = await prisma.user.update({
			where: {
				idUser: userId,
			},
			data: {
				MusicsHeard: {
					connect: {
						idMusic: musicId,
					},
				},
			},
			include: {
				MusicsHeard: true,
			}
		});
		return updateUser;
	}

}


export default new UserService();
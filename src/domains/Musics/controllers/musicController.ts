import MusicService from "../services/musicServices";
import {Music} from "@prisma/client";

export async function CreateMusic(body: Music, artistId: number) {
	try {
		await MusicService.create(body, artistId);
	} catch (error) {
		console.log("Erro ao adicionar uma nova Música", error);
	}
}
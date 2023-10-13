import MusicService from "../services/musicServices";
import {Music} from "@prisma/client";

export async function CreateMusic(body: Music, artistId: number) {
	try {
		await MusicService.create(body, artistId);
	} catch (error) {
		console.log("Erro ao adicionar uma nova música", error);
	}
}

export async function ListAllMusics(){
	try{
		const musics = await MusicService.listAll();
		return musics;
	}catch(error){
		console.log("Erro ao listar todas as músicas",error);
	}
}
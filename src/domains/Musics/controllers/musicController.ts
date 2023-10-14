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

export async function UpdateMusic(id: number, data: Partial<Music> ) {
	try{
		const updateMusic =await MusicService.updateMusic(id,data);
		return updateMusic;
	} catch(error){
		console.log("Erro ao atualizar a música",error);
	}
	
}

export async function UpdateMusicArtist(musicId: number, newArtistId: number ) {
	try{
		const updateMusicArtist = await MusicService.updateMusicArtist(musicId,newArtistId);
		return updateMusicArtist;
	} catch(error){
		console.log("Erro ao atualizar o artista da música",error);
	}
}

export async function UpdateListenerUser(musicId: number, userId: number){
	try{
		const updateListener = await MusicService.updateListenerUser(musicId,userId);
		return updateListener;
	} catch (error){
		console.log("Erro ao atualizar a lista de ouvintes dessa música");
	}
}



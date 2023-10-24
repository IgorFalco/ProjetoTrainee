import ArtistServices from "../services/ArtistServices";
import {Artist} from "@prisma/client";

export async function CreateArtist(body: Artist) {
	try {
		await ArtistServices.create(body);
	} catch (error) {
		console.log("Erro ao adicionar um novo artista", error);
	}
}

export async function deleteArtist(idArtist: number){
	try{
		const deleteArtist = await ArtistServices.delete(idArtist);
		return deleteArtist;
	} catch (error){
		console.log("Erro ao deletar o artista",error);
	}
}

export async function ListAllArtist(){
	try{
		const Artist = await ArtistServices.listAll();
		return Artist;
	}catch(error){
		console.log("Erro ao listar todos os artistas", error);
	}
}

export async function findArtist(id: number){
	try{
		const Artist = await ArtistServices.find(id);
		return Artist;
	}catch(error){
		console.log("Erro ao encontrar o artista", error);
	}
}

export async function updateArtist(idArtist: number, data : Partial<Artist>) {
	try{
		const updateArtist = await ArtistServices.update(idArtist, data);
		return updateArtist;
	}catch(error){
		console.log("Erro ao atualizar o artista", error);
	}
}

export async function updateArtistStreams(idArtist: number, idMusic: number) {
	try{
		const updateArtist = await ArtistServices.UpdateStreams(idArtist, idMusic);
		return updateArtist;
	}catch(error){
		console.log("Erro ao adicionar uma nova música ao artistaimpor", error);
	}
}

export async function listArtistStreams(idArtist: number) {
	try {
		const artistStreams = await ArtistServices.listStreams(idArtist);
		return artistStreams;
	} catch (error) {
		console.log("Erro ao obter o número de streams do artista", error);
	}
}

import ArtistServices from "../artists/services/ArtistServices";
import {Artist} from "@prisma/client";

export async function CreateArtist(body: Artist) {
	try {
		await ArtistServices.CreateArtist(body: Artist);
	} catch (error) {
		console.log("Erro ao adicionar um novo artista", error);
	}
}

export async function deleteArtist(idArtist: number){
	try{
		const deleteArtist = await ArtistServices.deleteArtist(idArtist);
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

export async function updateArtist(idArtist: number, data : Partial<Artist>) {
    try{
        const updateArtist = await ArtistServices.updateArtist(idArtist, data);
        return updateArtist
    }catch(error){
        console.log("Erro ao atualizar o artista", error);
    }
}

export async function ArtistStreams(idArtist: number) {
    try {
        const artistStreams = await ArtistServices.ArtistStreams(idArtist);
        return artistStreams;
    } catch (error) {
        console.log("Erro ao obter o número de streams do artista", error);
    }
}

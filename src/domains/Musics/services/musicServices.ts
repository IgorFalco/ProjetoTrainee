import prisma from "../../../../config/prismaClient";
import { Music} from "@prisma/client";


class MusicService{
	//CRUD MUSIC:
	//CREATE
	async createMusic(body: Music, artistId: number){     //ALTERAR PARA QUANDO O ARTISTA AINDA NAO ESTA NO BANCO DE DADOS

		const artistaDesejado = await prisma.artist.findUnique({
			where: {
				idArtist: artistId,
			}
		});

		if(artistaDesejado){
			const novaMusica = await prisma.music.create({
				data:{
					name: body.name,
					genre: body.genre,
					album: body.album,
					artistId: artistaDesejado.idArtist,
					listenerUser: {
						create: [],
					}
				}
			});
	
			return novaMusica;
		}
		else{
			throw new Error("Artista não encontrado");
		}

	}

	//READ
	async listAll() {

		const musics = await prisma.music.findMany();
		return musics;
	}

	//UPDATE
	async updateMusic(id: number, data: Partial<Music>){
		const music = await prisma.music.findUnique({
			where: {
				idMusic: id,
			},
		});

		if(!music){
			throw new Error("Música não encontrada");
		}
		else{
			const updateMusic = await prisma.music.update({
				where: {
					idMusic: id,
				},
				data: data,
			});
			return updateMusic;
		}
	}



	async updateListenerUser(musicId: number, userId: number){

		const music = await prisma.music.findUnique({
			where: {
				idMusic: musicId,
			},
		});

		if(!music){
			throw new Error("Música não encontrada");
		}


		const updateListener = await prisma.music.update({
			where:{
				idMusic: musicId,
			},
			data: {
				listenerUser:{
					connect:{
						idUser: userId,
					}
				}
			},
			include:{
				listenerUser: true,
			}
		});

		return updateListener;
	}

	async updateMusicArtist(musicId: number, newArtistId: number){
		const music = await prisma.music.findUnique({
			where: {
				idMusic: musicId,
			},
		});

		const newArtist = await prisma.artist.findUnique({
			where: {
				idArtist: newArtistId,
			},
		});

		if(!music){
			throw new Error("Música não encontrada");
		}
		
		if(!newArtist){
			throw new Error("Artista não encontrado");
		}
		
		const updateMusic = await prisma.music.update({
			where: {
				idMusic: musicId,
			},
			data: {
				artistId: newArtistId,
			}
		});
		return updateMusic;
		
	}

	//DELETE
	async deleteMusic(musicId: number){
		const music = await prisma.music.findUnique({
			where: {
				idMusic: musicId,
			},
		});

		if(!music){
			throw new Error("Música não encontrada");
		}
		
		await prisma.music.delete({
			where:{
				idMusic: musicId,
			}
		});

	}

	

}

export default new MusicService();
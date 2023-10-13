import prisma from "../../../../client/client";
import { Music} from "@prisma/client";

class MusicService{
	//CRDU MUSIC:

	async create(body: Music, artistId: number){     //ALTERAR PARA QUANDO O ARTISTA AINDA NAO ESTA NO BANCO DE DADOS

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

}

export default new MusicService();
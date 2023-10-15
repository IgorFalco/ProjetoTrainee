import { CreateUser, DeleteUserById, ListAllUsers, UpdateUserData } from "./src/domains/Users/controllers/userController";
import { Music, User, Artist } from "@prisma/client";
import { CreateMusic, ListAllMusics, UpdateListenerUser, UpdateMusic, UpdateMusicArtist, DeleteMusic } from "./src/domains/Musics/controllers/musicController";
import { CreateArtist, deleteArtist, ListAllArtist, findArtist, updateArtist, updateArtistStreams, listArtistStreams } from "./src/domains/Artists/controllers/artistController";

async function main() {

	// const testUser = {
	// 	idUser:0,
	// 	name: "Exemplo de Usuário",
	// 	email: "usuario@teste.com",
	// 	photo: "caminho/para/foto",
	// 	password: "senha_de_teste",
	// 	role: "ADMIN",
	// 	MusicsHeard: [],
	// };

	// const artistData = {
	// 	idArtist: 0,
	// 	name: "Nome do Artista",
	// 	streams: 0,
	// 	photo: "caminho/para/foto-do-artista",
	// 	musics: [],
	// };

	// const musicData = {
	// 	idMusic: 0,
	// 	artistId:1,
	// 	name: "Nome da Música",
	// 	genre: "Gênero da Música",
	// 	album: "Nome do Álbum",
	// 	listenerUser:[],
	// };

	// CreateUser(testUser);
	// CreateArtist(artistData);
	// CreateMusic(musicData, 1);

	// ListAllUsers();
	// listArtistStreams(1);
	// ListAllArtist();
	// ListAllMusics();


}

main();
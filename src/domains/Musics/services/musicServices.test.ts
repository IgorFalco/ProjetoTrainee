import { Music } from "@prisma/client";
import musicServices from "./musicServices";

jest.mock("@prisma/client", () => {
	return {
		create: jest.fn(),
		findMany: jest.fn(),
		findUnique: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	};
});



// TESTE PARA METODO DE CRIAR
describe("create", () => {
	beforeEach(() => {
		jest.restoreAllMocks();
		jest.clearAllMocks();
	});

	test("Recebe um body com valores de uma música e a id do artista => cria uma Música no banco", async() => {
		const idArtist= 1;
		
		const music_info = {
			idMusic: 1,
			name: "Teste",
			genre: "PopRockClassicFunk",
			album: "Album Teste",
			artistId: idArtist,
		};

		Music.create.mockImplementation(
			() => {
				return {};
			}
		);
		

		await musicServices.createMusic(music_info, idArtist);

		expect(Music.create).toHaveBeenCalledWith(music_info);
		expect(Music.create).toHaveBeenCalledTimes(1);

	});

	



});
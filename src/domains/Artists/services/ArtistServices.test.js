import { Artist} from "@prisma/client";
import ArtistService from "./ArtistServices";


jest.mock("@prisma/client", () => ({
    artist: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  }));
  
  describe("ArtistService", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe("create", () => {
      test("criando um novo artista", async () => {
        const artistData = {
          name: "Yasmim Lopes",
          streams: 60000,
          photo: "YasmimLopes.jpg",
          id: 1,
        };
  
        prisma.artist.create.mockResolvedValue(artistData);
  
        const result = await ArtistService.create(artistData);
  
        expect(prisma.artist.create).toHaveBeenCalledWith({
          data: {
            name: artistData.name,
            streams: artistData.streams,
            photo: artistData.photo,
            musics: { create: [] },
          },
        });
  
        expect(result).toEqual(artistData);
      });
    });
  
    describe("update", () => {
      test("Atualizando artista ja existente", async () => {
        const artistId = 1;
        const artistData = { streams: 70000 };
  
        prisma.artist.findUnique.mockResolvedValue({ idArtist: artistId });
        prisma.artist.update.mockResolvedValue({ idArtist: artistId, ...artistData });
  
        const result = await ArtistService.update(artistId, artistData);
  
        expect(prisma.artist.findUnique).toHaveBeenCalledWith({
          where: { idArtist: artistId },
        });
  
        expect(prisma.artist.update).toHaveBeenCalledWith({
          where: { idArtist: artistId },
          data: artistData,
        });
  
        expect(result).toEqual({ idArtist: artistId, ...artistData });
      });
  
      test("Gera um erro se o artista não for encontrado", async () => {
        const artistId = 1;
        const artistData = { streams: 70000 };
  
        prisma.artist.findUnique.mockResolvedValue(null);
  
        await expect(ArtistService.update(artistId, artistData)).rejects.toThrow(
            new Error("Artista não encontrado")
        );
  
        expect(prisma.artist.findUnique).toHaveBeenCalledWith({
          where: { idArtist: artistId },
        });
  
        expect(prisma.artist.update).not.toHaveBeenCalled();
      });
    });
  
  });

    describe("delete", () => {
        test("deletando um artista", async () => {
            const artistId = 1;
    
            prisma.artist.delete.mockResolvedValue({ idArtist: artistId });
    
            await ArtistService.delete(artistId);
    
            expect(prisma.artist.delete).toHaveBeenCalledWith({
            where: { idArtist: artistId },
            });
        });
    
        test("artista não encontrado durante a exclusão", async () => {
            const artistId = 1;
    
            prisma.artist.delete.mockResolvedValue(null);
    
            await expect(ArtistService.delete(artistId)).rejects.toThrow(
            new Error('Artista não encontrado')
            );
    
            expect(prisma.artist.delete).toHaveBeenCalledWith({
            where: { idArtist: artistId },
            });
        });
        });

        describe("listAll", () => {
            test("Listar todos os artistas", async () => {
              const artistsData = [
                { idArtist: 1, name: "Yasmim Lopes", streams: 70000, photo: "YaasmimLopes.jpg" },
                { idArtist: 2, name: "King ", streams: 80000, photo: "King.jpg" },
              ];
        
              prisma.artist.findMany.mockResolvedValue(artistsData);
        
              const result = await ArtistService.listAll();
        
              expect(prisma.artist.findMany).toHaveBeenCalled();
        
              expect(result).toEqual(artistsData);
            });
          });
        
          describe("find", () => {
            test("achar artista pelo Id", async () => {
              const artistId = 2;
              const artistData = { idArtist: artistId, name: "King", streams: 80000, photo: "King.jpg" };
        
              prisma.artist.findUnique.mockResolvedValue(artistData);
        
              const result = await ArtistService.find(artistId);
        
              expect(prisma.artist.findUnique).toHaveBeenCalledWith({
                where: { idArtist: artistId },
              });
        
              expect(result).toEqual(artistData);
            });
        
        test("Se o artista não for encontrado pelo Id" , async () => {
              const artistId = 1;
        
              prisma.artist.findUnique.mockResolvedValue(null);
        
              await expect(ArtistService.find(artistId)).rejects.toThrow(
                new Error("Artista não encontrado")
              );
        
              expect(prisma.artist.findUnique).toHaveBeenCalledWith({
                where: { idArtist: artistId },
              });
            });
          });
        describe("listStreams", () => {
            test("Listando steams de artista", async () => {
              const artistId = 1;
              const streamsData = { streams: 70000 };
        
              prisma.artist.findUnique.mockResolvedValue(streamsData);
        
              const result = await ArtistService.listStreams(artistId);
        
              expect(prisma.artist.findUnique).toHaveBeenCalledWith({
                where: { idArtist: artistId },
                select: { streams: true },
              });
        
              expect(result).toEqual(streamsData);
            });
        
            test("Se o artista não for encontrado", async () => {
              const artistId = 1;
        
              prisma.artist.findUnique.mockResolvedValue(null);
        
              await expect(ArtistService.listStreams(artistId)).rejects.toThrow(
                new Error("artista não encontrado")
              );
        
              expect(prisma.artist.findUnique).toHaveBeenCalledWith({
                where: { idArtist: artistId },
                select: { streams: true },
              });
            });
          });
        
          describe("updateStreams", () => {
            test("atualizar streams de um artista", async () => {
              const artistId = 1;
              const musicId = 101;
        
              const artistData = {
                idArtist: artistId,
                name: "Yasmim Lopes",
                streams: 75000,
                photo: "YasmimLops.jpg",
              };
        
              const updatedArtistData = {
                ...artistData,
                musics: [{ idMusic: musicId }],
              };
        
              prisma.artist.findUnique.mockResolvedValue(artistData);
              prisma.artist.update.mockResolvedValue(updatedArtistData);
        
              const result = await ArtistService.updateStreams(artistId, musicId);
        
              expect(prisma.artist.findUnique).toHaveBeenCalledWith({
                where: { idArtist: artistId },
              });
        
              expect(prisma.artist.update).toHaveBeenCalledWith({
                where: { idArtist: artistId },
                data: {
                  musics: {
                    connect: {
                      idMusic: musicId,
                    },
                  },
                },
                include: {
                  musics: true,
                },
              });
        
              expect(result).toEqual(updatedArtistData);
            });
        
            test("se o artista não for encontrado", async () => {
              const artistId = 1;
              const musicId = 101;
        
              prisma.artist.findUnique.mockResolvedValue(null);
        
              await expect(ArtistService.updateStreams(artistId, musicId)).rejects.toThrow(
                new Error("Artista não encontrado")
              );
        
              expect(prisma.artist.findUnique).toHaveBeenCalledWith({
                where: { idArtist: artistId },
              });
        
              expect(prisma.artist.update).not.toHaveBeenCalled();
            });
          });
        

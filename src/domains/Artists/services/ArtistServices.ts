
import prisma from "../../../../config/prismaClient";
import { Artist } from "@prisma/client";

class ArtistService {

    async create(body: Artist) {
        const artist = await prisma.artist.create({
            data: {
                name: body.name,
                streams: body.streams,
                photo: body.photo,
                musics: {
                    create: [],
                }
            },
        });
        return artist;
    }

    async update(artistId: number, Artistdata: Partial<Artist>) {

        const artist = await prisma.artist.findUnique({
            where: {
                idArtist: artistId,
            },
        });
        if (!artist) {
            throw new Error("Artista não encontrado");
        }
        else {
            const updateArtist = await prisma.artist.update({
                where: {
                    idArtist: artistId,
                },
                data: Artistdata,
            })
            return updateArtist;
        }
    }

    async delete(id: number) {
        const deleteArtist = await prisma.artist.delete({
            where: {
                idArtist: id,
            },
        });
    }

    async listAll() {
        const artists = await prisma.artist.findMany();
        return artists;
    }

    async find(artistId: number) {
        const artist = await prisma.artist.findUnique({
            where: {
                idArtist: artistId,
            },
        });
        if (!artist) {
            throw new Error("Artista não encontrado");
        } else {
            return artist;
        }


    }

    async listStreams(artistId: number) {
        const streams = await prisma.artist.findUnique({
            where: {
                idArtist: artistId,
            },
            select:{
                streams: true,
            }
        });
        return streams;
    }

    async UpdateStreams(artistId: number, musicId: number) {
        const artist = await prisma.artist.findUnique({
            where: {
                idArtist: artistId,
            },
        });
        if (!artist) {
            throw new Error("Artista não encontrado");
        } else {
            const uptateArtist = await prisma.artist.update({
                where: {
                    idArtist: artistId,
                },
                data: {
                    musics: {
                        connect: {
                            idMusic: musicId,
                        }
                    },
                },
                include: {
                    musics: true,
                }
            })
            return uptateArtist;
        }

    }
}

export default new ArtistService();
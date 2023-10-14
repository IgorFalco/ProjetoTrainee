
import { deflate } from 'zlib'
import prisma from '../../../../client/client'
import { Artist } from "@prisma/client";

class ArtistService {

    async CreateArtist(artistData: Partial<Artist> ){
        const artist = await prisma.artist.create({
            data: artistData,
            });
            return artist;
        }

    async updateArtist(id: number, Artistdata: Partial<Artist>) {
        const updateArtist = await prisma.artist.update({
            where: {
                idArtst: id,
            },
            data: Artistdata,
        })
        return updateArtist;
    
    }
    async deleteArtist(id: number) {
        const deleteArtist = await prisma.artist.delete({
            where: {
                idArtist: id,
            },
        })
    }
    async listAll() {
        const artists = await prisma.artist.findMany();
        return artists;
      }

    async stremsartist(){
        const artist = await prisma.artist.findUnique({
            where: {
                idArtist: id,
            },
        });
        return artist;

    async UpdateArtistStreams() {
        const updateArtist = await prisma.artist.upsert({
            where: {
                idArtist: id,
            },
            update: {
                streams: streams,
            },
            create: {
                idArtist: id,
                streams: streams,
            },
        });
        return updateArtist;
    }
}

export default new ArtistService();
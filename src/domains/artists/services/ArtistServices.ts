//funções importantes que os artistas vão ter assoziadas a ele (crud)
import { deflate } from 'zlib'
import prisma from '../../../../client/client'
import { Artist } from "@prisma/client";

class ArtistService {

    // criar funções de creat, read, update e delete  
    async create(artistData: Partial<Artist> ){
        const artist = await prisma.artist.create({
            data: artistData,
                }
            });
            return artist;
        }

    async update(id: number, Artistdata: Partial<Artist>) {
        const updateArtist = await prisma.artist.update({
            where: {
                idArtst: id,
            },
            data: Artistdata,
        })
        return updateArtist;
    
    }
    async delete(id: number) {
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
}

export default ArtistService();
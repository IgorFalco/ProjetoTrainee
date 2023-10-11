//funções importantes que os artistas vão ter assoziadas a ele (crud)
import { deflate } from 'zlib'
import prisma from '../../../../client/client'

class ArtistService {

    // criar funções de creat, read, update e delete  
async creat(body: any){
    const artist = await prisma.artist.creat({
        data: {
            name: body.name,
            streams: body.streams,
            photo: body.photo,
            musics: body.musics,

            }
        });
        return artist;
    }
}

export default ArtistsService();
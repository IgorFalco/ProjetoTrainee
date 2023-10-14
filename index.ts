import { CreateUser, DeleteUserById, ListAllUsers, UpdateUserData } from "./src/domains/Users/controllers/userController";
import { Music, User } from "@prisma/client";
import { CreateMusic, ListAllMusics, UpdateListenerUser, UpdateMusic, UpdateMusicArtist, DeleteMusic} from "./src/domains/Musics/controllers/musicController";
import { CreateArtist, deleteArtist, updateArtist, ArtistStreams } from "./src/domains/controllers/artistController";

async function main() {

}

main();
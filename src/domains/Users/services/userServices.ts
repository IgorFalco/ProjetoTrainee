import { defineDmmfProperty } from "@prisma/client/runtime/library";
import prisma from "../../../../client/client";
import { Music, User } from "@prisma/client";

class UserService {

    async create(body: User, Musics: Music[]) {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                photo: body.photo,
                password: body.password,
                role: body.role,
                listenMusics:{
                    create: Musics,
                }
            },
            
        });

        return user;
    }
}

export default new UserService();
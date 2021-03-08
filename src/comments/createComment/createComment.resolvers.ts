import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";


const resolvers: Resolvers = {
    Mutation: {
        createComment: protectResolver(async(_,{ photoId, payload,}, { loggedInUser, client } ) => {
            const ok = await client.photo.findUnique({
                where: {
                    id: photoId,
                },
                select: {
                    id: true,
                }
            });

            if(!ok){
                return {
                    ok: false,
                    error :  "Photo not found.",
                };
            }

            await client.comment.create({
                data: {
                    payload: payload,
                    photo: {
                        connect: {
                            id: photoId,
                        },
                    },
                    user: {
                        connect: {
                            id: loggedInUser.id,
                        },
                    },
                },
            });

            return {
                ok: true,
            };

          


        },
        ),  
        // end of protectResolver

    },
};


export default resolvers;
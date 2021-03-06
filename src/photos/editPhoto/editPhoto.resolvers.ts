import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

const resolvers: Resolvers = {
    Mutation: {
        editPhoto: protectResolver(async(_,{ id, caption,}, { loggedInUser, client } ) => {
            const oldPhoto = await client.photo.findFirst({
                where: {
                    id,
                    userId: loggedInUser.id,
                },
                include: {
                    hashtags: {
                        select: {
                            hashtag: true,
                        },
                    },
                },
            });

            if(!oldPhoto){
                return {
                    ok: false,
                    error: "Photo not found."
                }
            }
        
            await client.photo.update({
                where: {
                    id,
                },
                data: {
                    caption,
                    hashtags:{
                        disconnect: oldPhoto.hashtags,
                        connectOrCreate: processHashtags(caption),
                    }
                },
            });

            return{
                ok: true
            };

        
        },
        ),  
        // end of protectResolver
    },
};


export default resolvers;
import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolvers: Resolvers = {

    Query: {
        seeFollowing: async (_, {username, lastId}, {client} ) => {

            const ok = await client.user.findUnique({
                where: {username}
            });
    
            if(!ok){
                return {
                    ok: false,
                    error: "That user does not exist."
                };
            }

            const following = await client
            .user.findUnique({
                where: {username}
            })
            .following({
                take: 5,
                skip: lastId? 1: 0,
                ...(lastId && {cursor: {id:lastId} } ),
            });

            const totalFollowing =  await client.user.count({
                where: {
                    followers: { some: {username} }
                },
            });

            return {
                ok: true,
                following,
                totalPages: Math.ceil(totalFollowing / 5),
                
            }

        },
    },
};

export default resolvers;

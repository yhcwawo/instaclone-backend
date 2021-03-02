import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolvers: Resolvers = {

    Query: {
        seeFollowers: async (_, {username, lastId}, {client} ) => {

            const ok = await client.user.findUnique({
                where: {username}
            });
    
            if(!ok){
                return {
                    ok: false,
                    error: "That user does not exist."
                };
            }

            const followers = await client
            .user.findUnique({
                where: {username}
            })
            .followers({
                take: 5,
                skip: lastId? 1: 0,
                ...(lastId && {cursor: {id:lastId} } ),
            });

            const totalFollowers =  await client.user.count({
                where: {
                    following: { some: {username} }
                },
            });

            return {
                ok: true,
                followers: followers,
                totalPages: Math.ceil(totalFollowers / 5),
            }

        },
    },
};

export default resolvers;

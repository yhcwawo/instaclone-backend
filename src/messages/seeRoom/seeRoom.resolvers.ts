import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
    Query: {
        seeRoom: protectResolver(async(_, { id } , { loggedInUser, client } ) => {

            const roomResult = await client.room.findFirst({
                where: {
                    id,
                    users: {
                        some: {
                            id: loggedInUser.id,
                        },
                    },
                },
            });

            return roomResult;

        }),  
        // end of protectResolver
    },
};


export default resolvers;
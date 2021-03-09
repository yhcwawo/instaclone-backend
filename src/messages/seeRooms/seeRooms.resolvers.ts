import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
    Query: {
        seeRooms: protectResolver(async(_,__, { loggedInUser, client } ) => {

            const roomsResult = await client.room.findMany({
                where: {
                    users: {
                        some: {
                            id: loggedInUser.id,
                        },
                    },
                },
      
            });

            return roomsResult;

        }),  
        // end of protectResolver
    },
};


export default resolvers;
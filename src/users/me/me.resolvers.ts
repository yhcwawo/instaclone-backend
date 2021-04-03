import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolvers: Resolvers = {
    Query: {
        me: protectResolver(async(_,__, { loggedInUser, client } ) => {

            const meResult = await client.user.findUnique({
                where: {
                    id: loggedInUser.id,
                },
      
            });

            return meResult;

        }),  
        // end of protectResolver
    },
};


export default resolvers;
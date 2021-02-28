import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolvers: Resolvers = {

    Query: {
        seeProfile: (_, {username}, {client} ) => 
        
        client.user.findUnique({
            where: {
                username: username,
            },
        }),
    },
};

export default resolvers;

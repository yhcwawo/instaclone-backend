import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolvers: Resolvers = {

    Query: {
        seeProfile: (_, {username}, {client} ) => 

        client.user.findUnique({
            where: {
                username: username,
            },
            include: {
                following: true,
                followers: true,
            }
        }),
    },
};

export default resolvers;

import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
    Query: {
        seeFeed: protectResolver(async(_, {offset} , { loggedInUser, client } ) => {

            const feedResult =  client.photo.findMany({
                take: 2,
                skip: offset,
                where: {
                    OR: [
                            {
                                user: {
                                    followers: {
                                        some: {
                                            id: loggedInUser.id,
                                        },
                                    },
                                },
                            },
                            {
                                userId: loggedInUser.id,
                            },
                    ],
                },
                orderBy: {
                    createdAt: "desc",
                }
            });

            return feedResult;

        }),  
        // end of protectResolver
    },
};


export default resolvers;
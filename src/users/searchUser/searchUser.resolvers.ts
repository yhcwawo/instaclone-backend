import { Resolvers } from "../../types";

const resolvers: Resolvers = {

    Query: {
        searchUser: async (_, {keyword}, {client} ) => {
            const users = await client.user.findMany({
                where:{
                    username: {
                        startsWith: keyword.toLowerCase(),
                    },
                },
            
            });

            return users;


        },
    }
}

export default resolvers;

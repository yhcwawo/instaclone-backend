import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        seeHashtag: (_,{ hashtag }, { client } ) => {
 
            const hashtagResult =  client.hashtag.findUnique({
                where: {
                    hashtag,
                }
            });

            return hashtagResult;
        
        },

    }
};


export default resolvers;
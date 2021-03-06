import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        searchPhotos: (_,{ keyword }, { client } ) => {
 
            const photosResult =  client.photo.findMany({
                where: {
                    caption: {
                        startsWith: keyword,
                    },
                },
            });

            return photosResult;
        
        },

    }
};


export default resolvers;
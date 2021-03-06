import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        seePhoto: (_,{ id }, { client } ) => {
 
            const photoResult =  client.photo.findUnique({
                where: {
                    id,
                }
            });

            return photoResult;
        
        },

    }
};


export default resolvers;
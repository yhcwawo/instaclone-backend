import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        seePhotoComments: (_,{ id }, { client } ) => {
            return client.comment.findMany({
                where: {
                    photoId: id,
                },
                orderBy: {
                    createdAt: "desc"
                },
            });
        },
    },
};

export default resolvers;
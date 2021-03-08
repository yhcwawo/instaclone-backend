import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
    Mutation: {
        editComment: protectResolver(async(_,{ id, payload }, { loggedInUser, client } ) => {
            const comment =  await client.comment.findUnique({
                where: {
                    id,
                },
            });

            if(!comment){
                return {
                    ok: false,
                    error: "Comment not found.",
                };
            } else if(comment.userId !== loggedInUser.id){
                return {
                    ok: false,
                    error: "Not authorized.",
                };
            } else {
                await client.comment.update({
                    where: {
                        id,
                    },
                    data: {
                        payload: payload,
                    }
                });
                return {
                    ok: true,
                };
            }

        },
        ),  
        // end of protectResolver
    },
};


export default resolvers;
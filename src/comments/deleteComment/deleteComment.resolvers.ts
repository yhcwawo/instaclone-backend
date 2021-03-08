import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
    Mutation: {
        deleteComment: protectResolver(async(_,{ id }, { loggedInUser, client } ) => {
            const comment = await client.comment.findUnique({
                where: {
                    id,
                },
                select: {
                    userId: true,
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
                await client.comment.delete({
                    where: {
                        id,
                    },
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
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

const resolvers: Resolvers = {
    Mutation: {
        uploadPhoto: protectResolver(async(_,{ file, caption,}, { loggedInUser, client } ) => {

            let hashtagObj = null;

            if(caption){
                hashtagObj = processHashtags(caption);
            }
            
            // get or create Hashtags
            return client.photo.create({
                data: {
                    file,
                    caption,
                    user: {
                        connect: {
                            id: loggedInUser.id,
                        },
                    },
                    ...(hashtagObj.length > 0 && {
                        hashtags: {
                            connectOrCreate: hashtagObj,
                        },
                    }), 
                },
            });


            // save the photo with the parsed hashtags
            // add the photo to the hashtags

            //file upload part Start

            //file upload part End
        },
        ),  
        // end of protectResolver

    },
};


export default resolvers;
import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";
import { protectResolver } from "../users.utils";
import {createWriteStream} from "fs";

const resolvers: Resolvers = {
    Mutation: {
        editProfile: protectResolver(async (
            _,
            {
            firstName,
            lastName,
            username,
            email,
            password:newPassword,
            bio,
            avatar,
            },
            {loggedInUser, client }
        
        ) => {
            
            //file upload part Start
            let avatarUrl = null;
            if(avatar){
                const {filename, createReadStream} = await avatar;
                const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`
                const readStream =  createReadStream();
                const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
                readStream.pipe(writeStream);
                avatarUrl = `http://localhost:4000/static/${newFilename}`
            }
            //file upload part End

            let uglyPassword = null;
            if(newPassword){
                uglyPassword = await bcrypt.hash(newPassword, 10)
            }

            const updatedUser = await client.user.update(
                {where:{
                    id : loggedInUser.id,
                },
                
            data:{
                firstName,
                lastName,
                username,
                email,
                bio,
                ...(uglyPassword && {password: uglyPassword}),
                ...(avatarUrl && { avatar : avatarUrl }),
            },
        });
        if(updatedUser.id){
            return{
                ok : true,
            }
        } else {
            return {
                ok : false,
                error : "Could not update Profile.",
            }
        }

        },
        
        )

    },
};


export default resolvers;
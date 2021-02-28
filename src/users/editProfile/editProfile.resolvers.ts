import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";
import { protectResolver } from "../users.utils";
import {createWriteStream} from "fs";

console.log(process.cwd());

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

            const {filename, createReadStream} = await avatar;
            const readStream =  createReadStream();
            const writeStream = createWriteStream(process.cwd() + "/uploads/" + filename);
            readStream.pipe(writeStream);
            //file upload parts
            
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
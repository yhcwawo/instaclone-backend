import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";

const resolvers: Resolvers = {
    Mutation: {
        createAccount: async(_,{
            firstName,
            lastName,
            username,
            email,
            password,
        }, {client} ) => {
            try {
                
            //check if username or email on DB
            const existingUser = await client.user.findFirst({
                where: {
                    OR: [
                        {
                            username
                        },
                        {
                            email
                        }
                    ]
                },
            });
            
            if(existingUser){
                throw new Error("This username/email is already taken.");
            }

            // hash password
            const uglyPassword = await bcrypt.hash(password, 10);

            // save and return the user
            return client.user.create({data: {
                username,
                email,
                firstName, 
                lastName,
                password:uglyPassword,
            },
        });

            } catch (error) {
                return error;
            }

        },

    },
};


export default resolvers;
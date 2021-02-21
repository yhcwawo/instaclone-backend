import client from "../../client";
import bcrypt from "bcrypt";

export default{
    Mutation: {
        createAccount: async(_,{
            firstName,
            lastName,
            username,
            email,
            password,
        }) => {
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
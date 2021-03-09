import client from "../client"

export default {
    Room: {
        users: ({ id }) => {
            return client.room.findUnique({
                where: {
                    id: id,
                }
            }).users();
        },

        messages: ({ id }) => {
            return client.message.findMany({
                where: {
                    roomId: id,
                }
            });
        },

        unreadTotal: ({ id }, _, { loggedInUser }) => {
            if(!loggedInUser){
                return 0;
            }

            return client.message.count({
                where: {
                    read: false,
                    roomId: id,
                    user: {
                        id: {
                            not: loggedInUser.id,      
                        },
                    },
                },
            });
        },
        
        
        
    },
    //Room Code End

    Message: {
        user: ({ id }) => {
            return client.message.findUnique({
                where: {
                    id: id,
                }
            }).user();
        },


    
        
    },
    //Message Code End



};

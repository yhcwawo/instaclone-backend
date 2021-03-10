require("dotenv").config();
import * as http from "http";
import * as express from "express"
import * as logger from "morgan";
import { ApolloServer } from 'apollo-server-express';
import client from './client';
import {typeDefs, resolvers} from './schema';
import { getUser, protectResolver } from './users/users.utils';

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async(ctx) => {
    if(ctx.req){
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
        client,
        protectResolver,
      };
    } else {
      const {
        connection: {context},
      } = ctx;

      return {
        loggedInUser:  context.loggedInUser
      };
    }
  },
  subscriptions: {
    onConnect: async(params) => {
      const token = params['token'];

      if(!token){
        throw new Error("You can't listen.");
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };

    },
  },
});

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({app});
app.use("/static",express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Apollo Server ready at http://localhost:${PORT}/graphql`);
});




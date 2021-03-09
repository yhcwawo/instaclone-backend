require("dotenv").config();
import * as http from "http";
import * as express from "express"
import * as logger from "morgan";
import { ApolloServer } from 'apollo-server-express';
import client from './client';
import {typeDefs, resolvers} from './schema';
import { getUser, protectResolver } from './users/users.utils';
import pubsub from "./pubsub";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({req}) => {
    if(req){
      return {
        loggedInUser: await getUser(req.headers.token),
        client,
        protectResolver,
      };
    }

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




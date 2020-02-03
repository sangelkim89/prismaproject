import "./env";
import { GraphQLServer } from "graphql-yoga";
import morgan from "morgan";
import resolvers from "./resolvers";
// import { sendSecretMail } from "./utils";
import "./passport";
import { authenticateJwt } from "./passport";
import { prisma } from "../generated/prisma-client";
import { isAuthenticated } from "../middlewares";

// sendSecretMail("sangelkim89@gmail.com", "123");

const PORT = process.env.PORT || 4000;
const server = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers,
  context: ({ request }) => ({ request, isAuthenticated })
});

//use middleware
server.express.use(morgan("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`server running on  http://localhost:${PORT}`)
);

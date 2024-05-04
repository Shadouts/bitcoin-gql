require("dotenv").config();

import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import schema from "./schema";
import resolvers from "./resolvers";
import compression from "compression";

const app = express();
const graphiql: boolean = Boolean(parseInt(process.env.GRAPHIQL || "0") > 0);

app.use(cors({ origin: true }));
app.use(compression());

app.use(
  "/btc-gql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql,
  })
);

app.listen(process.env.BITCOIN_GQL_PORT || 3000, () => {
  console.log(`BitcoinGQL server started!`);
  if (graphiql) {
    console.log(`GraphiQL IDE available at /btc-gql`);
  }
});

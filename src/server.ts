require('dotenv').config();

import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import schema from './schema';
import resolvers from './resolvers';
const compression = require('compression'); // Won't import.

const app = express();
const graphiql:boolean = Boolean( parseInt(process.env.GRAPHIQL) > 0 );

app.use( cors({ origin: true }) );
app.use(compression());

app.use('/btc-gql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql
}));

app.listen(
  3000,
  () => {
    console.log(`BitcoinGQL server started!`);
    if (graphiql) {
      console.log(
        `GraphiQL IDE available at /btc-gql`
      );
    }
  }
);

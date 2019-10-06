require('dotenv').config();

import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import schema from './schema';
import resolvers from './resolvers';

const app = express();

const graphiql:boolean = Boolean( parseInt(process.env.GRAPHIQL) > 0 );

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

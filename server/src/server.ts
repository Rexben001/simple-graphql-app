import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import Express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { BlocksResolver } from './resolvers/Blocks';

const PORT = process.env.PORT || 3333;

const main = async () => {
  const schema = await buildSchema({
    resolvers: [BlocksResolver],
    emitSchemaFile: true,
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  const app = Express();

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready and listening at ==> http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};

main().catch((error) => {
  console.log(error, 'error');
});

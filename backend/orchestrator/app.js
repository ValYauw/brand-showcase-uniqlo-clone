require('dotenv').config();

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { formatError } = require('./utils/errorHandler');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  formatError: formatError
});

startStandaloneServer(server, {
  context: async({req, res}) => {
    const { access_token } = req.headers;
    return { access_token };
  },
  listen: { 
    port: process.env.PORT || 4000
  }
})
  .then(result => console.log(`Listening on ${result.url}`))
  .catch(console.log);
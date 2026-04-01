require('dotenv').config();
console.log('1 dotenv loaded');

const express = require('express');
console.log('2 express loaded');

const { ApolloServer } = require('apollo-server-express');
console.log('3 apollo loaded');

const mongoose = require('mongoose');
console.log('4 mongoose loaded');

const cors = require('cors');
console.log('5 cors loaded');

const typeDefs = require('./schema/typeDefs');
console.log('6 typeDefs loaded');

const resolvers = require('./resolvers');
console.log('7 resolvers loaded');

async function startServer() {
  console.log('8 Starting server...');

  const app = express();
  app.use(cors());
  app.use(express.json());

  console.log('9 Connecting to MongoDB...');

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('10 MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  console.log('11 Apollo server created');

  await server.start();
  console.log('12 Apollo started');

  server.applyMiddleware({ app });

  app.listen(process.env.PORT || 10000, () => {
    console.log(`Server running at ${server.graphqlPath}`);
  });
}

startServer();
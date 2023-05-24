require('dotenv').config()
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { DataSource, EntityTarget } from "typeorm";
import { startStandaloneServer } from '@apollo/server/standalone';

import CountryRepository from "./repository/Country.repository";
import CountryResolver from "./resolver/Country.resolver";

const database = new DataSource({
  type : "sqlite",
  database: ":memory:",
  // type: "postgres",
  // url: `postgres://postgres:${process.env.DATABASE_PASSWORD}@localhost:5455/postgres`,
  //dropSchema: true,
  synchronize: true,
  entities: [__dirname + `/entity/*.entity.{js,ts}`],
  logging: ["query", "error"],
})

async function getDatabase() {
  try {
    await database.initialize();
    console.log(`Db initialized`)
  } catch (err : any) {
    console.error(`dbConnectionManager - error initializing db. Error: ${err.message}`)
  }
  return database
}

async function getRepository(entity: EntityTarget<any>) {
  return (await getDatabase()).getRepository(entity);
}

async function initializeDatabaseRepositories() {
  await CountryRepository.initializeRepository();
}

async function closeConnection() {
  await database.destroy();
}

const startServer = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [CountryResolver],
      validate: { forbidUnknownValues: false }  //class-validator
    }),
    csrfPrevention: true,
    cache: "bounded",
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })
  
  await initializeDatabaseRepositories();
  
  await CountryRepository.initializeCountries();

  console.log(`🚀 Server ready at ${url}`);
};

startServer();

export {
  getRepository,
};


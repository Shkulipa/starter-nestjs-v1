import { config } from 'dotenv';
import { mongoMigrateCli } from 'mongo-migrate-ts';

const ENV = process.env.NODE_ENV;
config({ path: !ENV ? '.env' : `.env.${ENV}` });

const { MONGODB_URL, MONGODB_DB } = process.env;

mongoMigrateCli({
  uri: MONGODB_URL,
  database: MONGODB_DB,
  migrationsDir: 'src/database/seeds',
  migrationsCollection: 'seeds',
});

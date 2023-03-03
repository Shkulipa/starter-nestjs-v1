import { Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';

export class test11677838512189 implements MigrationInterface {
  public async up(db: Db) {
    await db.collection('users').insertOne({ username: 'admin' });
  }

  public async down(db: Db) {
    await db.collection('users').deleteOne({ username: 'admin' });
  }
}

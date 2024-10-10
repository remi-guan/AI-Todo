import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';

const sqliteDB = new Database('sqlite.db', (err) => {
  if (err) {
    console.error('Could not open database', err);
  } else {
    sqliteDB.run('PRAGMA foreign_keys = ON'); // Enable foreign key constraints
  }
});

export const db = drizzle(sqliteDB);

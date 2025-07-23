import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { must } from '@/lib/shared';
import { schema } from './schemas';

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn =
  globalForDb.conn ??
  postgres(must(process.env.DATABASE_URL, 'DATABASE_URL is not set'));
if (process.env.NODE_ENV !== 'production') {
  globalForDb.conn = conn;
}

export const db = drizzle(conn, { schema });

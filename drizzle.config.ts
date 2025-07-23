import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import { must } from '@/lib/shared';

config({ path: '.env' });

export default defineConfig({
  schema: './src/db/schemas',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: must(process.env.DATABASE_URL, 'DATABASE_URL is not set'),
  },
});

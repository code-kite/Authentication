import type { Config } from 'drizzle-kit';

export default {
 schema: './src/database/schema.ts',
 // schema file is linked in the drizzle.config.ts so 
 // that drizzle kit can use it to migrate schema.
 
 out: './src/drizzle', // The location where youn sql migration files to get generatred
  dialect: 'sqlite',
 driver: 'expo', // <--- very important
} satisfies Config;
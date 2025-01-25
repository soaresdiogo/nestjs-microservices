import { env } from '@/infra/env/env';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  public db: ReturnType<typeof drizzle>;

  constructor() {
    this.pool = new Pool({
      connectionString: env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    this.db = drizzle(this.pool);
  }

  async onModuleInit() {
    console.log('Connecting to the database...');
    await this.pool.connect();
    console.log('Connected to the database.');
  }

  async onModuleDestroy() {
    console.log('Closing database connection...');
    await this.pool.end();
    console.log('Database connection closed.');
  }
}
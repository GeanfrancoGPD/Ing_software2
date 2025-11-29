import { Pool } from 'pg';

export class DB {
  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      max: process.env.DB_MAX || 20,
      idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT || 30000,
      connectionTimeoutMillis: process.env.DB_CONN_TIMEOUT || 2000,
      ssl: { rejectUnauthorized: false },
    });
  }

  async executeQuery(query) {
    const result = await this.pool.query(query);
    return result.rows;
  }

  async executeQuery(query, params) {
    const result = await this.pool.query(query, params);
    return result.rows;
  }
}

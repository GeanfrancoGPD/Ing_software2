import { Pool } from "pg";
import fs from "fs";
import { log } from "console";

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

  init() {
    this.loadQueries();
  }

  async loadQueries() {
    try {
      const data = fs.readFileSync("./data/query.json", "utf8");
      this.queries = JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar query.json:", error);
    }
  }

  async executeQuery(query) {
    const result = await this.pool.query(query);
    return result.rows;
  }

  async executeQuery(query, params) {
    const result = await this.pool.query(query, params);
    return result.rows;
  }

  async excecuteNameQuery(nameQuery, params = {}) {
    try {
      const query = this.queries[nameQuery].query;
      const values = Object.values(params);

      const result = await this.pool.query(query, values);
      console.log("resultado:", result.rows);

      return result.rows;
    } catch (error) {
      console.error("Error no se encuentra la consulta:", error);
    }
  }
}

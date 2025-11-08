import { Pool } from "pg";

export class DB{
    constructor(poolConfig){
        this.pool = new Pool({
            user : poolConfig.user,
            host : poolConfig.host,
            database : poolConfig.database,
            password : poolConfig.password,
            port : poolConfig.port,
            max : poolConfig.maxConnections,
            idleTimeoutMillis : poolConfig.idleTimeoutMillis,
            connectionTimeoutMillis : poolConfig.connectionTimeoutMillis
        })
    }

    async executeQuery(query){
        const result = await this.pool.query(query)
        return result.rows
    }

    async executeQuery(query, params){
        const result = await this.pool.query(query, params)
        return result.rows
    }
}
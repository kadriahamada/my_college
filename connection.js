const mysql2 = require("mysql2/promise");

class CONNECT_DB {
  constructor() {
    this._connect = null;
  }

  async connect() {
    this._connect = await mysql2.createConnection({
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
    });
  }

  async query(sql, params = []) {
    if (!this._connect) {
      await this.connect();
    }
    return this._connect.query(sql, params);
  }

  async execute(sql, params = []) {
    if (!this._connect) {
      await this.connect();
    }
    return this._connect.execute(sql, params);
  }
}

module.exports = CONNECT_DB;

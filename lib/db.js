import mysql from "mysql2/promise";

let pool;

export function getPool() {
  if (!pool) {
    let sslConfig = undefined;

    if (process.env.DB_CA) {
      sslConfig = {
        ca: Buffer.from(process.env.DB_CA, "base64").toString("utf-8"),
        rejectUnauthorized: true,
      };
    }

    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ssl: sslConfig,
    });
  }
  return pool;
}

// import mysql from "mysql2/promise";
// import fs from "fs";

// let pool;

// export function getPool() {
//   if (!pool) {
//     const sslConfig = {};

//     if (process.env.DB_CA) {
//       sslConfig.ca = Buffer.from(process.env.DB_CA, "base64").toString("utf-8");
//     } else if (process.env.DB_CA_PATH) {
//       sslConfig.ca = fs.readFileSync(process.env.DB_CA_PATH, "utf-8");
//     }

//     pool = mysql.createPool({
//       host: process.env.DB_HOST,
//       port: Number(process.env.DB_PORT || 28454),
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       waitForConnections: true,
//       connectionLimit: 10,
//       queueLimit: 0,
//       ssl: {
//         ...sslConfig,
//         rejectUnauthorized: true,
//       },
//     });
//   }
//   return pool;
// }

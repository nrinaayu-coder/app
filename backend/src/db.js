import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true,
});

export async function initSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id CHAR(36) PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(255) DEFAULT 'Admin',
      role VARCHAR(50) DEFAULT 'admin',
      created_at VARCHAR(40)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id CHAR(36) PRIMARY KEY,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title VARCHAR(500) NOT NULL,
      excerpt TEXT,
      image VARCHAR(1000),
      alt VARCHAR(500),
      date VARCHAR(10),
      meta_description TEXT,
      published TINYINT(1) NOT NULL DEFAULT 1,
      sections JSON,
      created_at VARCHAR(40),
      updated_at VARCHAR(40),
      INDEX idx_published_date (published, date)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS login_attempts (
      identifier VARCHAR(255) PRIMARY KEY,
      count INT NOT NULL DEFAULT 0,
      last_attempt VARCHAR(40),
      locked_until VARCHAR(40) NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS files (
      id CHAR(36) PRIMARY KEY,
      storage_path VARCHAR(500) NOT NULL UNIQUE,
      original_filename VARCHAR(500),
      content_type VARCHAR(100),
      size INT,
      is_deleted TINYINT(1) NOT NULL DEFAULT 0,
      uploaded_by VARCHAR(255),
      created_at VARCHAR(40)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
}

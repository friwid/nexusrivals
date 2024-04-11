const config = {
  host: import.meta.env.DB_HOST,
  port: import.meta.env.DB_PORT,
  user: import.meta.env.DB_USER,
  password: import.meta.env.DB_PASS,
  database: import.meta.env.DB_NAME
}

export default config

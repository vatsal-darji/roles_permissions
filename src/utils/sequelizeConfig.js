module.exports = {
  development: {
    username: process.env.USER_NAME,
    password: process.env.USER_PASSWORD,
    database: "roles_permissions",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: process.env.USER_NAME,
    password: process.env.USER_PASSWORD,
    database: "roles_permissions",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.USER_NAME,
    password: process.env.USER_PASSWORD,
    database: "roles_permissions",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

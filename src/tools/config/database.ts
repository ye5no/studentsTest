const prefix = (process.env.NODE_ENV === 'production') ? 'PROD_' : 'DEV_';

export default {
  type: 'postgres',
  host: process.env[`${prefix}TYPEORM_HOST`],
  username: process.env[`${prefix}TYPEORM_USERNAME`],
  password: process.env[`${prefix}TYPEORM_PASSWORD`],
  database: process.env[`${prefix}TYPEORM_DATABASE`],
  // tslint:disable-next-line:radix
  port: parseInt(process.env[`${prefix}TYPEORM_PORT`]),
  logging: process.env[`${prefix}TYPEORM_LOGGING`] === 'true',
  synchronize: process.env[`${prefix}TYPEORM_SYNCHRONIZE`] === 'true',
};

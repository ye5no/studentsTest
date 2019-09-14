const prefix = (process.env.NODE_ENV === 'production') ? 'PROD_' : 'DEV_';

export default {
  port: process.env[`${prefix}EXPRESS_PORT`],
};

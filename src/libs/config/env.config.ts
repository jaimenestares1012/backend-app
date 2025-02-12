import { EnvConfigurationType } from './types.config';

export const EnvConfiguration = (): EnvConfigurationType => ({
  environment: process.env.ENVIRONMENT,
  port: +process.env.PORT,
  admin: process.env.ADMIN,
  bd: {
    host: process.env.BD_HOST,
    port: +process.env.BD_PORT,
    database: process.env.BD_DATABASE,
    username: process.env.BD_USERNAME,
    password: process.env.BD_PASSWORD,
  },
});

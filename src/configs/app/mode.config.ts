import * as Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces/config-module-options.interface';

const ENV = process.env.NODE_ENV;

export const modeConfig: ConfigModuleOptions = {
  envFilePath: !ENV ? '.env' : `.env.${ENV}`,

  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('production', 'development', 'local'),
    PORT: Joi.number().required(),
    CLIENT_URL: Joi.string().required(),

    MONGODB_URL: Joi.string().required(),

    SMTP_HOST: Joi.string().required(),
    SMTP_PORT: Joi.number().required(),
    SMTP_USER: Joi.string().required(),
    SMTP_PASS: Joi.string().required(),

    SECRET_ACCESS: Joi.string().required(),
  }),

  validationOptions: {
    abortEarly: true,
  },
};

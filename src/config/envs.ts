import 'dotenv/config';
import * as joi from 'joi';

interface EnvVariables {
  PORT: number;
  STRIPE_SECRET: string;
  STRIPE_SUCCESS_URL: string;
  STRIPE_CANCEL_URL: string;
  STRIPE_ENDPOINTSECRET: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    STRIPE_SECRET: joi.string().required(),
    STRIPE_SUCCESS_URL: joi.string().required(),
    STRIPE_CANCEL_URL: joi.string().required(),
    STRIPE_ENDPOINTSECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config Validation Error ENV ${error}`);
}

const enVars: EnvVariables = value;

export const envs = {
  PORT: enVars.PORT,
  STRIPE_SECRET: enVars.STRIPE_SECRET,
  STRIPE_SUCCESS_URL: enVars.STRIPE_SUCCESS_URL,
  STRIPE_CANCEL_URL: enVars.STRIPE_CANCEL_URL,
  STRIPE_ENDPOINTSECRET: enVars.STRIPE_ENDPOINTSECRET,
};

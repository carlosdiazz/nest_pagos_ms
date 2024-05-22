import 'dotenv/config';
import * as joi from 'joi';

interface EnvVariables {
  PORT: number;
  STRIPE_SECRET: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    STRIPE_SECRET: joi.string().required(),
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
};

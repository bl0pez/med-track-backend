import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    JWT_SECRET: string;
    DATABASE_URL: string;
    JWT_EXPIRES_IN: string;
}

const envVarsSchema = joi.object({
    PORT: joi.number().default(3000),
    DATABASE_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRES_IN: joi.string().required(),
}).unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    databaseUrl: envVars.DATABASE_URL,
    jwtSecret: envVars.JWT_SECRET,
    jwtExpiresIn: envVars.JWT_EXPIRES_IN,
}
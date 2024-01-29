import { config } from 'dotenv';
import { resolve } from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';
console.log('envFile', envFile);

config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

// Load all environment variables from .env file

export const PORT = process.env.PORT || 8000;
export const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';
export const DATABASE_URL = process.env.DATABASE_URL || '';
console.log('DATABASE_URL', DATABASE_URL);

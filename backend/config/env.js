import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY'];
for (const key of required) {
  if (!process.env[key]) throw new Error(`Missing required environment variable: ${key}`);
}
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 4000;
export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const JWT_COOKIE_EXPIRES = Number(process.env.JWT_COOKIE_EXPIRES || 30);
export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5176,http://localhost:5176,http://localhost:3000,http://localhost:4000';
export const AI_API_KEY = process.env.AI_API_KEY || process.env.OPENAI_API_KEY || '';
export const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5176';
export const PASSWORD_RESET_REDIRECT_URL = process.env.PASSWORD_RESET_REDIRECT_URL || `${FRONTEND_URL}/forgot-password?status=sent`;
export const EMAIL_VERIFY_REDIRECT_URL = process.env.EMAIL_VERIFY_REDIRECT_URL || `${FRONTEND_URL}/verify-email`;

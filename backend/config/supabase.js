import { createClient } from '@supabase/supabase-js';
import { SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from './env.js';
import { logger } from '../utils/logger.js';

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
});

export const supabaseAuth = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
});

export const checkSupabaseConnection = async () => {
  const { error } = await supabase.from('profiles').select('id', { count: 'exact', head: true });
  if (error && error.code !== 'PGRST116') {
    logger.error('Supabase connection check failed', { message: error.message });
    throw error;
  }
  logger.info('Supabase Postgres connection ready');
  return true;
};

export default supabase;

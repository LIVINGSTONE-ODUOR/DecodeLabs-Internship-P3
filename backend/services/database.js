import supabase from '../config/supabase.js';
export class DatabaseError extends Error { constructor(message, details) { super(message); this.name = 'DatabaseError'; this.details = details; } }
export const assertNoError = ({ error, data }, message = 'Database operation failed') => { if (error) throw new DatabaseError(message, error); return data; };
export const paginate = async ({ table, select = '*', page = 1, limit = 20, filters = {}, orderBy = 'created_at', ascending = false }) => {
  const safePage = Math.max(Number(page) || 1, 1); const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 100); const from = (safePage - 1) * safeLimit; const to = from + safeLimit - 1;
  let query = supabase.from(table).select(select, { count: 'exact' });
  Object.entries(filters).forEach(([key, value]) => { if (value !== undefined && value !== null && value !== '') query = query.eq(key, value); });
  const { data, error, count } = await query.order(orderBy, { ascending }).range(from, to);
  if (error) throw new DatabaseError(`Failed to query ${table}`, error);
  return { data, pagination: { page: safePage, limit: safeLimit, total: count || 0, pages: Math.ceil((count || 0) / safeLimit) } };
};
export const insertOne = async (table, payload, select = '*') => assertNoError(await supabase.from(table).insert(payload).select(select).single(), `Failed to insert ${table}`);
export const updateOne = async (table, id, payload, select = '*') => assertNoError(await supabase.from(table).update(payload).eq('id', id).select(select).single(), `Failed to update ${table}`);
export const findOne = async (table, column, value, select = '*') => assertNoError(await supabase.from(table).select(select).eq(column, value).maybeSingle(), `Failed to fetch ${table}`);
export const transaction = async (callback) => callback(supabase);
export default { supabase, paginate, insertOne, updateOne, findOne, transaction };

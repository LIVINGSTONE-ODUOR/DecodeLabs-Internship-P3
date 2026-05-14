import supabase from '../config/supabase.js';

export const createAuthCookie = (res, token) => {
  if (!token) return;
  res.cookie('stoneTechToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: Number(process.env.JWT_COOKIE_EXPIRES || 30) * 24 * 60 * 60 * 1000
  });
};

export const clearAuthCookie = (res) => {
  res.clearCookie('stoneTechToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
};

export const toUserResponse = (profile, authUser = {}) => ({
  id: profile?.id || authUser.id,
  fullName: profile?.full_name || authUser.user_metadata?.full_name || authUser.email,
  email: profile?.email || authUser.email,
  role: profile?.role || 'client',
  isActive: profile?.is_active ?? true,
  avatarUrl: profile?.avatar_url || null,
  company: profile?.company || null,
  createdAt: profile?.created_at || authUser.created_at
});

export const getProfileById = async (userId) => {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
  if (error) throw error;
  return data;
};

export const upsertAuthProfile = async (authUser, fullName) => {
  const profilePayload = {
    id: authUser.id,
    email: authUser.email?.toLowerCase(),
    full_name: fullName || authUser.user_metadata?.full_name || authUser.email,
    role: authUser.app_metadata?.role || 'client',
    is_active: true
  };

  const { data, error } = await supabase
    .from('profiles')
    .upsert(profilePayload, { onConflict: 'id' })
    .select('*')
    .single();

  if (error) throw error;
  return data;
};

export const buildSessionResponse = ({ session, profile, authUser, requiresEmailConfirmation = false }) => ({
  token: session?.access_token || null,
  refreshToken: session?.refresh_token || null,
  expiresAt: session?.expires_at || null,
  requiresEmailConfirmation,
  user: toUserResponse(profile, authUser)
});

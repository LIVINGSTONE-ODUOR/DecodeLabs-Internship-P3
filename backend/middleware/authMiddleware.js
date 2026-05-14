import ApiResponse from '../utils/apiResponse.js';
import { supabaseAuth } from '../config/supabase.js';
import { getProfileById, toUserResponse, upsertAuthProfile } from '../services/authService.js';

const getBearerToken = (req) => {
  if (req.headers.authorization?.startsWith('Bearer ')) return req.headers.authorization.split(' ')[1];
  if (req.cookies?.stoneTechToken) return req.cookies.stoneTechToken;
  return null;
};

export const protect = async (req, res, next) => {
  try {
    const token = getBearerToken(req);
    if (!token) return ApiResponse.error(res, 'Authentication required', 401);

    const { data, error } = await supabaseAuth.auth.getUser(token);
    if (error || !data.user) return ApiResponse.error(res, 'Invalid or expired Supabase session', 401);

    const profile = (await getProfileById(data.user.id)) || (await upsertAuthProfile(data.user));
    if (!profile.is_active) return ApiResponse.error(res, 'User does not exist or is inactive', 401);

    req.authToken = token;
    req.authUser = data.user;
    req.user = toUserResponse(profile, data.user);
    return next();
  } catch (error) {
    return next(error);
  }
};

export const authorize = (allowedRoles = []) => (req, res, next) => {
  if (!req.user) return ApiResponse.error(res, 'Not authorized', 401);
  if (!allowedRoles.includes(req.user.role)) return ApiResponse.error(res, 'Permission denied', 403);
  return next();
};

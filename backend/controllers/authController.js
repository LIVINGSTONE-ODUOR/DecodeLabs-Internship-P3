import ApiResponse from '../utils/apiResponse.js';
import { supabaseAuth } from '../config/supabase.js';
import { buildSessionResponse, clearAuthCookie, createAuthCookie, getProfileById, upsertAuthProfile } from '../services/authService.js';
import { PASSWORD_RESET_REDIRECT_URL, EMAIL_VERIFY_REDIRECT_URL } from '../config/env.js';

const normalizeEmail = (email) => email.trim().toLowerCase();

export const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    const { data, error } = await supabaseAuth.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: { full_name: fullName }
      }
    });

    // Handle the case where Supabase returns an error about sending confirmation email
    // but the user was still created successfully
    const isEmailConfirmationError = error?.message?.includes('Error sending confirmation email');
    
    // If there's an error that's NOT about email confirmation, return the error
    if (error && !isEmailConfirmationError) {
      return ApiResponse.error(res, error.message || 'Registration failed', error.status || 400);
    }
    
    // If there's no error but also no user data, registration failed
    if (!error && !data?.user) {
      return ApiResponse.error(res, 'Registration failed', 400);
    }
    
    // For email confirmation errors, the user was created in Supabase Auth but we don't get the user data back
    // This is a known Supabase behavior - the user exists but we can't create the profile without the user ID
    if (isEmailConfirmationError) {
      // Return success without creating the profile - profile will be created on first login
      return ApiResponse.success(
        res,
        'Registration created. Please confirm your email before signing in.',
        {
          requiresEmailConfirmation: true,
          email: normalizedEmail,
          user: {
            email: normalizedEmail,
            fullName: fullName
          }
        },
        201
      );
    }

    const profile = await upsertAuthProfile(data.user, fullName);
    createAuthCookie(res, data.session?.access_token);

    return ApiResponse.success(
      res,
      data.session ? 'Registration successful' : 'Registration created. Please confirm your email before signing in.',
      buildSessionResponse({
        session: data.session,
        profile,
        authUser: data.user,
        requiresEmailConfirmation: !data.session
      }),
      201
    );
  } catch (error) {
    console.error('Auth register exception:', {
      message: error?.message,
      status: error?.status,
      statusCode: error?.statusCode,
      details: error?.details,
      error: error?.error,
      name: error?.name,
      stack: error?.stack
    });

    return ApiResponse.error(
      res,
      error?.message || 'Registration failed',
      error?.statusCode || error?.status || 500,
      {
        message: error?.message,
        status: error?.status,
        statusCode: error?.statusCode,
        details: error?.details,
        error: error?.error,
        name: error?.name,
        stack: error?.stack
      }
    );
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);
    const { data, error } = await supabaseAuth.auth.signInWithPassword({ email: normalizedEmail, password });

    if (error) return ApiResponse.error(res, 'Invalid email or password', 401);
    if (!data.user || !data.session) return ApiResponse.error(res, 'Unable to create Supabase session', 401);

    const profile = (await getProfileById(data.user.id)) || (await upsertAuthProfile(data.user));
    if (!profile.is_active) return ApiResponse.error(res, 'Account has been deactivated', 403);

    createAuthCookie(res, data.session.access_token);
    return ApiResponse.success(res, 'Login successful', buildSessionResponse({ session: data.session, profile, authUser: data.user }));
  } catch (error) {
    return next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const normalizedEmail = normalizeEmail(email);
    const { data, error } = await supabaseAuth.auth.resetPasswordForEmail(normalizedEmail, {
      redirectTo: PASSWORD_RESET_REDIRECT_URL
    });

    if (error) return ApiResponse.error(res, error.message || 'Unable to send password reset email', error.status || 400);
    return ApiResponse.success(res, 'If that account exists, a password reset email has been sent.', { status: data?.status || 'sent' });
  } catch (error) {
    return next(error);
  }
};

export const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    const normalizedEmail = normalizeEmail(email);
    const { data, error } = await supabaseAuth.auth.signInWithOtp({
      email: normalizedEmail,
      options: { emailRedirectTo: EMAIL_VERIFY_REDIRECT_URL }
    });

    if (error) return ApiResponse.error(res, error.message || 'Unable to send verification email', error.status || 400);
    return ApiResponse.success(res, 'Verification link sent. Please check your inbox.', { status: data?.status || 'sent' });
  } catch (error) {
    return next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    if (!req.user) return ApiResponse.error(res, 'User details not found', 404);
    return ApiResponse.success(res, 'User profile retrieved', { user: req.user });
  } catch (error) {
    return next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    clearAuthCookie(res);
    return ApiResponse.success(res, 'Signed out successfully', { ok: true });
  } catch (error) {
    return next(error);
  }
};

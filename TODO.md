- [ ] Investigate backend 500 on POST /api/v1/auth/register by inspecting logs and relevant auth code paths
- [x] Locate auth register flow (frontend SignUpForm -> AuthContext -> frontend/services/authService.js -> backend/routes/authRoutes.js -> backend/controllers/authController.js -> supabaseAuth.auth.signUp + upsertAuthProfile)
- [x] Read backend/logs/error.log to confirm prior Mongo connection issues (unrelated to register)
- [x] Patch backend/controllers/authController.js to return the real Supabase error instead of always failing as 500
- [x] Trigger a registration request and confirm API now returns a concrete error message: "Error sending confirmation email"
- [ ] Next: fix Supabase email/redirect configuration or resend verification config so confirmation emails can be sent


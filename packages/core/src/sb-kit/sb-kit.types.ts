import type { JSX } from 'react';
import type { NextRequest, NextResponse } from 'next/server';
import type { PasswordPolicy } from '../password-policy';
import type { AllowedEmailOtpLength } from '../email-otp';
import type { OAuthProvider } from '../oauth-provider';
import type { AuthWrapperProps, SignInProps } from '../components';
import type { MiddlewareClientFactory, ServerClientFactory } from '../supabase/supabase.types';
import type { SbKitOptions } from './schema';

/**
 * Defines route-level access control based on authentication state.
 * - onlyPublic: Routes that must NOT be accessible when the user is logged in
 * - onlyPrivate: Routes that must ONLY be accessible when the user is logged in
 */
export type RouteGuardPolicy = {
  onlyPublic?: string[];
  onlyPrivate?: string[];
};

/**
 * Fully normalized and validated configuration used by SbKit internally.
 * Built by merging user options with defaults.
 */
export type SbKitConfig = {
  authRoutes: AuthRoutes;
  redirectPolicy: RedirectPolicy;
  passwordPolicy: PasswordPolicy;
  emailOtpLength: AllowedEmailOtpLength;
  routeGuardPolicy?: RouteGuardPolicy;
  oauthProviders?: Partial<Record<OAuthProvider, { buttonText: string }>>;
};

/**
 * Auth-related routes.
 */
export type AuthRoutes = {
  signIn: string;
  signUp: string;
  setPassword: string;
  forgotPassword: string;
  oauthCallback: string;
};

/**
 * Defines redirect behavior for authentication flows.
 * Used to validate redirect targets after completing authentication.
 *
 * - `allowedHosts`: List of allowed hosts (hostname with optional port).
 *   e.g. ['app.example.com', 'localhost:3000']
 *
 * - `blockedPaths`: List of disallowed redirect paths. Each must start with `/`.
 *    If the redirect path starts with any of these, it will be rejected.
 *
 * - `defaultPathAfterAuth`: Default redirect path after authentication (must start with `/`)
 *    used when no `redirect_to` param is provided or the given path is invalid.
 */
export type RedirectPolicy = {
  allowedHosts: string[];
  blockedPaths: string[];
  defaultPathAfterAuth: string;
};

/**
 * The main client returned by `sbKitClient()`.
 */
export type SbKitClient = {
  /**
   * Protects routes using authentication state.
   * Should be called in `middleware.ts` to enforce public/private access.
   */
  routeGuard: (request: NextRequest) => Promise<NextResponse>;
  /**
   * Handles OAuth callback requests.
   * Used in Route handlers like `/api/auth/callback` to finalize OAuth authentication flow.
   */
  callbackHandler: (request: Request) => Promise<NextResponse>;

  /**
   * React components configured with SbKit.
   */
  components: {
    /**
     * Sign-in component.
     * Requires `searchParams` for redirect handling.
     */
    SignIn: (props: Pick<SignInProps, 'searchParams'>) => JSX.Element;
    /**
     * Sign-up component.
     */
    SignUp: () => JSX.Element;
    /**
     * Set new password component for authenticated users.
     */
    SetPassword: () => JSX.Element;
    /**
     * Component to request a password reset email.
     */
    ForgotPassword: () => JSX.Element;
    /**
     * Applies shared auth page layout and mounts toaster (Sonner).
     */
    AuthWrapper: (props: AuthWrapperProps) => JSX.Element;
  };
};

/**
 * Arguments required to initialize `sbKitClient()`.
 * Supabase client factories and optional config overrides.
 */
export type SbKitClientInit = {
  supabaseClients: {
    server: ServerClientFactory;
    middleware: MiddlewareClientFactory;
  };
  options?: SbKitOptions;
};

// Erases the calling user's Supabase account: the auth user and, through `on delete cascade`, their
// public.profiles row. Called by "Delete everything on this device" (src/lib/auth.ts, deleteAccount).
//
// Deno, not the app's TypeScript: excluded from the app's tsconfig and lint.
// Deploy with `supabase functions deploy delete-account` (keep verify_jwt on, the default).
//
// auth: 'user' makes withSupabase verify the caller's JWT (guest/anonymous users included) before this
// handler runs, and answers CORS preflight for the web build. The id comes from the verified token, never
// from the request body, so a caller can only delete themself.
import { withSupabase } from 'npm:@supabase/server@1.9.2';

export default {
  fetch: withSupabase({ auth: 'user' }, async (req, ctx) => {
    if (req.method !== 'POST') {
      return Response.json({ error: 'method_not_allowed' }, { status: 405 });
    }
    const id = ctx.userClaims?.id;
    if (!id) {
      return Response.json({ error: 'no_user' }, { status: 401 });
    }

    // Hard delete: nothing is kept. A user who is already gone counts as deleted.
    const { error } = await ctx.supabaseAdmin.auth.admin.deleteUser(id);
    if (error && error.status !== 404) {
      console.error('delete-account failed', error.status, error.message);
      return Response.json({ error: 'delete_failed' }, { status: 500 });
    }
    return Response.json({ deleted: true });
  }),
};

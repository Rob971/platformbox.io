import { createClient } from "@/lib/supabase";
import { getEngagement, isWhitelisted } from "@/lib/projects";
import { EngagementDashboard } from "@/components/portal/engagement-dashboard";
import { LoginEntry } from "@/components/portal/login-entry";

export const dynamic = "force-dynamic";

export default async function PortalPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // State 1: Not authenticated → show login entry
  if (!user?.email) {
    return <LoginEntry />;
  }

  // State 2: Authenticated but not whitelisted → pending activation
  if (!isWhitelisted(user.email)) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">PlatformBox</p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white">
          Your account is pending activation
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
          We&apos;ll notify you when your engagement portal is ready.
          If you just completed your Architecture Audit, expect access within 24 hours.
        </p>
        <a
          href="mailto:roberto@platformbox.io"
          className="mt-6 text-sm text-zinc-400 underline underline-offset-2 transition-colors hover:text-white"
        >
          roberto@platformbox.io
        </a>
      </div>
    );
  }

  // State 3: Authenticated + whitelisted → show engagement dashboard
  const engagement = getEngagement(user.email);
  if (!engagement) {
    return <p className="p-24 text-center text-zinc-500">Engagement not found.</p>;
  }

  return <EngagementDashboard engagement={engagement} />;
}
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OpsClient from './OpsClient';

/** Set NEXT_PUBLIC_OPS_ENABLED=true for local dev only — never in production deploy. */
const opsEnabled = process.env.NEXT_PUBLIC_OPS_ENABLED === 'true';

export const metadata: Metadata = {
  title: 'Operations Dashboard',
  description: 'Seventh City Press daily management sweep — prioritized tasks, team reports, and platform health.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function OpsPage() {
  if (!opsEnabled) notFound();
  return <OpsClient />;
}

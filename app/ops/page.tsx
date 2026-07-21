import type { Metadata } from 'next';
import OpsClient from './OpsClient';

export const metadata: Metadata = {
  title: 'Operations Dashboard',
  description: 'Seventh City Press daily management sweep — prioritized tasks, team reports, and platform health.',
  robots: { index: false, follow: false },
};

export default function OpsPage() {
  return <OpsClient />;
}

'use client';

import { useState } from 'react';
import DailySweep from '@/components/ops/DailySweep';
import TeamPanel from '@/components/ops/TeamPanel';
import FullTaskBoard from '@/components/ops/FullTaskBoard';
import styles from '@/components/ops/ops.module.css';

const TABS = ['Daily Sweep', 'Management Team', 'Full Board'] as const;
type Tab = (typeof TABS)[number];

export default function OpsClient() {
  const [activeTab, setActiveTab] = useState<Tab>('Daily Sweep');
  const now = new Date();
  const timestamp = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.opsPage}>
      <div className={styles.opsHero}>
        <h1 className={styles.opsHeroTitle}>
          Seventh City Press — Operations Dashboard
        </h1>
        <p className={styles.opsHeroSubtitle}>
          Your management team has swept every business area. Below are their reports,
          prioritized actions, and the full task board. Start with the Daily Sweep —
          it shows you the five most important things to do right now.
        </p>
        <div className={styles.opsTimestamp}>
          Last sweep: {timestamp}
        </div>
      </div>

      <div className={styles.tabBar}>
        {TABS.map(tab => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Daily Sweep' && <DailySweep />}
      {activeTab === 'Management Team' && <TeamPanel />}
      {activeTab === 'Full Board' && <FullTaskBoard />}
    </div>
  );
}

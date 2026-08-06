'use client';

import { getDailyFocus, getSweepStats, ROLE_META, type SweepTask } from '@/lib/data/ops-sweep';
import styles from './ops.module.css';

function priorityBadge(p: string) {
  const cls =
    p === 'P0' ? styles.badgeP0 :
    p === 'P1' ? styles.badgeP1 :
    p === 'P2' ? styles.badgeP2 : styles.badgeP3;
  return <span className={`${styles.badge} ${cls}`}>{p}</span>;
}

function statusBadge(s: string) {
  const cls =
    s === 'done' ? styles.badgeDone :
    s === 'open' ? styles.badgeOpen :
    s === 'verify' ? styles.badgeVerify :
    s === 'blocked' ? styles.badgeBlocked :
    s === 'deferred' ? styles.badgeDeferred : styles.badgeOpen;
  const label = s.replace('_', ' ');
  return <span className={`${styles.badge} ${cls}`}>{label}</span>;
}

function TaskRow({ task }: { task: SweepTask }) {
  const roleMeta = ROLE_META[task.role];
  return (
    <div className={styles.taskRow}>
      <div className={styles.taskHeader}>
        {priorityBadge(task.priority)}
        {statusBadge(task.status)}
        <span className={styles.taskRoleTag} style={{ color: roleMeta.color }}>
          {roleMeta.icon} {roleMeta.label}
        </span>
      </div>
      <h4 className={styles.taskTitle}>{task.title}</h4>
      <p className={styles.taskDetail}>{task.detail}</p>
      <div className={styles.taskMeta}>
        <span className={styles.taskOwner}>{task.owner}</span>
        <span className={styles.taskEffort}>{task.effort}</span>
        {task.dueContext && <span className={styles.taskDue}>{task.dueContext}</span>}
      </div>
      {task.command && (
        <code className={styles.taskCommand}>{task.command}</code>
      )}
    </div>
  );
}

export default function DailySweep() {
  const focus = getDailyFocus();
  const stats = getSweepStats();

  return (
    <section className={styles.sweepSection}>
      <div className={styles.sweepHeader}>
        <h2 className={styles.sweepTitle}>Daily Sweep</h2>
        <p className={styles.sweepSubtitle}>
          Your team reviewed everything. Here is what needs attention today.
        </p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statNumber} style={{ color: '#ef4444' }}>{stats.open}</div>
          <div className={styles.statLabel}>Open Tasks</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber} style={{ color: '#22c55e' }}>{stats.done}</div>
          <div className={styles.statLabel}>Completed</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber} style={{ color: '#f59e0b' }}>{stats.verify}</div>
          <div className={styles.statLabel}>Need Verify</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber} style={{ color: '#06b6d4' }}>{stats.platformsLive}</div>
          <div className={styles.statLabel}>Platforms Live</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber} style={{ color: '#ef4444' }}>{stats.platformsOpen}</div>
          <div className={styles.statLabel}>Platforms Open</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.total}</div>
          <div className={styles.statLabel}>Total Items</div>
        </div>
      </div>

      <div className={styles.focusSection}>
        <h3 className={styles.focusSectionTitle}>Top 5 — Do These First</h3>
        <div className={styles.taskList}>
          {focus.map(task => (
            <TaskRow key={task.id} task={task} />
          ))}
        </div>
      </div>
    </section>
  );
}

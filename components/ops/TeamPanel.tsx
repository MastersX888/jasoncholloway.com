'use client';

import { useState } from 'react';
import {
  teamBriefs,
  getTasksByRole,
  getPlatformsByRole,
  type TeamRole,
  type SweepTask,
  type PlatformNode,
} from '@/lib/data/ops-sweep';
import styles from './ops.module.css';

const STATUS_COLORS: Record<string, string> = {
  live: '#22c55e',
  pending: '#f59e0b',
  open: '#ef4444',
  done: '#06b6d4',
  deferred: '#6b7280',
  wip: '#a855f7',
  blocked: '#ef4444',
  verify: '#f59e0b',
  in_progress: '#3b82f6',
};

function PlatformDot({ platform }: { platform: PlatformNode }) {
  const color = STATUS_COLORS[platform.status] ?? '#6b7280';
  return (
    <div className={styles.platformCard} style={{ borderLeftColor: color }}>
      <div className={styles.platformHeader}>
        <span className={styles.platformDot} style={{ backgroundColor: color }} />
        <span className={styles.platformName}>{platform.name}</span>
        <span className={styles.platformStatus} style={{ color, backgroundColor: color + '18' }}>
          {platform.status}
        </span>
      </div>
      <div className={styles.platformType}>{platform.type}</div>
      {platform.note && <div className={styles.platformNote}>{platform.note}</div>}
    </div>
  );
}

function TaskCompact({ task }: { task: SweepTask }) {
  const pCls =
    task.priority === 'P0' ? styles.badgeP0 :
    task.priority === 'P1' ? styles.badgeP1 :
    task.priority === 'P2' ? styles.badgeP2 : styles.badgeP3;
  const sCls =
    task.status === 'done' ? styles.badgeDone :
    task.status === 'open' ? styles.badgeOpen :
    task.status === 'verify' ? styles.badgeVerify :
    task.status === 'deferred' ? styles.badgeDeferred : styles.badgeOpen;

  return (
    <div className={`${styles.taskCompact} ${task.status === 'done' ? styles.taskDone : ''}`}>
      <div className={styles.taskCompactBadges}>
        <span className={`${styles.badge} ${pCls}`}>{task.priority}</span>
        <span className={`${styles.badge} ${sCls}`}>{task.status.replace('_', ' ')}</span>
      </div>
      <div className={styles.taskCompactTitle}>{task.title}</div>
      <div className={styles.taskCompactMeta}>
        <span>{task.owner}</span>
        <span>{task.effort}</span>
      </div>
    </div>
  );
}

function TeamCard({ role }: { role: TeamRole }) {
  const [expanded, setExpanded] = useState(false);
  const brief = teamBriefs.find(b => b.role === role);
  const roleTasks = getTasksByRole(role);
  const rolePlatforms = getPlatformsByRole(role);

  if (!brief) return null;

  const openCount = roleTasks.filter(t => t.status === 'open' || t.status === 'verify' || t.status === 'blocked').length;
  const doneCount = roleTasks.filter(t => t.status === 'done').length;

  return (
    <div className={styles.teamCard}>
      <button
        className={styles.teamCardHeader}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className={styles.teamCardLeft}>
          <span className={styles.teamIcon}>{brief.icon}</span>
          <div>
            <h3 className={styles.teamName}>{brief.title}</h3>
            <p className={styles.teamSubtitle}>{brief.subtitle}</p>
          </div>
        </div>
        <div className={styles.teamCardRight}>
          <div className={styles.teamGrade} style={{ color: brief.gradeColor }}>
            {brief.grade}
          </div>
          <div className={styles.teamCounts}>
            {openCount > 0 && (
              <span className={styles.countBadgeOpen}>{openCount} open</span>
            )}
            {doneCount > 0 && (
              <span className={styles.countBadgeDone}>{doneCount} done</span>
            )}
          </div>
          <span className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`}>
            &#9662;
          </span>
        </div>
      </button>

      {expanded && (
        <div className={styles.teamCardBody}>
          <div className={styles.teamSummary}>{brief.summary}</div>

          <div className={styles.teamColumns}>
            <div className={styles.teamColumn}>
              <h4 className={styles.teamColumnTitle} style={{ color: '#22c55e' }}>Strengths</h4>
              <ul className={styles.checkList}>
                {brief.strengths.map((s, i) => (
                  <li key={i} className={styles.checkItem}>
                    <span className={styles.checkMark}>&#10003;</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.teamColumn}>
              <h4 className={styles.teamColumnTitle} style={{ color: '#ef4444' }}>Gaps</h4>
              <ul className={styles.checkList}>
                {brief.gaps.map((g, i) => (
                  <li key={i} className={styles.checkItem}>
                    <span className={styles.crossMark}>&#10007;</span> {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.recommendation}>
            <span className={styles.recIcon}>&#10140;</span>
            <p>{brief.topRecommendation}</p>
          </div>

          {rolePlatforms.length > 0 && (
            <div className={styles.teamPlatforms}>
              <h4 className={styles.teamColumnTitle}>Platforms</h4>
              <div className={styles.platformGrid}>
                {rolePlatforms.map(p => (
                  <PlatformDot key={p.id} platform={p} />
                ))}
              </div>
            </div>
          )}

          <div className={styles.teamTasks}>
            <h4 className={styles.teamColumnTitle}>Task Queue</h4>
            <div className={styles.compactTaskList}>
              {roleTasks.map(t => (
                <TaskCompact key={t.id} task={t} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const ROLES: TeamRole[] = ['operations', 'publishing', 'marketing', 'authority', 'creative', 'web_engineering'];

export default function TeamPanel() {
  return (
    <section className={styles.teamSection}>
      <div className={styles.sweepHeader}>
        <h2 className={styles.sweepTitle}>Your Management Team</h2>
        <p className={styles.sweepSubtitle}>
          Six consultants, each responsible for a business area. Expand any team to see their full report.
        </p>
      </div>
      <div className={styles.teamList}>
        {ROLES.map(role => (
          <TeamCard key={role} role={role} />
        ))}
      </div>
    </section>
  );
}

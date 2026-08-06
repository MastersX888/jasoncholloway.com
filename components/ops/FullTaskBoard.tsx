'use client';

import { useState } from 'react';
import { tasks, ROLE_META, type Priority, type TaskStatus, type TeamRole } from '@/lib/data/ops-sweep';
import styles from './ops.module.css';

const PRIORITIES: Priority[] = ['P0', 'P1', 'P2', 'P3'];
const STATUSES: TaskStatus[] = ['open', 'verify', 'in_progress', 'blocked', 'done', 'deferred'];
const ROLES: TeamRole[] = ['operations', 'publishing', 'marketing', 'authority', 'creative', 'web_engineering'];

export default function FullTaskBoard() {
  const [filterRole, setFilterRole] = useState<TeamRole | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');

  const filtered = tasks.filter(t => {
    if (filterRole !== 'all' && t.role !== filterRole) return false;
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const po: Record<string, number> = { P0: 0, P1: 1, P2: 2, P3: 3 };
    const so: Record<string, number> = { blocked: 0, open: 1, verify: 2, in_progress: 3, done: 4, deferred: 5 };
    const pd = (po[a.priority] ?? 9) - (po[b.priority] ?? 9);
    if (pd !== 0) return pd;
    return (so[a.status] ?? 9) - (so[b.status] ?? 9);
  });

  return (
    <section className={styles.boardSection}>
      <div className={styles.sweepHeader}>
        <h2 className={styles.sweepTitle}>Full Task Board</h2>
        <p className={styles.sweepSubtitle}>
          Every tracked item across all teams. Filter by role, status, or priority.
        </p>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Team</label>
          <select
            className={styles.filterSelect}
            value={filterRole}
            onChange={e => setFilterRole(e.target.value as TeamRole | 'all')}
          >
            <option value="all">All Teams</option>
            {ROLES.map(r => (
              <option key={r} value={r}>{ROLE_META[r].icon} {ROLE_META[r].label}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Status</label>
          <select
            className={styles.filterSelect}
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as TaskStatus | 'all')}
          >
            <option value="all">All Statuses</option>
            {STATUSES.map(s => (
              <option key={s} value={s}>{s.replace('_', ' ')}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Priority</label>
          <select
            className={styles.filterSelect}
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value as Priority | 'all')}
          >
            <option value="all">All Priorities</option>
            {PRIORITIES.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterCount}>
          {sorted.length} item{sorted.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className={styles.boardTable}>
        <div className={styles.boardTableHeader}>
          <span className={styles.colId}>ID</span>
          <span className={styles.colPriority}>Priority</span>
          <span className={styles.colStatus}>Status</span>
          <span className={styles.colTitle}>Task</span>
          <span className={styles.colTeam}>Team</span>
          <span className={styles.colOwner}>Owner</span>
          <span className={styles.colEffort}>Effort</span>
        </div>
        {sorted.map(task => {
          const meta = ROLE_META[task.role];
          const pCls =
            task.priority === 'P0' ? styles.badgeP0 :
            task.priority === 'P1' ? styles.badgeP1 :
            task.priority === 'P2' ? styles.badgeP2 : styles.badgeP3;
          const sCls =
            task.status === 'done' ? styles.badgeDone :
            task.status === 'open' ? styles.badgeOpen :
            task.status === 'verify' ? styles.badgeVerify :
            task.status === 'deferred' ? styles.badgeDeferred :
            task.status === 'blocked' ? styles.badgeBlocked : styles.badgeOpen;

          return (
            <div
              key={task.id}
              className={`${styles.boardRow} ${task.status === 'done' ? styles.boardRowDone : ''}`}
            >
              <span className={styles.colId}>{task.id}</span>
              <span className={styles.colPriority}>
                <span className={`${styles.badge} ${pCls}`}>{task.priority}</span>
              </span>
              <span className={styles.colStatus}>
                <span className={`${styles.badge} ${sCls}`}>{task.status.replace('_', ' ')}</span>
              </span>
              <span className={styles.colTitle}>
                <span className={styles.boardTaskTitle}>{task.title}</span>
                {task.dueContext && (
                  <span className={styles.boardTaskContext}>{task.dueContext}</span>
                )}
              </span>
              <span className={styles.colTeam} style={{ color: meta.color }}>
                {meta.icon} {meta.label}
              </span>
              <span className={styles.colOwner}>{task.owner}</span>
              <span className={styles.colEffort}>{task.effort}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

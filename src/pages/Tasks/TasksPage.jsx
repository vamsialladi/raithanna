import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import {
  CheckCircleIcon,
  DropletIcon,
  SproutIcon,
  FlaskIcon,
  CalendarIcon,
} from '../../components/common/Icons';

export default function TasksPage() {
  const { tasks, toggleTaskComplete, addNewTask } = useMarketplace();
  const [filter, setFilter] = useState('All');
  const [taskTitle, setTaskTitle] = useState('');
  const [related, setRelated] = useState('North Field');
  const [scheduledDate, setScheduledDate] = useState('Tomorrow');
  const [scheduledTime, setScheduledTime] = useState('8:00 AM');
  const [type, setType] = useState('watering');

  function getTaskIcon(taskType) {
    if (taskType === 'watering') {
      return { icon: DropletIcon, bg: '#e0f2fe', color: '#0284c7' };
    }
    if (taskType === 'fertilizer') {
      return { icon: SproutIcon, bg: '#dcfce7', color: '#15803d' };
    }
    if (taskType === 'testing') {
      return { icon: FlaskIcon, bg: '#f3e8ff', color: '#9333ea' };
    }
    return { icon: CalendarIcon, bg: '#fef3c7', color: '#d97706' };
  }

  function handleCreate(e) {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    addNewTask({
      taskTitle,
      relatedLand: related,
      scheduledDate,
      scheduledTime,
      type,
    });
    setTaskTitle('');
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'Pending') return t.taskStatus !== 'Completed';
    if (filter === 'Completed') return t.taskStatus === 'Completed';
    return true;
  });

  return (
    <div className="rm-dashboard-content">
      <div className="rm-panel-header" style={{ marginBottom: '18px' }}>
        <div>
          <h1 className="rm-panel-title" style={{ fontSize: '1.5rem' }}>
            Tasks & Farm Reminders
          </h1>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>
            Daily irrigation schedules, nutrient applications, soil health checks, and lease milestones.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
        {/* Left: Task List with Filters */}
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
            {['All', 'Pending', 'Completed'].map((st) => (
              <button
                key={st}
                type="button"
                className="rm-outline-btn"
                style={{
                  background: filter === st ? '#16a34a' : 'transparent',
                  color: filter === st ? '#ffffff' : '#16a34a',
                }}
                onClick={() => setFilter(st)}
              >
                {st}
              </button>
            ))}
          </div>

          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px' }}>
            {filteredTasks.map((task) => {
              const style = getTaskIcon(task.type);
              const Icon = style.icon;
              const isDone = task.taskStatus === 'Completed';

              return (
                <div key={task.taskId} className="rm-task-item">
                  <div className="rm-task-icon-wrap" style={{ background: style.bg, color: style.color }}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="rm-task-info">
                    <div
                      className="rm-task-title"
                      style={{
                        textDecoration: isDone ? 'line-through' : 'none',
                        color: isDone ? '#94a3b8' : '#0f172a',
                      }}
                    >
                      {task.taskTitle} ({task.relatedCrop || task.relatedLand})
                    </div>
                    <div className="rm-task-time">
                      {task.scheduledDate}, {task.scheduledTime} • Priority: {task.priority}
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`rm-task-check-btn ${isDone ? 'completed' : ''}`}
                    onClick={() => toggleTaskComplete(task.taskId)}
                    aria-label={`Toggle task completion`}
                  >
                    {isDone && <span style={{ fontSize: '11px', lineHeight: 1 }}>✓</span>}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Add Task Form */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#14532d', marginBottom: '14px' }}>
            Add Farming Task
          </h3>
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
              Task Title
              <input
                type="text"
                placeholder="e.g. Clean Drip Filters, Apply Potash"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
              Related Plot / Equipment
              <input
                type="text"
                value={related}
                onChange={(e) => setRelated(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                Date
                <input
                  type="text"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                Time
                <input
                  type="text"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </label>
            </div>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
              Task Category
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              >
                <option value="watering">Watering & Irrigation</option>
                <option value="fertilizer">Fertilizer / Nutrient</option>
                <option value="testing">Soil & Crop Health Test</option>
                <option value="lease">Lease / Payment Reminder</option>
              </select>
            </label>

            <button
              type="submit"
              className="rm-add-cart-btn"
              style={{ marginTop: '8px', padding: '10px' }}
            >
              Save Scheduled Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

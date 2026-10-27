import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import {
  DropletIcon,
  SproutIcon,
  FlaskIcon,
  CalendarIcon,
  ArrowRightIcon,
} from '../common/Icons';

export default function UpcomingTasks() {
  const { tasks, toggleTaskComplete, navigateTo } = useMarketplace();

  function getTaskIcon(type) {
    if (type === 'watering') {
      return { icon: DropletIcon, bg: '#e0f2fe', color: '#0284c7' };
    }
    if (type === 'fertilizer') {
      return { icon: SproutIcon, bg: '#dcfce7', color: '#15803d' };
    }
    if (type === 'testing') {
      return { icon: FlaskIcon, bg: '#f3e8ff', color: '#9333ea' };
    }
    return { icon: CalendarIcon, bg: '#fef3c7', color: '#d97706' };
  }

  return (
    <div className="rm-right-card">
      <div className="rm-panel-header" style={{ marginBottom: '8px' }}>
        <h2 className="rm-panel-title">Upcoming Tasks</h2>
        <button
          type="button"
          className="rm-panel-view-all"
          onClick={() => navigateTo('tasks')}
        >
          <span>View All</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      <div>
        {tasks.slice(0, 4).map((task) => {
          const style = getTaskIcon(task.type);
          const Icon = style.icon;
          const isDone = task.taskStatus === 'Completed';

          return (
            <div key={task.taskId} className="rm-task-item">
              <div
                className="rm-task-icon-wrap"
                style={{ background: style.bg, color: style.color }}
              >
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
                  {task.scheduledDate}, {task.scheduledTime}
                </div>
              </div>

              <button
                type="button"
                className={`rm-task-check-btn ${isDone ? 'completed' : ''}`}
                onClick={() => toggleTaskComplete(task.taskId)}
                title={isDone ? 'Mark Pending' : 'Mark Completed'}
                aria-label={`Toggle completion for ${task.taskTitle}`}
              >
                {isDone && <span style={{ fontSize: '11px', lineHeight: 1 }}>✓</span>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

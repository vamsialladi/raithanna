import React, { createContext, useContext, useState } from 'react';
import {
  mockTenantFarmer,
  mockLeases,
  mockCrops,
  mockUpcomingTasks,
  mockSeasonalEarnings,
  mockLandUsage,
  mockRecentlyViewedLand,
  mockFarmerNotifications,
  mockMarketPrices,
  mockEquipmentList,
  mockFarmerMessages,
} from '../data/mockData';
import { authService } from '../services/authService';

const MarketplaceContext = createContext(null);

export function MarketplaceProvider({ children, onSwitchToAuth, onSwitchToLanding }) {
  // Session Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => authService.isAuthenticated());

  // Tenant Farmer User Profile (loaded from authenticated session if present, fallback to mockTenantFarmer)
  const [user, setUser] = useState(() => authService.getCurrentSession() || mockTenantFarmer);

  // Active Ecosystem Module: 'tenant-farmer' (default) | 'landlord' | 'buyer' | 'service-provider'
  const [activeModule, setActiveModule] = useState('tenant-farmer');


  function switchModule(mod) {
    setActiveModule(mod);
    const names = {
      'tenant-farmer': 'Tenant Farmer Dashboard',
      'landlord': 'Landlord Farmland Module',
      'buyer': 'Buyer Marketplace Module',
      'service-provider': 'Service Provider Hub Module',
    };
    showToast(`Switched to ${names[mod] || mod}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Active Navigation Route
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const [routeParams, setRouteParams] = useState({});

  // Global Search
  const [searchQuery, setSearchQuery] = useState('');

  // Location Selector
  const [selectedLocation, setSelectedLocation] = useState('Hyderabad, Telangana');

  // Core Tenant Farmer Entities
  const [leases, setLeases] = useState(mockLeases);
  const [crops, setCrops] = useState(mockCrops);
  const [tasks, setTasks] = useState(mockUpcomingTasks);
  const [notifications, setNotifications] = useState(mockFarmerNotifications);
  const [messages, setMessages] = useState(mockFarmerMessages);
  const [recentlyViewedLand, setRecentlyViewedLand] = useState(mockRecentlyViewedLand);

  // Modals / Drawers for details
  const [activeModal, setActiveModal] = useState(null); // { type: 'lease' | 'crop' | 'land' | 'task' | 'service', data: ... }

  // Global Toast
  const [toast, setToast] = useState(null);

  function showToast(message, type = 'success') {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr));
    }, 3500);
  }

  function navigateTo(route, params = {}) {
    setActiveRoute(route);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Task actions
  function toggleTaskComplete(taskId) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.taskId !== taskId) return t;
        const newStatus = t.taskStatus === 'Completed' ? 'Pending' : 'Completed';
        showToast(
          newStatus === 'Completed'
            ? `Task "${t.taskTitle}" marked as completed!`
            : `Task "${t.taskTitle}" marked as pending.`
        );
        return { ...t, taskStatus: newStatus };
      })
    );
  }

  function addNewTask(taskData) {
    const newTask = {
      taskId: `TSK-${Date.now()}`,
      taskTitle: taskData.taskTitle,
      relatedCrop: taskData.relatedCrop || 'General',
      relatedLand: taskData.relatedLand || 'All Fields',
      scheduledDate: taskData.scheduledDate || 'Today',
      scheduledTime: taskData.scheduledTime || '9:00 AM',
      taskStatus: 'Pending',
      priority: taskData.priority || 'Medium',
      type: taskData.type || 'watering',
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast('New farming task added successfully!');
  }

  // Notification actions
  function markNotificationRead(id) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  function markAllNotificationsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  }

  // Summary Metrics Derived from actual data
  const summaryMetrics = {
    activeLeasesCount: leases.filter((l) => l.leaseStatus === 'Active').length,
    totalLandArea: leases
      .filter((l) => l.leaseStatus === 'Active')
      .reduce((sum, l) => sum + l.area, 0),
    currentCropsCount: crops.length,
    totalMonthlyRent: leases
      .filter((l) => l.leaseStatus === 'Active')
      .reduce((sum, l) => sum + (l.monthlyRent || 0), 0),
    unreadNotifications: notifications.filter((n) => !n.read).length,
    unreadMessages: messages.reduce((sum, m) => sum + (m.unread || 0), 0),
  };

  // Authentication methods
  async function login(credentials) {
    const sessionUser = await authService.login(credentials);
    setUser(sessionUser);
    setIsAuthenticated(true);
    // Align active module with user role if specialized
    if (credentials.role === 'Landlord Farmer') {
      setActiveModule('landlord');
    } else if (credentials.role === 'Buyer') {
      setActiveModule('buyer');
    } else if (credentials.role === 'Service Provider') {
      setActiveModule('service-provider');
    } else {
      setActiveModule('tenant-farmer');
    }
    showToast(`Welcome, ${sessionUser.farmerName}!`);
    return sessionUser;
  }

  function logout() {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    showToast('Logged out successfully.');
    if (onSwitchToAuth) {
      onSwitchToAuth();
    }
  }

  return (
    <MarketplaceContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        user,
        setUser,
        activeModule,
        setActiveModule,
        switchModule,
        activeRoute,
        routeParams,
        navigateTo,
        searchQuery,
        setSearchQuery,
        selectedLocation,
        setSelectedLocation,
        leases,
        setLeases,
        crops,
        setCrops,
        tasks,
        toggleTaskComplete,
        addNewTask,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        messages,
        recentlyViewedLand,
        summaryMetrics,
        activeModal,
        setActiveModal,
        toast,
        showToast,
        onSwitchToAuth,
        onSwitchToLanding,
        seasonalEarnings: mockSeasonalEarnings,
        landUsage: mockLandUsage,
        marketPrices: mockMarketPrices,
        equipmentList: mockEquipmentList,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}

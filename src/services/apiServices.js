import apiClient from './apiClient';
import { mockCategories } from '../data/mockCategories';
import { mockFarmers } from '../data/mockFarmers';
import { mockOrders } from '../data/mockOrders';
import { mockPriceTrends7Days, mockPriceTrends30Days, mockPriceTrends3Months } from '../data/mockPriceTrends';
import { mockNotifications, mockMessages, mockAddresses } from '../data/mockNotifications';

export const categoryApi = {
  getAll: async () => {
    try {
      const res = await apiClient.get('/categories');
      return res.data;
    } catch {
      return mockCategories;
    }
  }
};

export const farmerApi = {
  getAll: async () => {
    try {
      const res = await apiClient.get('/farmers');
      return res.data;
    } catch {
      return mockFarmers;
    }
  },
  getById: async (id) => {
    try {
      const res = await apiClient.get(`/farmers/${id}`);
      return res.data;
    } catch {
      return mockFarmers.find(f => f.id === id) || null;
    }
  }
};

export const orderApi = {
  getAll: async () => {
    try {
      const res = await apiClient.get('/orders');
      return res.data;
    } catch {
      return mockOrders;
    }
  },
  getById: async (id) => {
    try {
      const res = await apiClient.get(`/orders/${id}`);
      return res.data;
    } catch {
      return mockOrders.find(o => o.id === id) || mockOrders[0];
    }
  },
  create: async (orderPayload) => {
    try {
      const res = await apiClient.post('/orders', orderPayload);
      return res.data;
    } catch {
      const newOrder = {
        id: `RM-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        ...orderPayload,
        currentStatus: 'Order Placed',
        timeline: [
          { status: 'Order Placed', time: 'Just now', completed: true, isCurrent: true },
          { status: 'Processing', time: 'Pending', completed: false },
          { status: 'Out for Delivery', time: 'Pending', completed: false },
          { status: 'Delivered', time: 'Pending', completed: false }
        ]
      };
      return newOrder;
    }
  }
};

export const marketPriceApi = {
  getTrends: async (range = '7d') => {
    try {
      const res = await apiClient.get(`/market-prices?range=${range}`);
      return res.data;
    } catch {
      if (range === '30d') return mockPriceTrends30Days;
      if (range === '3m') return mockPriceTrends3Months;
      return mockPriceTrends7Days;
    }
  }
};

export const authApi = {
  login: async (credentials) => {
    try {
      const res = await apiClient.post('/auth/login', credentials);
      return res.data;
    } catch {
      return {
        token: 'mock-jwt-token-arjun',
        user: {
          id: 'user-1',
          name: 'Arjun Sharma',
          email: credentials.email || 'arjun.sharma@example.com',
          role: 'Buyer',
          location: 'Hyderabad, Telangana',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          phone: '+91 98765 43210'
        }
      };
    }
  },
  register: async (userData) => {
    try {
      const res = await apiClient.post('/auth/register', userData);
      return res.data;
    } catch {
      return {
        token: 'mock-jwt-token-new',
        user: {
          id: 'user-2',
          name: userData.name || 'New Buyer',
          email: userData.email,
          role: 'Buyer',
          location: userData.location || 'Hyderabad, Telangana',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          phone: userData.phone || ''
        }
      };
    }
  }
};

export const messageApi = {
  getAll: async () => {
    try {
      const res = await apiClient.get('/messages');
      return res.data;
    } catch {
      return mockMessages;
    }
  }
};

export const notificationApi = {
  getAll: async () => {
    try {
      const res = await apiClient.get('/notifications');
      return res.data;
    } catch {
      return mockNotifications;
    }
  }
};

export const addressApi = {
  getAll: async () => {
    try {
      const res = await apiClient.get('/addresses');
      return res.data;
    } catch {
      return mockAddresses;
    }
  }
};

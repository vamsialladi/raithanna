export const mockNotifications = [
  {
    id: 'notif-1',
    title: 'Order Out for Delivery',
    message: 'Your order RM-84920 with fresh Tomatoes & Chillies is on the way!',
    time: '15 mins ago',
    read: false,
    type: 'order',
    link: '/buyer/orders/RM-84920'
  },
  {
    id: 'notif-2',
    title: 'Seasonal Offer Alert',
    message: 'Ramesh Reddy added fresh Banganapalli mangoes at 20% off!',
    time: '2 hours ago',
    read: false,
    type: 'offer',
    link: '/buyer/products/prod-6'
  },
  {
    id: 'notif-3',
    title: 'Farmer Message',
    message: 'Lakshmi Devi replied: "Your organic chillies are freshly harvested."',
    time: 'Yesterday',
    read: false,
    type: 'message',
    link: '/buyer/messages'
  },
  {
    id: 'notif-4',
    title: 'Price Drop Alert',
    message: 'Onion prices dropped by 8% today in Telangana mandis.',
    time: '2 days ago',
    read: true,
    type: 'price',
    link: '/buyer/price-trends'
  }
];

export const mockMessages = [
  {
    farmerId: 'farmer-2',
    farmerName: 'Lakshmi Devi',
    farmerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    unread: 1,
    lastMessage: 'Your organic chillies are freshly harvested this morning.',
    lastTime: '11:42 AM',
    conversation: [
      { id: 'm1', sender: 'buyer', text: 'Hello Lakshmi ji, are the green chillies spicy variety?', time: '11:15 AM' },
      { id: 'm2', sender: 'farmer', text: 'Namaste Arjun ji! Yes, these are desi Guntur-Warangal variety chillies, very spicy and fresh.', time: '11:30 AM' },
      { id: 'm3', sender: 'farmer', text: 'Your organic chillies are freshly harvested this morning.', time: '11:42 AM' }
    ]
  },
  {
    farmerId: 'farmer-1',
    farmerName: 'Ramesh Reddy',
    farmerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    unread: 0,
    lastMessage: 'Sure, Banganapalli mangoes will be dispatched tomorrow.',
    lastTime: 'Yesterday',
    conversation: [
      { id: 'm4', sender: 'buyer', text: 'Hi Ramesh garu, when will the mango order be dispatched?', time: 'Yesterday 3:00 PM' },
      { id: 'm5', sender: 'farmer', text: 'Sure, Banganapalli mangoes will be dispatched tomorrow morning.', time: 'Yesterday 3:15 PM' }
    ]
  },
  {
    farmerId: 'farmer-5',
    farmerName: 'Venkat Rao',
    farmerAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
    unread: 0,
    lastMessage: 'Raw milk is chilled and packed right after milking.',
    lastTime: '3 days ago',
    conversation: [
      { id: 'm6', sender: 'buyer', text: 'Is the milk raw or pasteurized?', time: '3 days ago' },
      { id: 'm7', sender: 'farmer', text: 'Raw milk is chilled and packed right after milking.', time: '3 days ago' }
    ]
  }
];

export const mockAddresses = [
  {
    id: 'addr-1',
    type: 'Home',
    isDefault: true,
    name: 'Arjun Sharma',
    phone: '+91 98765 43210',
    addressLine: 'Plot 42, Green Meadows, Madhapur',
    landmark: 'Near Cyber Towers',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500081'
  },
  {
    id: 'addr-2',
    type: 'Office',
    isDefault: false,
    name: 'Arjun Sharma',
    phone: '+91 98765 43210',
    addressLine: 'Block C, Knowledge City, Hitec City',
    landmark: 'Opposite Inorbit Mall',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500082'
  }
];

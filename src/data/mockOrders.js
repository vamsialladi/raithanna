export const mockOrders = [
  {
    id: 'RM-84920',
    date: '2026-10-25 10:30 AM',
    items: [
      { id: 'prod-1', name: 'Tomato', quantity: 5, unit: 'kg', price: 32, total: 160, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&auto=format&fit=crop&q=80', farmer: 'Ramesh Reddy' },
      { id: 'prod-2', name: 'Green Chilli', quantity: 2, unit: 'kg', price: 48, total: 96, image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=300&auto=format&fit=crop&q=80', farmer: 'Lakshmi Devi' },
      { id: 'prod-3', name: 'Onion', quantity: 5, unit: 'kg', price: 28, total: 140, image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&auto=format&fit=crop&q=80', farmer: 'Ravi Teja' }
    ],
    itemCount: 3,
    subtotal: 396,
    deliveryFee: 40,
    discount: 0,
    totalAmount: 436,
    paymentMethod: 'UPI (Google Pay)',
    paymentStatus: 'Paid',
    deliveryAddress: {
      name: 'Arjun Sharma',
      addressLine: 'Plot 42, Green Meadows, Madhapur',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500081',
      phone: '+91 98765 43210'
    },
    currentStatus: 'Out for Delivery',
    timeline: [
      { status: 'Order Placed', time: 'Apr 25, 10:30 AM', completed: true },
      { status: 'Processing', time: 'Apr 25, 12:45 PM', completed: true },
      { status: 'Out for Delivery', time: 'Apr 25, 3:20 PM', completed: true, isCurrent: true },
      { status: 'Delivered', time: 'ETA: Apr 25, 6:00 PM', completed: false }
    ]
  },
  {
    id: 'RM-84310',
    date: '2026-10-21 09:15 AM',
    items: [
      { id: 'prod-4', name: 'Rice (Non-Basmati)', quantity: 25, unit: 'kg', price: 42, total: 1050, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&auto=format&fit=crop&q=80', farmer: 'Suresh Kumar' },
      { id: 'prod-9', name: 'Pure Desi Ghee', quantity: 1, unit: '500ml', price: 650, total: 650, image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=300&auto=format&fit=crop&q=80', farmer: 'Venkat Rao' }
    ],
    itemCount: 2,
    subtotal: 1700,
    deliveryFee: 0,
    discount: 100,
    totalAmount: 1600,
    paymentMethod: 'Net Banking (HDFC)',
    paymentStatus: 'Paid',
    deliveryAddress: {
      name: 'Arjun Sharma',
      addressLine: 'Plot 42, Green Meadows, Madhapur',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500081',
      phone: '+91 98765 43210'
    },
    currentStatus: 'Delivered',
    timeline: [
      { status: 'Order Placed', time: 'Apr 21, 09:15 AM', completed: true },
      { status: 'Processing', time: 'Apr 21, 11:30 AM', completed: true },
      { status: 'Out for Delivery', time: 'Apr 21, 02:00 PM', completed: true },
      { status: 'Delivered', time: 'Apr 21, 05:45 PM', completed: true, isCurrent: true }
    ]
  },
  {
    id: 'RM-83802',
    date: '2026-10-15 04:20 PM',
    items: [
      { id: 'prod-5', name: 'Fresh Cow Milk', quantity: 10, unit: 'litre', price: 58, total: 580, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=80', farmer: 'Venkat Rao' }
    ],
    itemCount: 1,
    subtotal: 580,
    deliveryFee: 30,
    discount: 0,
    totalAmount: 610,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Paid',
    deliveryAddress: {
      name: 'Arjun Sharma',
      addressLine: 'Plot 42, Green Meadows, Madhapur',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500081',
      phone: '+91 98765 43210'
    },
    currentStatus: 'Delivered',
    timeline: [
      { status: 'Order Placed', time: 'Apr 15, 04:20 PM', completed: true },
      { status: 'Processing', time: 'Apr 15, 05:00 PM', completed: true },
      { status: 'Out for Delivery', time: 'Apr 16, 06:30 AM', completed: true },
      { status: 'Delivered', time: 'Apr 16, 07:45 AM', completed: true, isCurrent: true }
    ]
  },
  {
    id: 'RM-82911',
    date: '2026-10-08 11:00 AM',
    items: [
      { id: 'prod-6', name: 'Fresh Mangoes', quantity: 5, unit: 'kg', price: 45, total: 225, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&auto=format&fit=crop&q=80', farmer: 'Ramesh Reddy' },
      { id: 'prod-10', name: 'Cold Pressed Groundnut Oil', quantity: 2, unit: 'litre', price: 210, total: 420, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&auto=format&fit=crop&q=80', farmer: 'Ravi Teja' }
    ],
    itemCount: 2,
    subtotal: 645,
    deliveryFee: 40,
    discount: 50,
    totalAmount: 635,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    deliveryAddress: {
      name: 'Arjun Sharma',
      addressLine: 'Plot 42, Green Meadows, Madhapur',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500081',
      phone: '+91 98765 43210'
    },
    currentStatus: 'Delivered',
    timeline: [
      { status: 'Order Placed', time: 'Apr 08, 11:00 AM', completed: true },
      { status: 'Delivered', time: 'Apr 09, 04:10 PM', completed: true, isCurrent: true }
    ]
  },
  {
    id: 'RM-81044',
    date: '2026-09-28 02:30 PM',
    items: [
      { id: 'prod-8', name: 'Toor Dal (Unpolished)', quantity: 3, unit: 'kg', price: 135, total: 405, image: 'https://images.unsplash.com/photo-1585994192701-f1a505c817ea?w=300&auto=format&fit=crop&q=80', farmer: 'Suresh Kumar' }
    ],
    itemCount: 1,
    subtotal: 405,
    deliveryFee: 40,
    discount: 0,
    totalAmount: 445,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    deliveryAddress: {
      name: 'Arjun Sharma',
      addressLine: 'Plot 42, Green Meadows, Madhapur',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500081',
      phone: '+91 98765 43210'
    },
    currentStatus: 'Delivered',
    timeline: [
      { status: 'Order Placed', time: 'Sep 28, 02:30 PM', completed: true },
      { status: 'Delivered', time: 'Sep 29, 01:20 PM', completed: true, isCurrent: true }
    ]
  }
];

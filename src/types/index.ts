export type UserRole = 'client' | 'rider' | 'restaurant' | 'admin';

export interface User {
  id: string;
  name: string;
  phone: string;
  city: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  image: string;
  isPopular: boolean;
  isAvailable: boolean;
  emoji: string;
}

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  city: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: string;
  deliveryFeeAmount: number;
  currency: string;
  isOpen: boolean;
  image: string;
  menu: MenuItem[];
  isNew?: boolean;
  address: string;
  openTime: string;
  closeTime: string;
  ordersToday: number;
  revenueToday: number;
}

export interface Rider {
  id: string;
  name: string;
  city: string;
  isOnline: boolean;
  rating: number;
  totalDeliveries: number;
  vehicle: string;
  phone: string;
  earningsThisWeek: number;
  earningsToday: number;
  deliveriesToday: number;
  avgTime: number;
  acceptanceRate: number;
  completionRate: number;
  level: string;
  currentOrderId?: string;
  zones: string[];
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready_for_pickup' | 'delivering' | 'delivered' | 'cancelled';

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  clientDistrict: string;
  restaurantId: string;
  restaurantName: string;
  riderId?: string;
  riderName?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  currency: string;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: string;
  estimatedDelivery: string;
  rating?: number;
  riderRating?: number;
  review?: string;
}

export interface Notification {
  id: string;
  type: 'order' | 'delivery' | 'rider' | 'alert' | 'promo';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  role: UserRole;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

export interface PromoCode {
  code: string;
  type: 'percent' | 'fixed' | 'free_delivery';
  value: number;
  maxUses: number;
  usedCount: number;
  expiresAt: string;
  isActive: boolean;
  applicableTo: string;
}

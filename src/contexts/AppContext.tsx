import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, Order, OrderStatus, Restaurant, Rider, CartItem, MenuItem, Notification } from '@/types';
import { mockRestaurants, mockRiders, mockOrders, mockNotifications } from '@/data/mockData';

// ============ APP CONTEXT ============
interface AppContextType {
  currentUser: User | null;
  currentRole: UserRole | null;
  setCurrentUser: (user: User) => void;
  setCurrentRole: (role: UserRole) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

// ============ ORDER CONTEXT ============
interface OrderContextType {
  orders: Order[];
  createOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  assignRider: (orderId: string, riderId: string, riderName: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within AppProvider');
  return ctx;
};

// ============ RESTAURANT CONTEXT ============
interface RestaurantContextType {
  restaurants: Restaurant[];
  updateMenuItem: (restaurantId: string, itemId: string, updates: Partial<MenuItem>) => void;
  toggleRestaurantOpen: (restaurantId: string) => void;
  addMenuItem: (restaurantId: string, item: MenuItem) => void;
  deleteMenuItem: (restaurantId: string, itemId: string) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const useRestaurants = () => {
  const ctx = useContext(RestaurantContext);
  if (!ctx) throw new Error('useRestaurants must be used within AppProvider');
  return ctx;
};

// ============ RIDER CONTEXT ============
interface RiderContextType {
  riders: Rider[];
  updateRiderStatus: (riderId: string, isOnline: boolean) => void;
  updateRiderAvailability: (riderId: string, updates: Partial<Rider>) => void;
}

const RiderContext = createContext<RiderContextType | undefined>(undefined);

export const useRiders = () => {
  const ctx = useContext(RiderContext);
  if (!ctx) throw new Error('useRiders must be used within AppProvider');
  return ctx;
};

// ============ CART CONTEXT ============
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem, restaurantId: string, restaurantName: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartRestaurantId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within AppProvider');
  return ctx;
};

// ============ NOTIFICATION CONTEXT ============
interface NotificationContextType {
  notifications: Notification[];
  addNotification: (n: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within AppProvider');
  return ctx;
};

// ============ COMBINED PROVIDER ============
export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [riders, setRiders] = useState<Rider[]>(mockRiders);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole(null);
    setCartItems([]);
  };

  // Order functions
  const createOrder = (order: Order) => setOrders(prev => [order, ...prev]);
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };
  const assignRider = (orderId: string, riderId: string, riderName: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, riderId, riderName } : o));
  };

  // Restaurant functions
  const updateMenuItem = (restaurantId: string, itemId: string, updates: Partial<MenuItem>) => {
    setRestaurants(prev => prev.map(r => r.id === restaurantId ? { ...r, menu: r.menu.map(m => m.id === itemId ? { ...m, ...updates } : m) } : r));
  };
  const toggleRestaurantOpen = (restaurantId: string) => {
    setRestaurants(prev => prev.map(r => r.id === restaurantId ? { ...r, isOpen: !r.isOpen } : r));
  };
  const addMenuItem = (restaurantId: string, item: MenuItem) => {
    setRestaurants(prev => prev.map(r => r.id === restaurantId ? { ...r, menu: [...r.menu, item] } : r));
  };
  const deleteMenuItem = (restaurantId: string, itemId: string) => {
    setRestaurants(prev => prev.map(r => r.id === restaurantId ? { ...r, menu: r.menu.filter(m => m.id !== itemId) } : r));
  };

  // Rider functions
  const updateRiderStatus = (riderId: string, isOnline: boolean) => {
    setRiders(prev => prev.map(r => r.id === riderId ? { ...r, isOnline } : r));
  };
  const updateRiderAvailability = (riderId: string, updates: Partial<Rider>) => {
    setRiders(prev => prev.map(r => r.id === riderId ? { ...r, ...updates } : r));
  };

  // Cart functions
  const cartRestaurantId = cartItems.length > 0 ? cartItems[0].restaurantId : null;
  const addToCart = (item: MenuItem, restaurantId: string, restaurantName: string) => {
    if (cartRestaurantId && cartRestaurantId !== restaurantId) {
      setCartItems([]);
    }
    setCartItems(prev => {
      const existing = prev.find(c => c.menuItem.id === item.id);
      if (existing) {
        return prev.map(c => c.menuItem.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { menuItem: item, quantity: 1, restaurantId, restaurantName }];
    });
  };
  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(c => c.menuItem.id !== itemId));
  };
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev => prev.map(c => c.menuItem.id === itemId ? { ...c, quantity } : c));
  };
  const clearCart = () => setCartItems([]);
  const cartTotal = cartItems.reduce((sum, c) => sum + c.menuItem.price * c.quantity, 0);

  // Notification functions
  const addNotification = (n: Notification) => setNotifications(prev => [n, ...prev]);
  const markAsRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <AppContext.Provider value={{ currentUser, currentRole, setCurrentUser, setCurrentRole, logout }}>
      <OrderContext.Provider value={{ orders, createOrder, updateOrderStatus, assignRider }}>
        <RestaurantContext.Provider value={{ restaurants, updateMenuItem, toggleRestaurantOpen, addMenuItem, deleteMenuItem }}>
          <RiderContext.Provider value={{ riders, updateRiderStatus, updateRiderAvailability }}>
            <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartRestaurantId }}>
              <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, markAllAsRead, unreadCount }}>
                {children}
              </NotificationContext.Provider>
            </CartContext.Provider>
          </RiderContext.Provider>
        </RestaurantContext.Provider>
      </OrderContext.Provider>
    </AppContext.Provider>
  );
}

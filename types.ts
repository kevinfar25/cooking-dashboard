
export interface Dish {
  id: string;
  name: string;
  category: 'Appetizer' | 'Main' | 'Dessert' | 'Drink';
  price: number;
  cost: number;
  orders: number;
  popularityScore: number; // 0-100
  image: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  topDish: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  secondary?: number;
}

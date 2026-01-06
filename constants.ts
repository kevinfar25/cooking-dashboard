
import { Dish, ChartDataPoint } from './types';

export const DISHES: Dish[] = [
  { id: '1', name: 'Truffle Pasta', category: 'Main', price: 24, cost: 8.5, orders: 125, popularityScore: 92, image: 'https://picsum.photos/seed/pasta/200/200' },
  { id: '2', name: 'Wagyu Burger', category: 'Main', price: 18, cost: 6.2, orders: 210, popularityScore: 98, image: 'https://picsum.photos/seed/burger/200/200' },
  { id: '3', name: 'Miso Glazed Salmon', category: 'Main', price: 26, cost: 11, orders: 85, popularityScore: 85, image: 'https://picsum.photos/seed/salmon/200/200' },
  { id: '4', name: 'Caesar Salad', category: 'Appetizer', price: 12, cost: 3.5, orders: 150, popularityScore: 78, image: 'https://picsum.photos/seed/salad/200/200' },
  { id: '5', name: 'Lava Cake', category: 'Dessert', price: 10, cost: 2.8, orders: 180, popularityScore: 95, image: 'https://picsum.photos/seed/cake/200/200' },
  { id: '6', name: 'Craft Lemonade', category: 'Drink', price: 6, cost: 0.5, orders: 300, popularityScore: 88, image: 'https://picsum.photos/seed/drink/200/200' },
];

export const SALES_BY_CATEGORY: ChartDataPoint[] = [
  { name: 'Mains', value: 4500 },
  { name: 'Appetizers', value: 1800 },
  { name: 'Desserts', value: 1800 },
  { name: 'Drinks', value: 1800 },
];

export const WEEKLY_PERFORMANCE: ChartDataPoint[] = [
  { name: 'Mon', value: 1200, secondary: 800 },
  { name: 'Tue', value: 1900, secondary: 1100 },
  { name: 'Wed', value: 1500, secondary: 1300 },
  { name: 'Thu', value: 2100, secondary: 1500 },
  { name: 'Fri', value: 3200, secondary: 2200 },
  { name: 'Sat', value: 4500, secondary: 3100 },
  { name: 'Sun', value: 3800, secondary: 2600 },
];

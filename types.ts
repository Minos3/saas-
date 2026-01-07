import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  id: string;
  title: string;
  icon?: LucideIcon;
  children?: MenuItem[];
  path?: string;
}

export interface User {
  name: string;
  role: string;
  avatar: string;
}

export interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: LucideIcon;
  colorClass: string;
}

export interface ChartData {
  name: string;
  value: number;
  value2?: number;
}

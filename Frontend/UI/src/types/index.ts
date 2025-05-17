export type Role = 'admin' | 'mentor';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
}

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  roles: Role[];
}

export interface TabStats {
  id: string;
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}
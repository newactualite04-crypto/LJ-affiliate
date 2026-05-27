export type UserRole = "affiliate" | "admin" | "superadmin";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
}

export interface AffiliateLink {
  id: string;
  user_id: string;
  code: string;
  target_url: string;
  name: string;
  clicks: number;
  conversions: number;
  revenue: number;
  created_at: string;
  is_active: boolean;
}

export interface Conversion {
  id: string;
  affiliate_link_id: string;
  amount: number;
  commission: number;
  status: "pending" | "approved" | "paid" | "rejected";
  created_at: string;
  ip_address: string | null;
}

export interface Commission {
  id: string;
  user_id: string;
  amount: number;
  status: "pending" | "approved" | "paid";
  period_start: string;
  period_end: string;
  paid_at: string | null;
  created_at: string;
}

export interface DashboardStats {
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;
  totalCommissions: number;
  conversionRate: number;
  pendingCommissions: number;
}

export interface AdminStats {
  totalAffiliates: number;
  totalRevenue: number;
  totalCommissionsPaid: number;
  activeLinks: number;
  topAffiliates: Array<{
    id: string;
    name: string;
    revenue: number;
    conversions: number;
  }>;
}

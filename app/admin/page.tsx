import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin-dashboard";
import { getAdminOverview } from "@/services/admin-service";
import { listBooks } from "@/services/book-service";
import { listOrders } from "@/services/order-service";
import { getCurrentUser } from "@/services/user-service";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export default async function AdminPage() { const user = await getCurrentUser(); if (!user) redirect("/login?next=/admin"); if (user.role !== "admin") redirect("/account"); const [overview, catalogue, orders] = await Promise.all([getAdminOverview(), listBooks({ availability: "all", sort: "newest", limit: 100 }), listOrders(user.id, true)]); return <div className="app-page shell"><header className="app-page__header"><span className="eyebrow">PROTECTED ADMIN</span><h1>Store operations</h1><p>A deliberately focused dashboard for catalogue, inventory, and order state.</p></header><div className="stat-grid"><div className="stat-card"><span>Active books</span><strong>{overview.books}</strong></div><div className="stat-card"><span>Low stock</span><strong>{overview.lowStock}</strong></div><div className="stat-card"><span>Orders</span><strong>{overview.orders}</strong></div><div className="stat-card"><span>Users</span><strong>{overview.users}</strong></div></div><AdminDashboard initialBooks={catalogue.books} initialOrders={orders} /></div>; }

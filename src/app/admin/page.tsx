"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Users, Briefcase, Building2, FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useRequireAuth } from "@/hooks/useRequireAuth";

interface AdminStats {
  totalUsers: number;
  totalJobs: number;
  totalCompanies: number;
  totalApplications: number;
  applicationsByStatus: { name: string; value: number }[];
  applicationsOverview: { month: string; applications: number }[];
  recentJobs: { _id: string; title: string; company: string; applications: number; postedAt: string }[];
}

const PIE_COLORS = ["#eab308", "#22c55e", "#2563eb", "#ef4444"];

export default function AdminDashboardPage() {
  const { session, isPending } = useRequireAuth({ allowedRoles: ["admin"] });

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setStats(json.data);
        setIsLoading(false);
      });
  }, [session]);

  if (isPending || !session) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[50vh] items-center justify-center text-neutral-600">Checking access...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-neutral-50 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-600">Platform overview and analytics</p>

          {isLoading || !stats ? (
            <p className="mt-8 text-sm text-neutral-600">Loading dashboard...</p>
          ) : (
            <>
              <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard icon={Users} label="Total Users" value={stats.totalUsers} color="primary" />
                <StatCard icon={Briefcase} label="Total Jobs" value={stats.totalJobs} color="accent" />
                <StatCard icon={Building2} label="Total Companies" value={stats.totalCompanies} color="orange" />
                <StatCard icon={FileText} label="Total Applications" value={stats.totalApplications} color="pink" />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="rounded-card border border-neutral-200 bg-white p-6 lg:col-span-2">
                  <h2 className="font-semibold text-neutral-900">Job Applications Overview</h2>
                  <div className="mt-4 h-64">
                    {stats.applicationsOverview.length === 0 ? (
                      <div className="flex h-full items-center justify-center text-sm text-neutral-500">
                        No application data yet
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stats.applicationsOverview}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#475569" />
                          <YAxis tick={{ fontSize: 12 }} stroke="#475569" />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="applications"
                            stroke="#2563eb"
                            strokeWidth={2}
                            dot={{ fill: "#2563eb" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>

                <div className="rounded-card border border-neutral-200 bg-white p-6">
                  <h2 className="font-semibold text-neutral-900">Applications by Status</h2>
                  <div className="mt-4 h-64">
                    {stats.applicationsByStatus.length === 0 ? (
                      <div className="flex h-full items-center justify-center text-sm text-neutral-500">
                        No data yet
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={stats.applicationsByStatus}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={70}
                          >
                            {stats.applicationsByStatus.map((_, index) => (
                              <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend wrapperStyle={{ fontSize: "12px" }} />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-card border border-neutral-200 bg-white p-6">
                <h2 className="font-semibold text-neutral-900">Recent Job Postings</h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-neutral-200 text-xs uppercase text-neutral-600">
                      <tr>
                        <th className="py-2 pr-4">Job Title</th>
                        <th className="py-2 pr-4">Company</th>
                        <th className="py-2 pr-4">Applications</th>
                        <th className="py-2">Posted</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {stats.recentJobs.map((job) => (
                        <tr key={job._id}>
                          <td className="py-3 pr-4 font-medium text-neutral-900">{job.title}</td>
                          <td className="py-3 pr-4 text-neutral-600">{job.company}</td>
                          <td className="py-3 pr-4 text-neutral-600">{job.applications}</td>
                          <td className="py-3 text-neutral-500">
                            {new Date(job.postedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  color: "primary" | "accent" | "orange" | "pink";
}

const colorClasses: Record<StatCardProps["color"], string> = {
  primary: "bg-primary-50 text-primary-600",
  accent: "bg-accent-50 text-accent-600",
  orange: "bg-orange-50 text-orange-600",
  pink: "bg-pink-50 text-pink-600",
};

function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  return (
    <div className="rounded-card border border-neutral-200 bg-white p-5">
      <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClasses[color]}`}>
        <Icon size={18} />
      </span>
      <p className="mt-3 text-2xl font-bold text-neutral-900">{value.toLocaleString()}</p>
      <p className="text-xs text-neutral-600">{label}</p>
    </div>
  );
}
"use client";
import React from "react";
import ProtectedRoute from "@/Components/Shared/ProtectedRoute";
import { Users, Package, TrendingUp, UserCheck, Settings, FileText } from "lucide-react";
import Link from "next/link";

const StatCard = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 group">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
        <Icon size={24} className={color.replace("bg-", "text-")} />
      </div>
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </span>
    </div>
    <h3 className="text-3xl font-bold text-gray-800 mb-1 group-hover:scale-105 transition-transform origin-left">
      {value}
    </h3>
    <p className="text-sm text-gray-500">{subtext}</p>
  </div>
);

const ActionCard = ({ title, description, link, icon: Icon }) => (
  <Link href={link} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:border-red-200 hover:bg-red-50/30 transition-all group">
    <div className="p-3 rounded-xl bg-gray-50 group-hover:bg-red-100 text-gray-600 group-hover:text-red-600 transition-colors">
      <Icon size={20} />
    </div>
    <div>
      <h4 className="font-semibold text-gray-800 mb-1 group-hover:text-red-700">{title}</h4>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </Link>
)

function AdminDashboardHome() {
  return (
    <div className="p-8 mt-16 min-h-screen bg-gray-50/50">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Admin Overview</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening in your logistics network.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Total Parcels"
          value="12,450"
          subtext="+18% from last month"
          icon={Package}
          color="bg-blue-500"
        />
        <StatCard
          title="Active Riders"
          value="48"
          subtext="5 currently online"
          icon={TrendingUp}
          color="bg-green-500"
        />
        <StatCard
          title="Registered Merchants"
          value="156"
          subtext="12 new this week"
          icon={Users}
          color="bg-purple-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ActionCard
            title="Manage Users"
            description="View, edit, or ban user accounts."
            link="/dashboard/admin/users"
            icon={UserCheck}
          />
          <ActionCard
            title="Review Parcels"
            description="Check parcel status and resolve issues."
            link="/dashboard/admin/parcels"
            icon={FileText}
          />
          <ActionCard
            title="Platform Settings"
            description="Configure fees and zones."
            link="/dashboard/admin/settings"
            icon={Settings}
          />
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboardHome />
    </ProtectedRoute>
  );
}






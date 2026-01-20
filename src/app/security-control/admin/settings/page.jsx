"use client";

import ProtectedRoute from "@/Components/Shared/ProtectedRoute";
import { Settings, Bell, Shield, Globe, CreditCard, ChevronRight, User, Lock, Smartphone } from "lucide-react";

function AdminSettingsInner() {
  return (
    <div className="p-8 mt-16 min-h-screen bg-gray-50/50">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Platform Settings</h1>
        <p className="text-gray-500">Configure global preferences, security, and notifications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* General Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
            <Globe size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">General</h2>
          <p className="text-sm text-gray-500 mb-6 group-hover:text-gray-600">Company branding, language, and regional preferences.</p>
          <div className="flex items-center text-blue-600 text-sm font-semibold">
            Configure <ChevronRight size={16} className="ml-1" />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
            <Bell size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Notifications</h2>
          <p className="text-sm text-gray-500 mb-6 group-hover:text-gray-600">Email alerts, push notifications, and SMS gateways.</p>
          <div className="flex items-center text-purple-600 text-sm font-semibold">
            Configure <ChevronRight size={16} className="ml-1" />
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-4 group-hover:scale-110 transition-transform">
            <Shield size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Security</h2>
          <p className="text-sm text-gray-500 mb-6 group-hover:text-gray-600">API keys, 2FA settings, and role permissions.</p>
          <div className="flex items-center text-red-600 text-sm font-semibold">
            Configure <ChevronRight size={16} className="ml-1" />
          </div>
        </div>

        {/* Account */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
            <User size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Admin Profile</h2>
          <p className="text-sm text-gray-500 mb-6 group-hover:text-gray-600">Update your personal admin details and password.</p>
          <div className="flex items-center text-orange-600 text-sm font-semibold">
            Edit Profile <ChevronRight size={16} className="ml-1" />
          </div>
        </div>

        {/* Payments */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
            <CreditCard size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Payments</h2>
          <p className="text-sm text-gray-500 mb-6 group-hover:text-gray-600">Manage payment gateways, payout methods, and currencies.</p>
          <div className="flex items-center text-green-600 text-sm font-semibold">
            Manage Wallet <ChevronRight size={16} className="ml-1" />
          </div>
        </div>

        {/* Mobile App */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
            <Smartphone size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">App Settings</h2>
          <p className="text-sm text-gray-500 mb-6 group-hover:text-gray-600">Rider application versioning and update rollout.</p>
          <div className="flex items-center text-indigo-600 text-sm font-semibold">
            Configure App <ChevronRight size={16} className="ml-1" />
          </div>
        </div>

      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminSettingsInner />
    </ProtectedRoute>
  );
}






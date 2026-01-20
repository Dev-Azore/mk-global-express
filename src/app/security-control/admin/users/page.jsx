"use client";
import ProtectedRoute from "@/Components/Shared/ProtectedRoute";
import { User, Shield, MoreVertical, Search, Filter, Mail } from "lucide-react";
import { useState } from "react";

const MOCK_USERS = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "user", status: "active", joinDate: "2024-01-15" },
  { id: 2, name: "Bob Smith", email: "bob.merchant@transify.com", role: "merchant", status: "verified", joinDate: "2024-02-10" },
  { id: 3, name: "Charlie Rider", email: "charlie.rider@transify.com", role: "rider", status: "active", joinDate: "2024-03-05" },
  { id: 4, name: "David Admin", email: "admin@transify.com", role: "admin", status: "active", joinDate: "2023-11-20" },
  { id: 5, name: "Eve Williams", email: "eve@example.com", role: "user", status: "inactive", joinDate: "2024-04-12" },
];

function AdminUsersInner() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredUsers = MOCK_USERS.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-8 mt-16 min-h-screen bg-gray-50/50">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-500">View and manage all platform users, merchants, and riders.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-8 py-5 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => {
                const roleColors = {
                  admin: "bg-purple-100 text-purple-700",
                  merchant: "bg-blue-100 text-blue-700",
                  rider: "bg-orange-100 text-orange-700",
                  user: "bg-gray-100 text-gray-700",
                };

                return (
                  <tr key={user.id} className="group hover:bg-gray-50/80 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{user.name}</p>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                            <Mail size={12} />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        {user.role === 'admin' && <Shield size={14} className="text-purple-500" />}
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${roleColors[user.role]}`}>
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${user.status === 'active' || user.status === 'verified' ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' || user.status === 'verified' ? "bg-green-500" : "bg-red-500"}`} />
                        {user.status === 'verified' ? 'Verified' : (user.status.charAt(0).toUpperCase() + user.status.slice(1))}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm text-gray-500 font-medium">{user.joinDate}</span>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="p-12 text-center">
              <User size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No users found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminUsersInner />
    </ProtectedRoute>
  );
}

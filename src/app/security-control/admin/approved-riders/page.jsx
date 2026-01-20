"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/Lib/axiosInstance.js";
import { toast } from "react-hot-toast";
import ProtectedRoute from "@/Components/Shared/ProtectedRoute";
import { User, CheckCircle, XCircle, Search, Filter, ShieldCheck, Phone, Calendar, MoreVertical } from "lucide-react";

function ApprovedRidersInner() {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState(null);

  // fetch approved riders (both active & inactive)
  const fetchRiders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/approved-riders");
      setRiders(res?.data?.riders || []);
    } catch (err) {
      toast.error("Failed to load riders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiders();
  }, []);

  // toggle active/inactive
  const handleToggle = async (rider) => {
    try {
      setSavingId(rider._id);
      const newActive = !rider.active;

      const res = await axiosInstance.patch("/apply-riders", {
        id: rider._id,
        active: newActive,
      });

      if (res?.data?.success) {
        toast.success(`Rider ${newActive ? "activated" : "deactivated"}`);
        // update state without removing row
        setRiders((prev) =>
          prev.map((r) =>
            r._id === rider._id ? { ...r, active: newActive } : r
          )
        );
      } else {
        toast.error(res?.data?.message || "Toggle failed");
      }
    } catch (err) {
      toast.error("Error toggling rider");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
          <p className="text-gray-400 font-medium">Loading riders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 mt-16 min-h-screen bg-gray-50/50">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Approved Riders</h1>
          <p className="text-gray-500">Manage active fleet and rider status.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search riders..."
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all w-64"
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {riders.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border border-gray-100 shadow-sm text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
            <ShieldCheck size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Approved Riders</h3>
          <p className="text-gray-500 max-w-sm">Approve riders from the "Applied Riders" page first.</p>
        </div>
      ) : (
        <div className="bg-white shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Rider Profile</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Joined Date</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-5 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {riders.map((rider) => {
                  let created = null;
                  if (rider?.createdAt) {
                    created = new Date(rider.createdAt instanceof String ? rider.createdAt : rider.createdAt.$date || rider.createdAt);
                  }
                  const prettyDate = created && !isNaN(created) ? created.toLocaleDateString() : "-";
                  const isActive = rider.active !== false;

                  return (
                    <tr key={rider._id} className={`group hover:bg-gray-50/80 transition-colors ${!isActive ? "opacity-60 bg-gray-50" : ""}`}>
                      {/* Profile */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <img
                            src={`https://ui-avatars.com/api/?name=${rider.name}&background=random`}
                            alt="profile"
                            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                          />
                          <div>
                            <p className="font-bold text-gray-900">{rider.name || "Unknown"}</p>
                            <p className="text-xs text-gray-400">ID: {rider._id.slice(-6).toUpperCase()}</p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone size={14} className="text-gray-400" />
                          <span className="text-sm">{rider.contact || rider.phone || "N/A"}</span>
                        </div>
                      </td>

                      {/* Joined At */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Calendar size={14} />
                          {prettyDate}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${isActive ? "bg-green-50 text-green-700 border border-green-100" : "bg-gray-100 text-gray-500 border border-gray-200"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-gray-400"}`} />
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Action Toggle */}
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => handleToggle(rider)}
                          disabled={savingId === rider._id}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${isActive
                              ? "bg-white border border-gray-200 text-red-600 hover:bg-red-50 hover:border-red-200"
                              : "bg-green-600 text-white hover:bg-green-700 shadow-green-500/20"
                            }`}
                        >
                          {isActive ? (
                            <>
                              <XCircle size={16} /> Deactivate
                            </>
                          ) : (
                            <>
                              <CheckCircle size={16} /> Activate
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ApprovedRidersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <ApprovedRidersInner />
    </ProtectedRoute>
  );
}

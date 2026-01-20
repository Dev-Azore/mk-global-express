"use client";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../Lib/axiosInstance.js";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import ProtectedRoute from "../../../../../Components/Shared/ProtectedRoute";
import { User, Phone, Calendar, CheckCircle, XCircle, Search, Filter } from "lucide-react";

function AppliedRidersInner() {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState(null);

  // fetch riders
  const fetchRiders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/apply-riders");
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

  // update status
  const handleStatusUpdate = async (id, status, feedback) => {
    try {
      setSavingId(id);
      const res = await axiosInstance.patch("/apply-riders", {
        id,
        status,
        feedback,
      });

      if (res?.data?.success) {
        toast.success(`Rider ${status} successfully`);
        fetchRiders();
      } else {
        toast.error(res?.data?.message || "Update failed");
      }
    } catch (err) {
      toast.error("Error updating status");
    } finally {
      setSavingId(null);
    }
  };

  // Reject with SweetAlert2 modal
  const handleReject = async (id) => {
    const { value: feedback } = await Swal.fire({
      title: "Reject Rider Application?",
      text: "Please provide a reason for rejection (optional).",
      input: "text",
      inputPlaceholder: "Enter reason...",
      showCancelButton: true,
      confirmButtonText: "Reject Application",
      confirmButtonColor: "#ef4444",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      customClass: {
        popup: "rounded-3xl shadow-2xl border border-gray-100",
        confirmButton: "px-6 py-3 rounded-xl font-bold text-sm",
        cancelButton: "px-6 py-3 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-50",
        input: "rounded-xl border-gray-200 focus:ring-red-500 focus:border-red-500"
      },
    });

    if (feedback !== undefined) {
      await handleStatusUpdate(id, "rejected", feedback || undefined);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-10 w-10 border-4 border-red-500 border-t-transparent rounded-full"></div>
          <p className="text-gray-400 font-medium">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 mt-16 min-h-screen bg-gray-50/50">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Applied Riders</h1>
          <p className="text-gray-500">Review and manage rider applications.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search applicants..."
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all w-64"
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
            <User size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Applications Yet</h3>
          <p className="text-gray-500 max-w-sm">New rider applications will appear here. Check back later.</p>
        </div>
      ) : (
        <div className="bg-white shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Applicant</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Applied Date</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-5 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {riders.map((rider) => {
                  let created = null;
                  if (rider?.createdAt) {
                    created = new Date(rider.createdAt instanceof String ? rider.createdAt : rider.createdAt.$date || rider.createdAt);
                  }
                  const prettyDate = created && !isNaN(created) ? created.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "-";

                  return (
                    <tr key={rider._id} className="group hover:bg-gray-50/80 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold text-lg">
                            {rider.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="font-semibold text-gray-900">{rider.name || "Unknown"}</div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone size={14} className="text-gray-400" />
                          {rider.contact || rider.phone || "N/A"}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Calendar size={14} />
                          {prettyDate}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${rider.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : rider.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${rider.status === "approved" ? "bg-green-600" :
                              rider.status === "rejected" ? "bg-red-600" : "bg-yellow-600"
                            }`} />
                          {rider.status || "pending"}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleStatusUpdate(rider._id, "approved")}
                            disabled={savingId === rider._id || rider.status === 'approved'}
                            className="p-2 rounded-lg text-green-600 hover:bg-green-50 hover:text-green-700 transition disabled:opacity-30 disabled:hover:bg-transparent"
                            title="Approve"
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button
                            onClick={() => handleReject(rider._id)}
                            disabled={savingId === rider._id || rider.status === 'rejected'}
                            className="p-2 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition disabled:opacity-30 disabled:hover:bg-transparent"
                            title="Reject"
                          >
                            <XCircle size={20} />
                          </button>
                        </div>
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

export default function AppliedRidersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AppliedRidersInner />
    </ProtectedRoute>
  );
}

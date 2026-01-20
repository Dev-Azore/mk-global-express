"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/Lib/axiosInstance.js";
import { toast } from "react-hot-toast";
import { Package, User, Calendar, Truck, CheckCircle, Clock, XCircle, Search, Filter } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState(null);

  // fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/total-orders");
      setOrders(res?.data?.orders || []);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // update order status
  const handleStatusChange = async (id, status) => {
    try {
      setSavingId(id);
      const res = await axiosInstance.patch("/total-orders", { id, status });

      if (res?.data?.success) {
        toast.success("Order status updated");
        setOrders((prev) =>
          prev.map((order) => (order._id === id ? { ...order, status } : order))
        );
      } else {
        toast.error(res?.data?.message || "Failed to update status");
      }
    } catch (err) {
      toast.error("Error updating order");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="text-gray-400 font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 mt-16 min-h-screen bg-gray-50/50">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">All Parcels</h1>
          <p className="text-gray-500">Manage all shipments and update statuses.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search parcels..."
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border border-gray-100 shadow-sm text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
            <Package size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Found</h3>
          <p className="text-gray-500 max-w-sm">Use the dashboard to create new shipments.</p>
        </div>
      ) : (
        <div className="bg-white shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Parcel Info</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Sender</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Receiver</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-5 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => {
                  let created = null;
                  if (order?.createdAt) {
                    created = new Date(order.createdAt instanceof String ? order.createdAt : order.createdAt.$date || order.createdAt);
                  }
                  const prettyDate = created && !isNaN(created) ? created.toLocaleDateString() : "-";

                  // 🎨 Badge color for parcel type
                  const typeColors = {
                    Document: "bg-blue-50 text-blue-700 border-blue-100",
                    Fragile: "bg-red-50 text-red-700 border-red-100",
                    Electronics: "bg-purple-50 text-purple-700 border-purple-100",
                    default: "bg-gray-50 text-gray-700 border-gray-200",
                  };

                  const statusColors = {
                    pending: "bg-yellow-100 text-yellow-700",
                    "on-the-way": "bg-blue-100 text-blue-700",
                    delivered: "bg-green-100 text-green-700",
                    cancelled: "bg-red-100 text-red-700",
                  };

                  const StatusIcon = {
                    pending: Clock,
                    "on-the-way": Truck,
                    delivered: CheckCircle,
                    cancelled: XCircle,
                  }[order.status] || Package;

                  return (
                    <tr key={order._id} className="group hover:bg-gray-50/80 transition-colors">
                      {/* Parcel Type */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex self-start px-2.5 py-0.5 rounded-full text-xs font-semibold border ${typeColors[order.type] || typeColors.default}`}>
                            {order.type || "Standard"}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">#{order._id.slice(-6).toUpperCase()}</span>
                        </div>
                      </td>

                      {/* Sender */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold">
                            {order.senderName?.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-700">{order.senderName}</span>
                        </div>
                      </td>

                      {/* Receiver */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold">
                            {order.receiverName?.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-700">{order.receiverName}</span>
                        </div>
                      </td>

                      {/* Created At */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Calendar size={14} />
                          {prettyDate}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <StatusIcon size={16} className={statusColors[order.status].split(" ")[1]} />
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
                            {order.status}
                          </span>
                        </div>
                      </td>

                      {/* Action: Change Status */}
                      <td className="px-6 py-4 text-center">
                        <div className="relative">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            disabled={savingId === order._id}
                            className="appearance-none cursor-pointer bg-white border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg text-sm font-medium shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
                          >
                            <option value="pending">Pending</option>
                            <option value="on-the-way">On the Way</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
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

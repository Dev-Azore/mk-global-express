"use client";
import axiosInstance from "@/Lib/axiosInstance.js";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ProtectedRoute from "@/Components/Shared/ProtectedRoute";
import { MessageSquare, Mail, User, Clock, Search, Filter } from "lucide-react";

function RidersUpdateInner() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/support");
      setMessages(res?.data?.messages || []);
    } catch (err) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="text-gray-400 font-medium">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 mt-16 min-h-screen bg-gray-50/50">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Rider Support</h1>
          <p className="text-gray-500">View and respond to inquiries from your riders.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search messages..."
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                    {msg.riderName?.charAt(0) || <User size={18} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 line-clamp-1">{msg.riderName}</h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Mail size={10} /> {msg.riderEmail}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full border border-gray-100 whitespace-nowrap">
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : "Recent"}
                </span>
              </div>

              <div className="flex-grow">
                <div className="relative pl-4 border-l-2 border-blue-100 mb-2">
                  <p className="text-gray-600 text-sm leading-relaxed italic">
                    "{msg.message}"
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}
                </span>
                <button className="text-blue-600 font-semibold hover:underline">
                  Reply via Email
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
              <MessageSquare size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Messages Yet</h3>
            <p className="text-gray-500 max-w-sm">When riders contact support, their messages will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RidersUpdatePage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <RidersUpdateInner />
    </ProtectedRoute>
  );
}

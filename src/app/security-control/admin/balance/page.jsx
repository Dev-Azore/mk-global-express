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
  AreaChart,
  Area,
} from "recharts";
import ProtectedRoute from "@/Components/Shared/ProtectedRoute";
import { DollarSign, TrendingUp, TrendingDown, Package, CreditCard, PieChart } from "lucide-react";

function BalanceInner() {
  const [data, setData] = useState({ totalBalance: 0, chartData: [] });
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState("area"); // 'line' or 'area'

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch("/api/balance");
        const json = await res.json();
        if (json.success) setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, []);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100">
          <p className="text-gray-500 text-xs font-semibold mb-1 uppercase tracking-wide">{label}</p>
          <p className="text-purple-600 font-bold text-xl">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate growth percentage (mock calculation if no previous data)
  const growthPercentage =
    data.chartData.length >= 2
      ? (
        ((data.chartData[data.chartData.length - 1]?.balance -
          data.chartData[0]?.balance) /
          data.chartData[0]?.balance) *
        100
      ).toFixed(1)
      : 12.5; // Mock fallback for visual

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium">Loading financial data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 mt-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Financial Dashboard</h1>
            <p className="text-gray-500">Track your courier service revenue and growth.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
              Download Report
            </button>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Balance Card */}
          <div className="md:col-span-2 relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-[2rem] p-8 shadow-2xl shadow-purple-500/20 group">
            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform duration-700"></div>

            <div className="relative z-10 flex items-center justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-3 text-purple-200">
                  <DollarSign size={20} />
                  <span className="font-semibold tracking-wide">TOTAL BALANCE</span>
                </div>
                <p className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0
                  }).format(data.totalBalance)}
                </p>

                <div className="flex items-center gap-3">
                  <div className={`flex items-center px-3 py-1.5 rounded-full text-sm font-bold backdrop-blur-md ${growthPercentage >= 0 ? "bg-green-400/20 text-green-300" : "bg-red-400/20 text-red-300"
                    }`}>
                    {growthPercentage >= 0 ? <TrendingUp size={16} className="mr-1.5" /> : <TrendingDown size={16} className="mr-1.5" />}
                    {Math.abs(growthPercentage)}%
                  </div>
                  <span className="text-purple-200 text-sm font-medium">growth this period</span>
                </div>
              </div>

              <div className="hidden lg:block p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                <CreditCard size={48} className="text-white/90" />
              </div>
            </div>
          </div>

          {/* Quick Stats Column */}
          <div className="flex flex-col gap-6">
            <div className="flex-1 bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/40 border border-gray-100 flex items-center justify-between hover:-translate-y-1 transition-transform cursor-default">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Active Orders</p>
                <p className="text-3xl font-bold text-gray-900">247</p>
              </div>
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Package size={28} />
              </div>
            </div>

            <div className="flex-1 bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/40 border border-gray-100 flex items-center justify-between hover:-translate-y-1 transition-transform cursor-default">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Avg. Order Value</p>
                <p className="text-3xl font-bold text-gray-900">$45.20</p>
              </div>
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                <PieChart size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart Section */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
          {/* Chart Header */}
          <div className="px-8 py-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Revenue Analytics</h2>
              <p className="text-sm text-gray-500 mt-1">Performance overview over time</p>
            </div>

            {/* Chart Type Toggle */}
            <div className="flex bg-gray-100 p-1.5 rounded-xl self-start sm:self-auto">
              <button
                onClick={() => setViewType("area")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewType === "area"
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                  }`}
              >
                Area
              </button>
              <button
                onClick={() => setViewType("line")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewType === "line"
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                  }`}
              >
                Line
              </button>
            </div>
          </div>

          {/* Chart Container */}
          <div className="p-8 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              {viewType === "area" ? (
                <AreaChart
                  data={data.chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 500 }}
                    tickFormatter={(value) => `$${value}`}
                    dx={-10}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#7c3aed', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#7c3aed"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorBalance)"
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#7c3aed' }}
                  />
                </AreaChart>
              ) : (
                <LineChart
                  data={data.chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 500 }}
                    tickFormatter={(value) => `$${value}`}
                    dx={-10}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#7c3aed', strokeWidth: 1 }} />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#7c3aed"
                    strokeWidth={4}
                    dot={{ fill: "#fff", stroke: "#7c3aed", strokeWidth: 3, r: 6 }}
                    activeDot={{ r: 8, stroke: "#7c3aed", strokeWidth: 0, fill: '#7c3aed' }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BalancePage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <BalanceInner />
    </ProtectedRoute>
  );
}

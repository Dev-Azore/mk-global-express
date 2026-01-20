"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  UserCheck,
  UserPlus,
  MessageSquare,
  Wallet,
  Settings,
  Truck,
  History,
  Headphones,
  PlusCircle,
  MapPin,
  User,
  LogOut,
  ChevronRight,
  BarChart3,
  ShieldCheck,
  Bell,
  CreditCard,
  Home
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = ({ onClick, collapsed = false }) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Helper to structure menu items with categories
  const getMenuGroups = () => {
    // Priority 1: Check the URL path to determine which dashboard we are in
    if (pathname.startsWith("/dashboard/admin")) {
      return [
        {
          title: "Overview",
          items: [
            { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard/admin" },
            { name: "Analytics", icon: <BarChart3 size={20} />, path: "/dashboard/admin/analytics" },
          ]
        },
        {
          title: "Management",
          items: [
            { name: "All Parcels", icon: <Package size={20} />, path: "/dashboard/admin/all-parcels" },
            { name: "Users", icon: <Users size={20} />, path: "/dashboard/admin/users" },
            { name: "Subscribers", icon: <MessageSquare size={20} />, path: "/dashboard/admin/newsletter-subscribers" },
          ]
        },
        {
          title: "Rider Fleet",
          items: [
            { name: "Applied Riders", icon: <UserPlus size={20} />, path: "/dashboard/admin/applied-riders" },
            { name: "Approved Riders", icon: <UserCheck size={20} />, path: "/dashboard/admin/approved-riders" },
            { name: "Messages", icon: <MessageSquare size={20} />, path: "/dashboard/admin/riders-update" },
          ]
        },
        {
          title: "Finance & System",
          items: [
            { name: "Balance", icon: <Wallet size={20} />, path: "/dashboard/admin/balance" },
            { name: "Settings", icon: <Settings size={20} />, path: "/dashboard/admin/settings" },
          ]
        }
      ];
    }

    if (pathname.startsWith("/dashboard/rider")) {
      return [
        {
          title: "Overview",
          items: [
            { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard/rider" },
          ]
        },
        {
          title: "Delivery Work",
          items: [
            { name: "Assigned Parcels", icon: <Package size={20} />, path: "/dashboard/rider/assigned" },
            { name: "Update Status", icon: <Truck size={20} />, path: "/dashboard/rider/update-status" },
          ]
        },
        {
          title: "Account",
          items: [
            { name: "History", icon: <History size={20} />, path: "/dashboard/rider/history" },
            { name: "Support", icon: <Headphones size={20} />, path: "/dashboard/rider/support" },
          ]
        }
      ];
    }

    if (pathname.startsWith("/dashboard/user")) {
      return [
        {
          title: "Overview",
          items: [
            { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard/user" },
          ]
        },
        {
          title: "Parcel Management",
          items: [
            { name: "Create Parcel", icon: <PlusCircle size={20} />, path: "/dashboard/user/create-parcel" },
            { name: "Track Parcels", icon: <MapPin size={20} />, path: "/dashboard/user/track-parcel" },
            { name: "Order History", icon: <History size={20} />, path: "/dashboard/user/history" },
          ]
        },
        {
          title: "Account",
          items: [
            { name: "Profile", icon: <User size={20} />, path: "/dashboard/user/profile" },
            { name: "Address Book", icon: <Home size={20} />, path: "/dashboard/user/addresses" },
            { name: "Payments", icon: <CreditCard size={20} />, path: "/dashboard/user/payments" },
            { name: "Notifications", icon: <Bell size={20} />, path: "/dashboard/user/notifications" },
            { name: "Settings", icon: <Settings size={20} />, path: "/dashboard/user/settings" },
          ]
        }
      ];
    }

    if (pathname.startsWith("/dashboard/merchant")) {
      return [
        {
          title: "Overview",
          items: [
            { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard/merchant" },
          ]
        },
        {
          title: "Parcel Management",
          items: [
            { name: "All Parcels", icon: <Package size={20} />, path: "/dashboard/merchant/parcels" },
          ]
        },
        {
          title: "Account",
          items: [
            { name: "Settings", icon: <Settings size={20} />, path: "/dashboard/merchant/settings" },
          ]
        }
      ];
    }

    // Priority 2: Fallback to user role if pathname doesn't match specific dashboards
    if (user?.role?.toUpperCase() === "ADMIN") {
      return [
        {
          title: "Overview",
          items: [
            { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard/admin" },
            { name: "Analytics", icon: <BarChart3 size={20} />, path: "/dashboard/admin/analytics" },
          ]
        },
        {
          title: "Management",
          items: [
            { name: "All Parcels", icon: <Package size={20} />, path: "/dashboard/admin/all-parcels" },
            { name: "Users", icon: <Users size={20} />, path: "/dashboard/admin/users" },
            { name: "Subscribers", icon: <MessageSquare size={20} />, path: "/dashboard/admin/newsletter-subscribers" },
          ]
        },
        {
          title: "Rider Fleet",
          items: [
            { name: "Applied Riders", icon: <UserPlus size={20} />, path: "/dashboard/admin/applied-riders" },
            { name: "Approved Riders", icon: <UserCheck size={20} />, path: "/dashboard/admin/approved-riders" },
            { name: "Messages", icon: <MessageSquare size={20} />, path: "/dashboard/admin/riders-update" },
          ]
        },
        {
          title: "Finance & System",
          items: [
            { name: "Balance", icon: <Wallet size={20} />, path: "/dashboard/admin/balance" },
            { name: "Settings", icon: <Settings size={20} />, path: "/dashboard/admin/settings" },
          ]
        }
      ];
    } else if (user?.role?.toUpperCase() === "RIDER") {
      return [
        {
          title: "Overview",
          items: [
            { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard/rider" },
          ]
        },
        {
          title: "Delivery Work",
          items: [
            { name: "Assigned Parcels", icon: <Package size={20} />, path: "/dashboard/rider/assigned" },
            { name: "Update Status", icon: <Truck size={20} />, path: "/dashboard/rider/update-status" },
          ]
        },
        {
          title: "Account",
          items: [
            { name: "History", icon: <History size={20} />, path: "/dashboard/rider/history" },
            { name: "Support", icon: <Headphones size={20} />, path: "/dashboard/rider/support" },
          ]
        }
      ];
    } else {
      // Default user set
      return [
        {
          title: "Overview",
          items: [
            { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard/user" },
          ]
        },
        {
          title: "Parcel Management",
          items: [
            { name: "Create Parcel", icon: <PlusCircle size={20} />, path: "/dashboard/user/create-parcel" },
            { name: "Track Parcels", icon: <MapPin size={20} />, path: "/dashboard/user/track-parcel" },
            { name: "Order History", icon: <History size={20} />, path: "/dashboard/user/history" },
          ]
        },
        {
          title: "Account",
          items: [
            { name: "Profile", icon: <User size={20} />, path: "/dashboard/user/profile" },
            { name: "Address Book", icon: <Home size={20} />, path: "/dashboard/user/addresses" },
            { name: "Payments", icon: <CreditCard size={20} />, path: "/dashboard/user/payments" },
            { name: "Notifications", icon: <Bell size={20} />, path: "/dashboard/user/notifications" },
            { name: "Settings", icon: <Settings size={20} />, path: "/dashboard/user/settings" },
          ]
        }
      ];
    }
  };

  const menuGroups = getMenuGroups();

  return (
    <div className={`flex flex-col h-full bg-white border-r border-gray-100 transition-all duration-300 ${collapsed ? "w-20" : "w-72"}`}>

      {/* Brand / Logo Area (Optional) */}
      {/* <div className="h-16 flex items-center justify-center border-b border-gray-50">
        {!collapsed ? (
          <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
            Mk-Global Panel
          </span>
        ) : (
          <ShieldCheck className="text-red-600" size={24} />
        )}
      </div> */}

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            {/* Section Title */}
            {!collapsed && group.title && (
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                {group.title}
              </h3>
            )}

            <div className="space-y-1">
              {group.items.map((item, itemIndex) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={itemIndex}
                    href={item.path}
                    onClick={onClick}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                    ${isActive
                        ? "bg-gradient-to-r from-red-50 to-white text-red-600 shadow-sm border-l-4 border-red-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                  >
                    <span className={`transition-colors ${isActive ? "text-red-600" : "text-gray-400 group-hover:text-gray-600"}`}>
                      {item.icon}
                    </span>

                    {!collapsed && (
                      <div className="flex-1 flex items-center justify-between">
                        <span className={`font-medium ${isActive ? "text-gray-900" : ""}`}>{item.name}</span>
                        {isActive && <ChevronRight size={14} className="text-red-400 opacity-50" />}
                      </div>
                    )}

                    {/* Tooltip for collapsed state */}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile / Logout Section */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/30">
        <button
          onClick={logout}
          className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group
            ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={20} />
          {!collapsed && <span className="font-medium">Log Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

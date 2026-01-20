import prisma from "@/Lib/prisma";
import ProtectedRoute from "@/Components/Shared/ProtectedRoute";
import { Mail, Calendar, Search, Filter, User } from "lucide-react";

// Server Component function now uses Prisma
async function getSubscribers() {
    try {
        const subscribers = await prisma.newsletterSubscriber.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return subscribers.map(sub => ({
            ...sub,
            // Format ID for frontend if needed, though Prisma string IDs are already fine
            createdAt: sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : 'N/A'
        }));
    } catch (error) {
        console.error("Failed to fetch subscribers:", error);
        return [];
    }
}

export default async function NewsletterSubscribersPage() {
    const subscribers = await getSubscribers();

    return (
        <ProtectedRoute allowedRoles={["ADMIN", "MERCHANT"]}>
            <div className="p-8 mt-16 min-h-screen bg-gray-50/50">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Newsletter Subscribers</h1>
                        <p className="text-gray-500">Manage and view all users subscribed to the newsletter.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search subscribers..."
                                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
                                disabled // Search functionality would need client-side state or URL params
                            />
                        </div>
                        <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date Subscribed</th>
                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-8 py-5 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {subscribers.length > 0 ? (
                                    subscribers.map((sub, index) => (
                                        <tr key={sub.id} className="group hover:bg-gray-50/80 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                                        <Mail size={18} />
                                                    </div>
                                                    <span className="font-bold text-gray-900">{sub.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    <Calendar size={14} />
                                                    <span className="text-sm font-medium">{sub.createdAt || "Unknown"}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                    Subscribed
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <button className="text-gray-400 hover:text-red-500 transition-colors text-sm font-medium">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <Mail size={48} className="text-gray-300 mb-4" />
                                                <p className="font-medium">No subscribers found.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

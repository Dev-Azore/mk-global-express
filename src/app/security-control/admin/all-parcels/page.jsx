"use client";

import ProtectedRoute from "@/Components/Shared/ProtectedRoute";
import OrdersPage from "../total-orders/page.jsx";

export default function AdminAllParcelsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <OrdersPage />
    </ProtectedRoute>
  );
}






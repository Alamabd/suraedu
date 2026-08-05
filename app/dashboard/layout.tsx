import ProtectedRoute from "@/components/protectRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>
      {children}
      </ProtectedRoute>
}
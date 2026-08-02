import AuthProvider from "@/components/authProvider";
import ProtectedRoute from "@/components/protectRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>
    <ProtectedRoute>
      {children}
      </ProtectedRoute>
  </AuthProvider>
}
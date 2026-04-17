import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  LayoutDashboard,
  Plus,
  Package,
  Grid3X3,
  ShoppingCart,
  BookAIcon,
  X,
  Menu as MenuIcon,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const AdminLayout = () => {
  const { setAdmin, setUser, axios, user } = useContext(AppContext);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: "/admin", name: "Dashboard", icon: LayoutDashboard, exact: true },
    { path: "/admin/add-category", name: "Add Category", icon: Plus },
    { path: "/admin/add-menu", name: "Add Menu", icon: Package },
    { path: "/admin/categories", name: "All Categories", icon: Grid3X3 },
    { path: "/admin/menus", name: "All Menus", icon: Package },
    { path: "/admin/orders", name: "Orders", icon: ShoppingCart },
    { path: "/admin/bookings", name: "Bookings", icon: BookAIcon },
  ];

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        toast.success(data.message);
        setAdmin(null);
        setUser(null); // ✅ clear user state too
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile toggle button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-white shadow-lg hover:bg-gray-50 transition-colors"
        >
          {sidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="flex items-center justify-center h-16 px-4 bg-secondary text-white">
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${
                      active
                        ? "bg-blue-100 text-primary border-r-4 border-primary"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                >
                  <Icon size={20} className="mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
              <div>
                <div className="font-medium text-gray-900">
                  {user?.name || "Admin user"}
                </div>
                <div>{user?.email || "admin@example.com"}</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex-col overflow-hidden lg:ml-0">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:pl-0 pl-16">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {menuItems.find((item) => isActive(item.path, item.exact))?.name ||
                "Admin Panel"}
            </h2>
            <div className="hidden md:flex items-center space-x-4">
              <button
                className="cursor-pointer hover:underline text-red-500 text-lg font-semibold"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

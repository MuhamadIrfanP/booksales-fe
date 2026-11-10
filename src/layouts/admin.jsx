import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const token = localStorage.getItem("token");

  // Proteksi halaman Admin
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Logout Admin
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Logout API:", error);
    } finally {
      logout();

      alert("Logout berhasil!");
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <div className="antialiased bg-gray-50 dark:bg-gray-900">

        {/* Navbar */}
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
          <div className="flex flex-wrap justify-between items-center">

            <div className="flex justify-start items-center">
              <a
                href="/admin"
                className="flex items-center justify-between mr-4"
              >
                <img
                  src="https://flowbite.s3.amazonaws.com/logo.svg"
                  className="mr-3 h-8"
                  alt="Flowbite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Flowbite
                </span>
              </a>
            </div>

            {/* Informasi Admin */}
            <div className="relative flex items-center lg:order-2">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-sm bg-gray-100 rounded-lg px-3 py-2 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <span className="text-gray-900 dark:text-white">
                  {user.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-300">
                  Admin
                </span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-12 z-50 w-48 bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="px-4 py-3 border-b dark:border-gray-600">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-300">
                      {user.email}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Sidebar */}
        <aside
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidenav"
        >
          <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">

            <ul className="space-y-2">
              <li>
                <a
                  href="/admin"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="ml-3">Overview</span>
                </a>
              </li>

              <li>
                <a
                  href="/admin/users"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <span className="ml-3">Users</span>
                </a>
              </li>

              <li>
                <a
                  href="/admin/authors"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <span className="ml-3">Authors</span>
                </a>
              </li>

              <li>
                <a
                  href="/admin/genres"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <span className="ml-3">Genres</span>
                </a>
              </li>
            </ul>

            <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
              <li>
                <a
                  href="/admin/books"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <span className="ml-3">Books</span>
                </a>
              </li>

              <li>
                <a
                  href="/admin/transactions"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <span className="ml-3">Transaction</span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <span className="ml-3">Help</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="p-4 md:ml-64 h-auto pt-20">
          <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-auto px-4 pt-4 pb-6">
            <Outlet />
          </div>
        </main>

      </div>
    </>
  );
}
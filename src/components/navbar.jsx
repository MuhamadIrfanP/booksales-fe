import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ambil data pengguna dari localStorage
  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  };

  const user = getUser();
  const token = localStorage.getItem("token");

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
      // Hapus data login
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      alert("Logout berhasil!");
      navigate("/login");
    }
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </Link>

          {/* Tombol Login / Akun */}
          <div className="flex items-center lg:order-2">
            {user && token ? (
              <>
                <span className="text-sm font-medium text-gray-800 dark:text-white mr-3">
                  Halo, {user.name}
                </span>

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-gray-800 dark:text-white hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-2 mr-2 dark:hover:bg-gray-700"
                  >
                    Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700"
                >
                  Masuk
                </Link>

                <Link
                  to="/register"
                  className="text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5"
                >
                  Bergabung
                </Link>
              </>
            )}

            {/* Tombol Menu Mobile */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center p-2 ml-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              aria-label="Toggle navigation"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Menu Navigasi */}
          <div
            className={`${isMenuOpen ? "block" : "hidden"} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:text-indigo-700 lg:p-0 dark:text-gray-300 dark:hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/books"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:text-indigo-700 lg:p-0 dark:text-gray-300 dark:hover:text-white"
                >
                  Buku Terlaris
                </Link>
              </li>

              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:text-indigo-700 lg:p-0 dark:text-gray-300 dark:hover:text-white"
                >
                  Blog
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:text-indigo-700 lg:p-0 dark:text-gray-300 dark:hover:text-white"
                >
                  Layanan
                </a>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </header>
  );
}
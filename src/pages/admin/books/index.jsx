import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books");
      const result = await response.json();

      if (result.success) {
        setBooks(result.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data buku:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const deleteBook = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus buku ini?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/api/books/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Buku berhasil dihapus!");
        fetchBooks();
      } else {
        alert(result.message || "Gagal menghapus buku.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menghapus buku.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">

        <div className="flex flex-col md:flex-row items-center justify-between p-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Data Buku
          </h2>

          <Link
            to="/admin/books/create"
            className="mt-3 md:mt-0 text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-4 py-2"
          >
            + Tambah Buku
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Judul Buku</th>
                <th className="px-4 py-3">Deskripsi</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Stok</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-6">
                    Memuat data buku...
                  </td>
                </tr>
              ) : books.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6">
                    Belum ada data buku.
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr key={book.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      {book.title}
                    </td>

                    <td className="px-4 py-3">
                      {book.description}
                    </td>

                    <td className="px-4 py-3">
                      {formatPrice(book.price)}
                    </td>

                    <td className="px-4 py-3">
                      {book.stock}
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteBook(book.id)}
                        className="text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
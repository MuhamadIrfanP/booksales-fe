import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminGenres() {
  const navigate = useNavigate();

  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/genres"
      );

      setGenres(response.data.data);
    } catch (error) {
      setError("Gagal mengambil data genre.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <section className="bg-gray-50 p-3 sm:p-5">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">

        {/* Header */}
        <div className="p-5 border-b">
          <h1 className="text-xl font-semibold text-gray-900">
            Data Genre
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Daftar genre buku pada Book Sales.
          </p>
        </div>

        {/* Content */}
        <div className="p-4">

          {/* Title and Button */}
          <div className="flex justify-between items-center mb-4 gap-3">
            <div>
              <h2 className="font-medium text-gray-700">
                Daftar Genre
              </h2>
              <p className="text-sm text-gray-500">
                Total: {genres.length} genre
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/genres/create")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
            >
              + Tambah Genre
            </button>
          </div>

          {/* Loading */}
          {loading ? (
            <p className="text-gray-500">
              Memuat data...
            </p>
          ) : error ? (
            <p className="text-red-600">
              {error}
            </p>
          ) : genres.length === 0 ? (
            <p className="text-gray-500">
              Belum ada data genre.
            </p>
          ) : (

            /* Genre Table */
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs uppercase bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-5 py-3">No</th>
                    <th className="px-5 py-3">Nama Genre</th>
                    <th className="px-5 py-3">Deskripsi</th>
                  </tr>
                </thead>

                <tbody>
                  {genres.map((genre, index) => (
                    <tr
                      key={genre.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        {index + 1}
                      </td>

                      <td className="px-5 py-4 font-medium text-gray-900">
                        {genre.name}
                      </td>

                      <td className="px-5 py-4">
                        {genre.description || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditGenre() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/genres/${id}`,
          { headers }
        );

        const genre = response.data.data;
        setName(genre.name);
        setDescription(genre.description || "");
      } catch (error) {
        console.error(error);
        setError("Gagal mengambil data genre.");
      } finally {
        setLoading(false);
      }
    };

    fetchGenre();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/genres/${id}`,
        { name, description },
        { headers }
      );

      alert("Genre berhasil diperbarui!");
      navigate("/admin/genres");
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || "Gagal memperbarui genre."
      );
    }
  };

  if (loading) {
    return <p className="p-5 text-gray-500">Memuat data...</p>;
  }

  return (
    <section className="bg-gray-50 p-3 sm:p-5">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Edit Genre
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Perbarui informasi genre buku.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              Nama Genre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Deskripsi
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/genres")}
              className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
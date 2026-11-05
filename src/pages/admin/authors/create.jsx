import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateAuthor() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/authors",
        {
          name,
          photo,
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Author berhasil ditambahkan!");
      navigate("/admin/authors");
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || "Gagal menambahkan author."
      );
    }
  };

  return (
    <section className="bg-gray-50 p-3 sm:p-5">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Tambah Author
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Masukkan informasi penulis buku baru.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              Nama Author
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Ahmad Fuadi"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Nama File Foto
            </label>

            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Contoh: ahmad_fuadi.jpg"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Biografi
            </label>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Masukkan biografi author"
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/authors")}
              className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Simpan Author
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
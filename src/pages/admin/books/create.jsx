import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookCreate() {
  const navigate = useNavigate();

  const API_URL = "http://127.0.0.1:8000/api";

  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    genre_id: "",
    author_id: "",
  });

  const [coverPhoto, setCoverPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Mengambil data genre dan penulis
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genreResponse, authorResponse] = await Promise.all([
          fetch(`${API_URL}/genres`),
          fetch(`${API_URL}/authors`),
        ]);

        const genreResult = await genreResponse.json();
        const authorResult = await authorResponse.json();

        if (genreResponse.ok) {
          setGenres(genreResult.data || []);
        }

        if (authorResponse.ok) {
          setAuthors(authorResult.data || []);
        }
      } catch (err) {
        setError("Gagal mengambil data genre dan penulis.");
      }
    };

    fetchData();
  }, []);

  // Mengisi form
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Memilih gambar
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setCoverPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  // Menyimpan buku
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!coverPhoto) {
      setError("Silakan pilih gambar sampul buku.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token login tidak ditemukan. Silakan login kembali.");
      return;
    }

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("genre_id", formData.genre_id);
    data.append("author_id", formData.author_id);
    data.append("cover_photo", coverPhoto);

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          const messages = Object.values(result.errors).flat();
          throw new Error(messages.join("\n"));
        }

        throw new Error(result.message || "Gagal menambahkan buku.");
      }

      alert("Buku berhasil ditambahkan!");

      navigate("/admin/books");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Tambah Buku
        </h2>

        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg whitespace-pre-line">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">

            {/* Judul */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Judul Buku
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Masukkan judul buku"
                required
              />
            </div>

            {/* Harga */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Harga (Rp)
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Contoh: 85000"
                required
              />
            </div>

            {/* Stok */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Stok
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Jumlah stok"
                required
              />
            </div>

            {/* Genre */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Genre
              </label>

              <select
                name="genre_id"
                value={formData.genre_id}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option value="">Pilih Genre</option>

                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Penulis */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Penulis
              </label>

              <select
                name="author_id"
                value={formData.author_id}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option value="">Pilih Penulis</option>

                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Deskripsi */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Deskripsi Buku
              </label>

              <textarea
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                placeholder="Masukkan deskripsi buku"
                required
              />
            </div>

            {/* Upload Gambar */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Gambar Sampul Buku
              </label>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2.5"
                required
              />

              <p className="mt-1 text-xs text-gray-500">
                Format JPG, JPEG, PNG, atau WEBP. Maksimal 2 MB.
              </p>

              {preview && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Preview Gambar:
                  </p>

                  <img
                    src={preview}
                    alt="Preview sampul buku"
                    className="w-40 h-56 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Tombol */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Simpan Buku"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/books")}
              className="text-gray-700 border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
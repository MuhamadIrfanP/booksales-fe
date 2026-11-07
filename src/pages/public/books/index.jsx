import { useEffect, useState } from "react";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/books"
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data buku.");
        }

        const result = await response.json();

        setBooks(result.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price || 0);
  };

  const getCoverUrl = (cover) => {
    if (!cover) return null;

    if (cover.startsWith("http")) {
      return cover;
    }

    return `http://127.0.0.1:8000/storage/${cover}`;
  };

  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Daftar Buku
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Temukan berbagai pilihan buku favorit Anda.
          </p>
        </div>

        {loading && (
          <p className="py-10 text-center text-gray-500 dark:text-gray-400">
            Memuat data buku...
          </p>
        )}

        {error && (
          <p className="py-10 text-center text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && books.length === 0 && (
          <p className="py-10 text-center text-gray-500 dark:text-gray-400">
            Belum ada buku yang tersedia.
          </p>
        )}

        {!loading && !error && books.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">

            {books.map((book) => (
              <div
                key={book.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >

                {/* Cover Buku */}
                <div className="flex h-56 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                  {book.cover_photo ? (
                    <img
                      src={getCoverUrl(book.cover_photo)}
                      alt={book.title}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <svg
                        className="h-16 w-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 6.5V20m0-13.5C10.5 5.5 8 5 5 5v13c3 0 5.5.5 7 1.5m0-13C13.5 5.5 16 5 19 5v13c-3 0-5.5.5-7 1.5"
                        />
                      </svg>
                      <span className="mt-2 text-sm">
                        Cover Buku
                      </span>
                    </div>
                  )}
                </div>

                {/* Informasi Buku */}
                <div className="pt-6">

                  <h3 className="text-lg font-semibold leading-tight text-gray-900 dark:text-white">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Penulis: {book.author?.name || book.author_id || "-"}
                  </p>

                  {book.description && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {book.description}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between gap-4">

                    <p className="text-xl font-extrabold text-gray-900 dark:text-white">
                      {formatRupiah(book.price)}
                    </p>

                    {book.stock !== undefined && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Stok: {book.stock}
                      </span>
                    )}

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}
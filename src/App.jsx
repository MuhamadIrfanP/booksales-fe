import { BrowserRouter, Routes, Route } from "react-router-dom";

import Books from "./pages/public/books";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";

import AdminLayout from "./layouts/admin";
import PublicLayout from "./layouts/public";

import Dashboard from "./pages/admin";

import AdminGenres from "./pages/admin/genres";
import CreateGenre from "./pages/admin/genres/create";
import EditGenre from "./pages/admin/genres/edit";

import AdminAuthors from "./pages/admin/authors";
import CreateAuthor from "./pages/admin/authors/create";
import EditAuthor from "./pages/admin/authors/edit";

import AdminBooks from "./pages/admin/books";
import CreateBook from "./pages/admin/books/create";

import Home from "./pages/public";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Publik */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
        </Route>

        {/* Halaman Login dan Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Halaman Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          {/* Genre */}
          <Route path="genres" element={<AdminGenres />} />
          <Route path="genres/create" element={<CreateGenre />} />
          <Route path="genres/edit/:id" element={<EditGenre />} />

          {/* Author */}
          <Route path="authors" element={<AdminAuthors />} />
          <Route path="authors/create" element={<CreateAuthor />} />
          <Route path="authors/edit/:id" element={<EditAuthor />} />

          {/* Book */}
          <Route path="books" element={<AdminBooks />} />
          <Route path="books/create" element={<CreateBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
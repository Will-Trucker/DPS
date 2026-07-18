"use client";
import "../styles/search.css";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="🔍 Buscar libro..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />
    </div>
  );
}
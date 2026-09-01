function SearchBar() {
  return (
    <div className="search-box">
      <span className="search-icon">
        🔍
      </span>

      <input
        type="text"
        placeholder="Search for restaurants or food..."
      />

      <button>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
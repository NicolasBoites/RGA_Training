import { useState, useEffect } from "react";
import axios from "axios";

interface SearchProps {
    onCancel: () => void;
    // loading: Project;
}


function SearchComponent() {
  const [query, setQuery] = useState("");
  // const [results, setResults] = useState<any[]>([]);
  // const [loading, setLoading] = useState(false);

  // Debounce con timer
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== "") {
        setLoading(true);
        axios
          .get(`/projects/search?q=${encodeURIComponent(query)}`)
          .then((res) => {
            setResults(res.data);
          })
          .catch((err) => {
            console.error("Search error:", err);
            setResults([]);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setResults([]);
      }
    }, 500); // 500 ms de espera

    // Cleanup del timeout si el usuario sigue tipeando
    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="search-box">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="form-control"
      />
      {/* {loading && <div>Buscando...</div>} */}
      
    </div>
  );
}

export default SearchComponent;

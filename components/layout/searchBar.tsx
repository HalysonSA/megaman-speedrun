import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const fetchData = useCallback(async () => {
    router.query.search = searchTerm;
    if (searchTerm !== undefined) {
      router.push(`/?search=${searchTerm}`);
    }
  }, [searchTerm]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 600); // 600ms debounce

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, fetchData]);

  return (
    <input
      type="text"
      placeholder="Search for a robot "
      onChange={(e) => setSearchTerm(e.target.value)}
      className="rounded-2xl px-4 py-2 bg-blue-600 text-white
      focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
    />
  );
};

export default SearchBar;

import React, { useState } from "react";
import axios from "../services/api";

const SynonymSearch = () => {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!word) return setError("Please enter a word");

    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/find-synonym", { word });
      setSynonyms(response.data.synonyms);
    } catch (err) {
      setError("Failed to fetch synonyms");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-2">Find Synonyms</h2>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Enter a word"
      />
      <button
        onClick={handleSearch}
        className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
      >
        Search
      </button>

      {loading && <p className="mt-4 text-blue-500">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {synonyms.length > 0 && (
        <ul className="mt-4 list-disc pl-5">
          {synonyms.map((synonym, idx) => (
            <li key={idx} className="text-gray-700">
              {synonym}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SynonymSearch;

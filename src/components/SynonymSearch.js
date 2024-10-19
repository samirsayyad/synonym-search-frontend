import React, { useState, useEffect, useRef } from "react";
import axios from "../services/api";

const MessageDisplay = ({ loading, error, message }) => (
  <div className="mt-4 h-8">
    {loading && <p className="text-blue-500">Loading...</p>}
    <p className={`mt-4 ${error ? "text-red-500" : "text-gray-700"}`}>
      {error || message}
    </p>
  </div>
);

const SynonymsList = ({ synonyms }) => {
  const prevSynonymsRef = useRef(synonyms);

  useEffect(() => {
    if (synonyms.length > 0) {
      prevSynonymsRef.current = synonyms;
    }
  }, [synonyms]);

  const displaySynonyms =
    synonyms.length > 0 ? synonyms : prevSynonymsRef.current;

  return displaySynonyms.length > 0 ? (
    <div className="mt-4 bg-gray-100 p-4 rounded">
      <span className="text-gray-700">{displaySynonyms.join(", ")}</span>
    </div>
  ) : null;
};

const SynonymSearch = () => {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleSearch = async () => {
    if (!word) return setError("Please enter a word");

    setLoading(true);
    setError("");
    setMessage("");
    setSearchAttempted(true);
    try {
      const response = await axios.post("/find-synonym", { word });
      const fetchedSynonyms = response.data.synonyms;
      setSynonyms(fetchedSynonyms);
      if (fetchedSynonyms.length === 0) {
        setMessage("No synonyms found. Try adding some!");
      } else {
        setMessage("Synonyms fetched successfully!");
      }
    } catch (err) {
      setError("Failed to fetch synonyms");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="my-4 p-6 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-left">Find Synonyms</h2>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        placeholder="Enter a word"
        onKeyUp={handleKeyPress}
      />
      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
      >
        Search
      </button>

      <MessageDisplay loading={loading} error={error} message={message} />

      {searchAttempted && !loading && !error && (
        <SynonymsList synonyms={synonyms} />
      )}
    </div>
  );
};

export default SynonymSearch;

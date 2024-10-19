import React, { useState, useRef } from "react";
import axios from "../services/api";

const ManageSynonyms = () => {
  const [word, setWord] = useState("");
  const [synonym, setSynonym] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const wordInputRef = useRef(null);

  const makeFieldsEmpty = () => {
    setWord("");
    setSynonym("");
    if (wordInputRef.current) {
      wordInputRef.current.focus();
    }
  };

  const handleAddSynonym = async () => {
    if (!word || !synonym) {
      return setError("Please enter both fields");
    }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await axios.post("/add-synonym", { word, synonym });
      setMessage(`Synonym "${synonym}" added successfully for "${word}"!`);
      makeFieldsEmpty();
    } catch (err) {
      setError("Failed to add synonym");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSynonym = async () => {
    if (!word || !synonym) {
      return setError("Please enter both fields");
    }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await axios.delete("/delete-synonym", { data: { word, synonym } });
      setMessage(`Synonym "${synonym}" deleted successfully from "${word}"!`);
      makeFieldsEmpty();
    } catch (err) {
      setError("Failed to delete synonym");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddSynonym();
    }
  };

  return (
    <div className="my-4 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-2">Manage Synonyms</h2>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="border p-2 rounded w-full mb-2"
        placeholder="Enter a word"
        onKeyUp={handleKeyPress}
        ref={wordInputRef}
      />
      <input
        type="text"
        value={synonym}
        onChange={(e) => setSynonym(e.target.value)}
        className="border p-2 rounded w-full mb-2"
        placeholder="Enter synonym"
        onKeyUp={handleKeyPress}
      />

      <div className="flex space-x-4">
        <button
          onClick={handleAddSynonym}
          className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-700"
          name="Add Synonym"
        >
          Add Synonym
        </button>
        <button
          onClick={handleDeleteSynonym}
          className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-700"
          name="Delete Synonym"
        >
          Delete Synonym
        </button>
      </div>

      <div className="mt-4 h-8">
        {loading && <p className="text-blue-500">Loading...</p>}
        <p className={`mt-4 ${error ? "text-red-500" : "text-gray-700"}`}>
          {error || message}
        </p>
      </div>
    </div>
  );
};

export default ManageSynonyms;

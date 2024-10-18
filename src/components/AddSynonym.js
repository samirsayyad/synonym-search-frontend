import React, { useState } from "react";
import axios from "../services/api";

const AddSynonym = () => {
  const [word, setWord] = useState("");
  const [synonym, setSynonym] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddSynonym = async () => {
    if (!word || !synonym) return setError("Please enter both fields");
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await axios.post("/add-synonym", { word, synonym });
      setMessage("Synonym added successfully!");
    } catch (err) {
      setError("Failed to add synonyms");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-2">Add Synonym</h2>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="border p-2 rounded w-full mb-2"
        placeholder="Enter a word"
      />
      <input
        type="text"
        value={synonym}
        onChange={(e) => setSynonym(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Enter synonym"
      />
      <button
        onClick={handleAddSynonym}
        className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-700"
      >
        Add Synonym
      </button>

      <div className="mt-4 h-8">
        {loading && <p className="text-blue-500">Loading...</p>}
        <p className={`mt-4 ${error ? "text-red-500" : "text-gray-700"}`}>
          {error || message}
        </p>
      </div>
    </div>
  );
};

export default AddSynonym;
